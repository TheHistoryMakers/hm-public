<?php

use Drupal\Core\Database\Database;

require_once 'order-binding-common-fns.php';

function getLegacyOrderLogs() {
  $db = useMigrateDB();
  $stmt = 'SELECT * FROM uc_order_admin_comments';
  $query = $db->query($stmt);
  return $query->fetchAll();
}

function matchMessage($message) {
  if (str_contains($message, 'Order created')) {
    return 'legacy_order_placed';
  } else if (str_contains($message, 'Customer canceled this order')) {
    return 'legacy_order_canceled';
  } else if (str_contains($message, 'Creating CIM profile failed.'))  {
    return 'legacy_order_profile_creation_failure';
  } else if (str_contains($message, 'ACCEPTED') && str_contains($message, 'AVS response: Y')) {
    return 'legacy_order_approved_avs_y';
  } else if (str_contains($message, 'ACCEPTED') && str_contains($message, 'AVS response: A')) {
    return 'legacy_order_approved_avs_a';
  } else if (str_contains($message, 'ACCEPTED') && str_contains($message, 'AVS response: Z')) {
    return 'legacy_order_approved_avs_z';
  } else if (str_contains($message, 'ACCEPTED') && str_contains($message, 'AVS response: X')) {
    return 'legacy_order_approved_avs_x';
  } else if (str_contains($message, 'ACCEPTED') && str_contains($message, 'AVS response: P')) {
    return 'legacy_order_approved_avs_p';
  } else if (str_contains($message, '<b>Credit</b>') && str_contains($message, 'credit card number is invalid')) {
    return 'legacy_order_credit_invalid_cc';
  } else if (str_contains($message, '<b>Authorization and capture</b>') && str_contains($message, 'credit card number is invalid')) {
    return 'legacy_order_ac_invalid_cc';
  } else if (str_contains($message, 'error occurred during processing') && str_contains($message, 'AVS response: P')) {
    return 'legacy_order_processing_error';
  } else if (str_contains($message, 'error occurred during processing') && str_contains($message, 'AVS response: G')) {
    return 'legacy_order_processing_error_non_us';
  } else if (str_contains($message, 'duplicate transaction')) {
    return 'legacy_order_declined_duplicate';
  } else if (str_contains($message, 'REJECTED') && str_contains($message, 'AVS response: Y')) {
    return 'legacy_order_declined_avs_y';
  } else if (str_contains($message, 'REJECTED') && str_contains($message, 'AVS response: S')) {
    return 'legacy_order_declined_avs_s';
  } else if (str_contains($message, 'REJECTED') && str_contains($message, 'AVS response: N')) {
    return 'legacy_order_declined_avs_n';
  } else if (str_contains($message, 'REJECTED') && str_contains($message, 'AVS response: G')) {
    return 'legacy_order_declined_avs_g';
  } else if (str_contains($message, 'REJECTED') && str_contains($message, 'AVS response: R')) {
    return 'legacy_order_declined_avs_r';
  } else if (str_contains($message, 'declined because of an AVS mismatch')) {
    return 'legacy_order_declined_mismatch';
  } else if (str_contains($message, 'Credit card number is required')) {
    return 'legacy_order_declined_missing_cc';
  } else {
    return 'legacy_order_unknown';
  }
}

function run() {
  $noDataStates = [
    'legacy_order_placed',
    'legacy_order_canceled',
    'legacy_order_profile_creation_failure',
    'legacy_order_unknown'
  ];
  $log_records = getLegacyOrderLogs();

  foreach ($log_records as $log_record) {
    $order    = loadOrder($log_record->order_id);
    $template = matchMessage($log_record->message);

    if (is_null($order)) {
      $msg = 'order #' . $log_record->order_id . ' is null.';
      drupal_set_message($msg);
    } else {
      if (!in_array($template, $noDataStates) && $order->hasItems()) {
        generateLogEntry($order, $template, [
          'user_id' => $log_record->uid,
          'original_log' => $log_record->created,
          'order_total' => $order->getTotalPrice()->getNumber()]);
      } else {
        generateLogEntry($order, $template,
          ['user_id' => $log_record->uid, 'original_log' => $log_record->created]);
      }
    }
  }
}

run();
