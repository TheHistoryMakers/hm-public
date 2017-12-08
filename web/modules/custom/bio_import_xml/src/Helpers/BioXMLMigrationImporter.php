<?php
namespace Drupal\bio_import_xml\Helpers;

use Drupal\Core\Database\Connection;
use Drupal\Core\Config\ConfigBase;
use Drupal\node\Entity\Node;
use Drupal\Component\Utility\Unicode;
use Psr\Log\LoggerInterface;
use Drupal\Core\Entity\EntityStorageException;
use React\Promise\Deferred;
use function React\Promise\all;


class BioXMLMigrationImporter {

  /**
   * @var LoggerInterface Logger reference.
   */
  protected $logger;

  /**
   * @var ConfigBase $config Module config YAML object.
   */
  protected $config;

  /**
   * @var Connection $db Database connection reference.
   */
  protected $db;

  /**
   * @var string $storageTable The name of the source data table.
   */
  protected $storageTable = 'migrate_thm_storage';

  /**
   * @var int $importXmlUser The user id used to load/update Drupal nodes.
   */
  protected $importXmlUser = 155;

  /**
   * @var int $superUid The root user id;
   */
  protected $superUid = 1;

  protected $biosProcessed = 0;

  protected $totalBios = 0;

  protected $singleValueFields = [
    'field_first_name'                => 'namefirst',
    'field_last_name'                 => 'namelast',
    'field_hm_id'                     => 'hm_id',
    'field_accession_number'          => 'accession',
    'field_middle_name'               => 'namemiddle',
    'field_hm_city_state_country'     => 'birthcity',
    'field_sex'                       => 'gender',
    'field_favorite_color'            => 'favorite_color',
    'field_favorite_food'             => 'favorite_food',
    'field_favorite_season'           => 'favorite_season',
    'field_favorite_vacation'         => 'favorite_vacationspot',
    'field_favorite_quote'            => 'favorite_quote',
    'field_description'               => 'descriptionshort',
    'field_speakers_bureau'           => 'speakersbureauyesno',
    'field_state'                     => 'birthstate',
    'field_country'                   => 'birthcountry',
    'field_birth_date'                => 'datebirth',
    'field_sponsor'                   => 'sponsor',
    'field_death_date'                => 'datedeath',
    'field_speakers_bureau_notes'     => 'speakersbureaunotes',
    'field_bureau_region_city'        => 'regioncity',
    'field_bureau_region_state'       => 'regionstate',
    'field_speakers_bureau_audience'  => 'speakersbureaupreferredaudience',
    'field_speakers_bureau_honorarium'=> 'speakersbureauhonorarium',
    'field_speakers_bureau_available' => 'speakersbureauavailability',
    'field_married'                   => 'maritalstatus',
    'field_event_title_sponsor_url'   => 'sponsorurl',
    'field_timing_pairs'              => 'datimingpair',
    'field_transcript'                => 'dacaption',
    'field_dasession'                 => 'dasession',
    'field_datape'                    => 'datape',
    'field_dastory'                   => 'dastory',
  ];

  protected $linkFields = [
    'field_thm_da_link'           => 'linktothmda',
    'field_sm_da_link'            => 'linktosmda',
  ];

  protected $multiValueFields = [
    'field_flash_video'        => 'location_flash_file',
    'field_flash_video_titles' => 'location_flash_title',
    'field_employment'         => 'employment_for',
    'field_schools'            => 'schools_for',
    'field_interview_date'     => 'dates_of_sessions',
    'field_dastories'          => 'dastorylist',
    'field_datitle'            => 'datitle',
  ];

  protected $imageFields = [
    'field_bio_image'           => 'imagebio',
    'field_archival_image1'     => 'imagearchive01',
    'field_archival_image2'     => 'imagearchive02',
    'field_event_title_sponsor' => 'sponsorlogo',
  ];

