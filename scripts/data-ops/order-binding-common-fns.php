<?php

use Drupal\Core\Database\Database;

function useMigrateDB() {
  Database::setActiveConnection('migrate');
  return Database::getConnection();
}

function loadOrder($order_id) {
  $storage = \Drupal::entityTypeManager()->getStorage('commerce_order');
  return $storage->load($order_id);
}

function str_contains($haystack, $needle) {
  return strpos($haystack, $needle) !== false;
}

function generateLogEntry($order, $template, $data = []) {
  $storage = \Drupal::entityTypeManager()->getStorage('commerce_log');
  $log = $storage->generate($order, $template, $data);
  $log->save();
}
