<?php

namespace Drupal\thm_bio_video_player\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\search_api\Entity\Index;
use Drupal\node\NodeInterface;
use Drupal\file\Entity\File;
use Drupal\taxonomy\Entity\Term;

/**
 * @Block(
 *   id = "bio_video_player_block",
 *   admin_label = @Translation("THM Bio Video Player"),
 *   category = @Translation("THM Bio Video Player"),
 * )
 */


class BioVideoPlayerBlock extends BlockBase {
  /**
   * Retrieves the node in current display context (page|view|block).
   * Returns false if node isn't found.
   *
   * @return \Drupal\node\Entity\Node|bool
   */

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build['thm_bio_video_player']['#theme'] = 'bio-video';
    $build['thm_bio_video_player']['#video'] = thm_bio_video_player_get_current_node();
  return $build;
  }

}