  protected $taxonomyFields = [
    ['tags', 'biographylongwords',  'field_tags'],
    ['maker_category', 'category',  'field_maker_category'],
    ['birth_place', 'birthcity',    'field_birth_place_term'],
    ['occupation', 'occupation',    'field_occupation'],
    ['occupation_categories', 'occupationcategories',  'field_search_occupation_category'],
    ['organizations', 'organizations', 'field_organizations'],
  ];

  protected $pdfFields = ['interviewpdf1', 'interviewpdf2'];

  /**
   * @var Node $node
   */
  protected $node = null;

  /**
   * Retrieves a set biographies from the migration table.
   *
   * @param Connection $db
   * @param int $limit
   * @return mixed
   */
  protected function getNewBios(Connection $db, $limit = null) {
    $stmt = "SELECT * FROM {$this->storageTable} WHERE new = :new";

    if ($limit) $stmt .= " LIMIT $limit";

    return $db->query($stmt, [':new' => '1'])->fetchAll();
  }

  protected function nidExists($value) {
    return strlen(trim($value));
  }

  protected function noUserForNode($uid) {
    return (intval($uid) == 0 || empty($uid));
  }

  protected function loadExistingNode($record) {
    $node = Node::load($record->nid);

    if ($this->noUserForNode($node->id())) {
      $node->setOwnerId($this->superUid);
    }

    $node->setRevisionUserId($this->importXmlUser);

    return $node;
  }

  protected function imageExists($record, $fieldName) {
    $output = false;

    if (!isset($record->$fieldName)) {
      $output = false;
    } else {
      $file = BioXMLMigrationHelpers::attachImage(
        $this->db, $this->config, $record->$fieldName);
      if (!empty($file->getSize())) {
        $output = $file;
      }
    }

    return $output;
  }

  protected function populateSingleValueFields($record) {
    foreach ($this->singleValueFields as $field => $value) {

      if (strlen(trim($record->$value)) && !empty($record->$value)) {
        $truncateMig = Unicode::truncate(
          $record->$value, 240, true, true,
          1
        );
        $this->node->set($field, stripslashes(trim($record->$value)));
      }
    }
    return $this;
  }

  protected function checkPlain($text) {
    return \htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
  }

  protected function populateMultiValueFields($record) {
    foreach ($this->multiValueFields as $field => $value) {
      if (strlen(trim($record->$value)) && !empty($record->$value)) {
        $dollarValues = BioXMLMigrationHelpers::migrateThmExplode(
          '$', stripslashes($record->$value));

        foreach ($dollarValues as $val) {
          $valuesInField = $this->node->$field->getValue();

          if (!in_array($val, array_column($valuesInField, 'value'))) {
            $this->node->$field->appendItem($val);
          }
        }
      }
    }
    return $this;
  }

  protected function populateLinkFields($record) {
    foreach ($this->linkFields as $field => $value) {
      if (strlen(trim($record->$value)) && !empty($record->$value)) {
        $this->node->set($field, $record->$value);
      }
    }
    return $this;
  }

  protected function populateImageFields($record) {
    foreach($this->imageFields as $field => $value) {

      $imageField = BioXMLMigrationHelpers::attachImage(
        $this->db, $this->config, stripslashes($record->$value));

      if (($imageField) && !empty($imageField->getSize())) {
        $this->node->$field->appendItem($imageField);
      }
    }

    return $this;
  }

  protected function populatePdfFields($record) {
    $fieldName = 'field_bio_pdf';

    foreach ($this->pdfFields as $iPdf) {
      if ($f = $this->imageExists($record->$iPdf, $fieldName)) {
        $this->node->get($fieldName)->appendItem($f);
      } else {
        \drupal_set_message('no pdf.');
      }
    }

    return $this;
  }

  protected function populateTaxonomyFields($record) {
    foreach ($this->taxonomyFields as $v) {
      $vocab = $v[0];
      $value = $v[1];
      $field = $v[2];

      if (strlen(trim($record->$value))) {

        $tags = BioXMLMigrationHelpers::getTags($record->$value, $vocab);

        if (count($tags)) {
          foreach ($tags as $tag) {
            $tagsInField = $this->node->$field->getValue();
            $key = 'target_id';

            if (!in_array($tag[$key], array_column($tagsInField, $key))) {
              $this->node->$field->appendItem($tag);
            }
          }
        }
      }
    }
    return $this;
  }

