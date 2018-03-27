<?php

require_once 'order-binding-common-fns.php';

function getLegacyOrderComments() {
  $db = useMigrateDB();
  $stmt = 'SELECT * FROM uc_order_comments';
  $query = $db->query($stmt);
  return $query->fetchAll();
}

function run() {

  $comment_records = getLegacyOrderComments();

  foreach ($comment_records as $comment_record) {
    $order = loadOrder($comment_record->order_id);

    if (is_null($order)) {
      $msg = 'order #' . $comment_record->order_id . ' is null.';
      drupal_set_message($msg);
    } else {
      generateLogEntry($order, 'legacy_order_customer_comment', [
        'user_id' => $comment_record->uid,
        'original_log' => $comment_record->created,
        'message' => $comment_record->message
      ]);
    }
  }
}

run();
