-- User Account: title (salutation)
insert into
  user__field_salutation
(bundle, deleted, entity_id, revision_id, langcode, delta, field_salutation_value)
SELECT
  bundle,
  deleted,
  entity_id,
  revision_id,
  'en',
  delta,
  field_salutation_value
from
  `thm_legacy`.`field_data_field_salutation`;

-- User Account: first name
insert into
  user__field_name
(bundle, deleted, entity_id, revision_id, langcode, delta, field_name_value)
SELECT
  bundle,
  deleted,
  entity_id,
  revision_id,
  'en',
  delta,
  field_name_value
FROM
  `thm_legacy`.`field_data_field_name`;

-- User Account: middle initial
insert into
  user__field_middle_initial
(bundle, deleted, entity_id, revision_id, langcode, delta, field_middle_initial_value)
SELECT
  bundle,
  deleted,
  entity_id,
  revision_id,
  'en',
  delta,
  field_middle_initial_value
FROM
  `thm_legacy`.`field_data_field_middle_initial`;

-- User Account: last name
insert into
  user__field_user_last_name
(bundle, deleted, entity_id, revision_id, langcode, delta, field_user_last_name_value)
SELECT
  bundle,
  deleted,
  entity_id,
  revision_id,
  'en',
  delta,
  field_user_last_name_value
from
  `thm_legacy`.`field_data_field_user_last_name`;

-- User Account: address
insert into
  user__field_address
(bundle, deleted, entity_id, revision_id, langcode, delta, field_address_value)
SELECT
  bundle,
  deleted,
  entity_id,
  revision_id,
  'en',
  delta,
  field_address_value
from
  `thm_legacy`.`field_data_field_address`;

-- User Account: city
insert into
  user__field_city
(bundle, deleted, entity_id, revision_id, langcode, delta, field_city_value)
SELECT
  bundle,
  deleted,
  entity_id,
  revision_id,
  'en',
  delta,
  field_city_value
FROM
  `thm_legacy`.`field_data_field_city`;

-- User Account: state
insert into
  user__field_location_state
(bundle, deleted, entity_id, revision_id, langcode, delta, field_location_state_value)
SELECT
  bundle,
  deleted,
  entity_id,
  revision_id,
  'en',
  delta,
  field_location_state_value
from
  `thm_legacy`.`field_data_field_location_state`;

-- User Account: Zip Code
insert into
  user__field_zip
(bundle, deleted, entity_id, revision_id, langcode, delta, field_zip_value)
SELECT
  bundle,
  deleted,
  entity_id,
  revision_id,
  'en',
  delta,
  field_zip_value
from
  `thm_legacy`.`field_data_field_zip`;

-- User Account: Cell Number
insert into
  user__field_cell_phone
(bundle, deleted, entity_id, revision_id, langcode, delta, field_cell_phone_value)
SELECT
  bundle,
  deleted,
  entity_id,
  revision_id,
  'en',
  delta,
  field_cell_phone_value
from
  `thm_legacy`.`field_data_field_cell_phone`;

-- User Account: Home Phone
insert into user__field_home_phone (bundle, deleted, entity_id, revision_id, langcode, delta, field_home_phone_value)
  SELECT bundle, deleted, entity_id, revision_id, 'en', delta, field_home_phone_value from `thm_legacy`.`field_data_field_home_phone`;

-- User Account: Work Phone
insert into user__field_work_phone (bundle, deleted, entity_id, revision_id, langcode, delta, field_work_phone_value)
  SELECT bundle, deleted, entity_id, revision_id, 'en', delta, field_work_phone_value from `thm_legacy`.`field_data_field_work_phone`;

-- User Account: Alt Email
insert into user__field_email_address (bundle, deleted, entity_id, revision_id, langcode, delta, field_email_address_value)
  SELECT bundle, deleted, entity_id, revision_id, 'en', delta, field_email_address_value from `thm_legacy`.`field_data_field_email_address`;

