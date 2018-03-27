<?php

use Drupal\bio_import_xml\Helpers\BioXMLMigrationImporter;

$db =  \Drupal::database();
$cfg = \Drupal::config('bio_import_xml.settings');
$log = \Drupal::logger('bio_import_xml');

\drupal_set_message('Importing biographies. . .');

BioXMLMigrationImporter::import($db, $cfg, $log);