  protected function populateWebClipFields($record) {
    $value = 'daurl';
    $targetBase = 'field_web_clip';

    if (strlen(trim($record->$value)) && !empty($record->$value)) {

      $clips = explode('$', $record->$value);

      for ($i = 0, $clipCount = count($clips); $i < $clipCount; $i++) {
        if ($i <= 2) {
          $target = $targetBase . ($i + 1);
          $this->node->set($target, $clips[$i]);
        } else {
          $msgPrefix = 'this field type is only configured for two fields.';
          $msg = 'dropping ' . $clips[$i] . 'as there\'s no room for it.';
          \drupal_set_message("$msgPrefix\n$msg");
        }
      }
    }

    return $this;
  }

  protected function createOrLoadNode($record) {
    if ($this->nidExists($record->nid)) {
      $this->node = $this->loadExistingNode($record);
    } else {
      //$this->newNodes[] = $record->hm_id;
      $this->node = Node::create([ 'type' => 'bio' ]);
      $this->node->setOwnerId($this->importXmlUser);
    }

    return $this;
  }

  protected function setTitleAndBody($record) {
    $title = $this->node->getTitle();

    if (!isset($title)) {
      $this->node->setTitle(stripslashes($record->namefirst . ' ' . $record->namelast));
    }

    if (strlen(trim($record->preferredname))) {
      $this->node->setTitle(stripslashes($record->preferredname));
    }

    $cleanBody = preg_replace(
      '/\xEF\x83\xA2/', '&reg;', $record->biographylong);
    $this->node->get('body')->value = $this->checkPlain(stripslashes($cleanBody));
    $this->node->get('body')->format = 'restricted_html';

    return $this;
  }

  protected function saveNode(Node $node){
    try {
      return $node->save();
    } catch (EntityStorageException $exc) {
      $this->logger->error('node save failed for: ' . $node->get('hm_id'));
      $this->logger->error($exc->getMessage());
      return false;
    }
  }

  protected function updateStorage($hmId) {
    $this->db->update($this->storageTable)
      ->fields(['new' => '0'])
      ->condition('hm_id', $hmId)
      ->execute();
    return $this;
  }

  protected function removeDuplicates($title) {
    // TODO: Refactor this statement. Currently assumes there will be one duplicate.
    $stmt = <<<SQL
SELECT 
  MIN(nid) AS old_nid,
  COUNT(title) AS nid_count
FROM {node_field_data}
WHERE
  type = 'bio' AND
  title = :title
GROUP BY
  title
HAVING nid_count > 1;
SQL;

    $oldNid = $this->db->query($stmt, [':title' => $title])->fetchField();

    //\drupal_set_message('removing: ' . print_r($oldNid, true));
    if ($oldNid) {
      \drupal_set_message('removing: ' . $oldNid);
      Node::load($oldNid)->delete();
    }

    return $this;
  }

  protected function reset() {
    $this->node = null;
    return $this;
  }

  public function __construct(
    Connection $db, ConfigBase $config, LoggerInterface $logger) {
    $this->db     = $db;
    $this->config = $config;
    $this->logger = $logger;
  }

  public function makeNodes($records) {
    return array_map(function($rec) {
      $deferred = new Deferred();

      $this
        ->createOrLoadNode($rec)
        ->setTitleAndBody($rec)
        ->populateSingleValueFields($rec)
        ->populateLinkFields($rec)
        ->populateMultiValueFields($rec)
        ->populateTaxonomyFields($rec)
        ->populatePdfFields($rec)
        ->populateImageFields($rec)
        ->populateWebClipFields($rec);

      $deferred->resolve($this->node);

      $this->biosProcessed++;

      $this->reset();

      return $deferred->promise();
    }, $records);
  }

