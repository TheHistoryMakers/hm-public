<?php

namespace Drupal\thm_hero_video_player\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\search_api\Entity\Index;
use Drupal\node\NodeInterface;
use Drupal\file\Entity\File;
use Drupal\taxonomy\Entity\Term;

/**
 * @Block(
 *   id = "hero_video_player_block",
 *   admin_label = @Translation("THM Hero Video Player Block"),
 *   category = @Translation("THM Hero Video Player Block"),
 * )
 */


class HeroVideoPlayerBlock extends BlockBase {
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
    $build['thm_hero_video_player']['#theme'] = 'angular';
    return $build;
  }

}
