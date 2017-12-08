<?php

namespace Drupal\thm_related_makers\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'RMBlock' block.
 *
 * @Block(
 *  id = "block_related_makers",
 *  admin_label = @Translation("Related Makers Block"),
 * )
 */
class RMBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $vs = thm_related_makers_perform_search();

    //drupal_set_message('sending to twig: ' . print_r($vs['data'], true));

    $build = [];
    $build['block_related_makers']['#theme'] = 'thm_related_makers';
    $build['block_related_makers']['#data'] = $vs['data'];

    return $build;
  }

}