  public function saveNodes($nodes) {
    return array_map(function(Node $node) {
      $id = $node->get('field_hm_id')->value . ':' .
        $node->getTitle();

      $deferred = new Deferred();

      $result = $this->saveNode($node);
      $state  = '';

      if (!$result) $state = 'failed';
      else if ($result == SAVED_NEW) $state = 'created';
      else if ($result == SAVED_UPDATED) $state = 'updated';

      /*$report = $this->biosProcessed . " of " . $this->totalBios;
      \Drupal::state()->set('import_counter', $report);

      $percent = ($this->biosProcessed / $this->totalBios);
      \Drupal::state()->set('import_progress', $percent);*/

      $deferred->resolve([ $id => $state ]);

      return $deferred->promise();
    }, $nodes);
  }

  public function logResults($report) {
    $msg = 'results for '.date('Y-m-d H:i:s') . '; ';
    $this->logger->notice($msg . print_r($report, true));

    return $this;
  }

  public static function update($time) {
    $progress = [
      'message' => 'importing biographies',
      'percentage' => -1
    ];

    $importReport = \Drupal::state()->get('import_counter');
    $completedPercentage = \Drupal::state()->get('import_progress');

    if ($completedPercentage) {
      $progress['message'] = t($importReport);
      $progress['percentage'] = $completedPercentage;
    }

    return $progress;
  }

  protected function shiftN(&$arr, $n) {
    $output = [];

    for ($i = 0; $i < $n; $i++) {
      if (count($arr)) array_push($output, array_shift($arr));
    }

    return $output;
  }

  protected function bio_import_xml_mail($key, &$message, $params) {
    $options = [ 'langcode' => $message['langcode'] ];

    $message['from'] = \Drupal::config('system.site')->get('mail');
    $message['body'][] = $params['message'];

    switch($key) {
      case 'import_complete':
        $message['subject'] = 'Biography Import Successful';
        $message['body'][] = $params['message'];
        break;
      case 'import_failure':
        $message['subject'] = 'Biography Import Unsuccessful';
        $message['body'][] = $params['message'];
        break;
    }
  }

  public function sendMessage($recipient = null) {
    $mailMgr = \Drupal::service('plugin.manager.mail');

    $module = 'bio_import_xml';
    $key = 'import_bios';


    $to = $recipient;
    $params = [
      'body' => [ $this->biosProcessed . ' biographies of ' . $this->totalBios . ' have been processed.' ],
      'subject' => 'Biography Import Successful'
    ];
    $langCode = \Drupal::currentUser()->getPreferredLangcode();
    $send = true;

    //$result = \mail($to, $params['subject'], $params['body'][0], implode("\r\n", $headers));

    $result = $mailMgr->mail($module, $key, $to, $langCode, $params, NULL, $send);
    if ($result !== true) {
      \drupal_set_message(
        t('There was an issue mailing the message'), 'error'
      );
    } else {
      \drupal_set_message(t('A message has been sent to ' . $to));
    }
  }

  public static function import(
    Connection $db, ConfigBase $config, LoggerInterface $logger) {

    $instance = new self($db, $config, $logger);

    $rs = $instance->getNewBios($instance->db, 1);

    $instance->totalBios = count($rs);

    while (count($rs)) {

      $q = $instance->shiftN($rs, 10);

      $ps = $instance->makeNodes($q);

      all($ps)
        ->then(function($nodes) use ($instance) {
          return $instance->saveNodes($nodes);
        })
        ->then(function($rps) {
          return all($rps);
        })
        ->then(function($report) use ($instance) {
          foreach ($report as $id => $state) {
            $hmIdAndTitle = explode(':', key($state));

            /*$instance
              ->updateStorage($hmIdAndTitle[0])
              ->removeDuplicates($hmIdAndTitle[1]);*/
          }
          $instance->logResults($report);
        });
    }

    $instance->sendMessage('tony.taylor@thirdwavellc.com');
  }
}