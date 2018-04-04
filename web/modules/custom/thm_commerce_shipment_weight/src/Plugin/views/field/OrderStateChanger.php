<?php

namespace Drupal\thm_commerce_shipment_weight\Plugin\views\field;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\views\Plugin\views\field\Links;
use Drupal\views\ResultRow;

/**
 * Provides order state changer as dropbutton.
 *
 * @ingroup views_field_handlers
 *
 * @ViewsField("order_state_changer")
 */
class OrderStateChanger extends Links {

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);
    unset($form['fields']);
    unset($form['destination']);
  }

  /**
   * {@inheritdoc}
   */
  public function render(ResultRow $values) {
    /** @var \Drupal\commerce_order\Entity\Order $entity */
    $entity = $values->_entity;
    $current_state = $entity->getState()->getString();
    $current_state_label = $entity->getState()->getLabel();
    $available_states = $entity->getState()->getWorkflow()->getStates();

    $current_path = \Drupal::service('path.current')->getPath();

    $states = [];

    $states[$current_state] = [
      'url' => Url::fromRoute('thm_commerce_shipment_weight.order_state_changer', ['order_id' => $entity->id(), 'order_state' => $current_state]),
      'title' => $current_state_label,
      'query' => ['destination' => $current_path],
      'attributes' => [
        'class' => 'active-state',
      ],
    ];

    foreach ($available_states as $available_state_name => $available_state_value) {
      if ($available_state_name == $current_state) {
        continue;
      }

      if ($current_state == 'draft' && $available_state_name != 'pending') {
        continue;
      }

      $states[$available_state_name] = [
        'url' => Url::fromRoute('thm_commerce_shipment_weight.order_state_changer', ['order_id' => $entity->id(), 'order_state' => $available_state_name]),
        'title' => $available_state_value->getLabel(),
        'query' => ['destination' => $current_path],
      ];
    }

    return [
      '#type' => 'dropbutton',
      '#links' => $states,
    ];
  }

}
