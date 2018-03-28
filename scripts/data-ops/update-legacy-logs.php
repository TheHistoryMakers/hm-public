<?php

function getCommerceLogs() {
  $db = \Drupal::database();
  $stmt = 'SELECT * FROM {commerce_log}';
  $query = $db->query($stmt);
  return $query->fetchAll();
}

function getParams($data) {
  return unserialize($data);
}

function updateLogRecord($data, $log_id) {
  $db = \Drupal::database();
  return $db->update('commerce_log')
    ->fields([
      'uid' => $data['user_id'],
      'created' => $data['original_log']
    ])
    ->condition('log_id', $log_id)
    ->execute();
}

function run() {
  $logs = getCommerceLogs();

  foreach ($logs as $log) {
    $data    = getParams($log->params);
    $results = updateLogRecord($data, $log->log_id);
    //drupal_set_message($data['user_id']);
  }
}

run();
