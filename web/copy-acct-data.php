<?php
/**
 * Created by PhpStorm.
 * User: t2
 * Date: 2/2/18
 * Time: 10:22 AM
 */

use Drupal\user\Entity\User;

function getUserIds() {
  return \Drupal::entityQuery('user')->execute();
}

function getIntlAddressFields() {
  return [
    'given_name',
    'additional_name',
    'family_name',
    'address_line1',
    'locality',
    'administrative_area',
    'postal_code',
  ];
}

function getAcctFields() {
  return [
    'name',
    'middle_initial',
    'user_last_name',
    'address',
    'city',
    'location_state',
    'zip',
  ];
}

function loadFields($fieldList, $prefix) {
  return array_map(function($field) use ($prefix) {
    return $prefix . $field;
  }, $fieldList);
}

function zipFields($a, $b) {
  return array_map(null, $a, $b);
}

function getUsers($uids) {
  return User::loadMultiple($uids);
}

function buildAddressRecord(User $user) {
  $fields = zipFields(
    loadFields(getAcctFields(), 'field_'),
    getIntlAddressFields());
  $record = [ 'country_code' => 'US' ];

  foreach ($fields as $field) {
    $legacyField = $field[0];
    $targetField = $field[1];

    $value = $user->get($legacyField)->value;

    $record[$targetField] = $value;
  }

  return $record;
}

function main() {
  $processCounter = 1;
  $users = getUsers(getUserIds());

  /** @var Drupal\user\Entity\User $user */
  foreach ($users as $user) {
    echo "processing user # $processCounter\n";
    $record = buildAddressRecord($user);
    $user->set('field_intl_address', $record);
    $user->save();
    $processCounter++;
  }

  echo "processed $processCounter users\n";
  exit();
}

main();