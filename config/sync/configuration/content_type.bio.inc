<?php
/**
 * @file
 * content_type.bio.inc
 */

$api = '2.0.0';

$data = (object) array(
  'type' => 'bio',
  'name' => 'Biography',
  'description' => 'Container for a History Maker biography imported from The History Makers FileMaker database.',
  'has_title' => '1',
  'title_label' => 'Preferred Name',
  'base' => 'node_content',
  'help' => '',
);

$dependencies = array();

$optional = array(
  'field.node.body.bio' => 'field.node.body.bio',
  'field.node.field_accession_number.bio' => 'field.node.field_accession_number.bio',
  'field.node.field_age.bio' => 'field.node.field_age.bio',
  'field.node.field_archival_image1.bio' => 'field.node.field_archival_image1.bio',
  'field.node.field_archival_image2.bio' => 'field.node.field_archival_image2.bio',
  'field.node.field_bio_image.bio' => 'field.node.field_bio_image.bio',
  'field.node.field_bio_long_path.bio' => 'field.node.field_bio_long_path.bio',
  'field.node.field_birth_date.bio' => 'field.node.field_birth_date.bio',
  'field.node.field_country.bio' => 'field.node.field_country.bio',
  'field.node.field_death_date.bio' => 'field.node.field_death_date.bio',
  'field.node.field_employment.bio' => 'field.node.field_employment.bio',
  'field.node.field_favorite_color.bio' => 'field.node.field_favorite_color.bio',
  'field.node.field_favorite_food.bio' => 'field.node.field_favorite_food.bio',
  'field.node.field_favorite_season.bio' => 'field.node.field_favorite_season.bio',
  'field.node.field_favorite_vacation.bio' => 'field.node.field_favorite_vacation.bio',
  'field.node.field_first_name.bio' => 'field.node.field_first_name.bio',
  'field.node.field_flash_video.bio' => 'field.node.field_flash_video.bio',
  'field.node.field_hm_city_state_country.bio' => 'field.node.field_hm_city_state_country.bio',
  'field.node.field_hm_id.bio' => 'field.node.field_hm_id.bio',
  'field.node.field_interview_date.bio' => 'field.node.field_interview_date.bio',
  'field.node.field_last_name.bio' => 'field.node.field_last_name.bio',
  'field.node.field_maker_category.bio' => 'field.node.field_maker_category.bio',
  'field.node.field_middle_name.bio' => 'field.node.field_middle_name.bio',
  'field.node.field_schools.bio' => 'field.node.field_schools.bio',
  'field.node.field_sex.bio' => 'field.node.field_sex.bio',
  'field.node.field_speakers_bureau.bio' => 'field.node.field_speakers_bureau.bio',
  'field.node.field_sponsor.bio' => 'field.node.field_sponsor.bio',
  'field.node.field_state.bio' => 'field.node.field_state.bio',
  'field.node.field_tags.bio' => 'field.node.field_tags.bio',
  'field.node.field_web_clip1.bio' => 'field.node.field_web_clip1.bio',
  'field.node.field_web_clip2.bio' => 'field.node.field_web_clip2.bio',
  'field.node.field_speakers_bureau_notes.bio' => 'field.node.field_speakers_bureau_notes.bio',
  'field.node.field_birth_day.bio' => 'field.node.field_birth_day.bio',
  'field.node.field_birth_month.bio' => 'field.node.field_birth_month.bio',
  'field.node.field_birth_place_term.bio' => 'field.node.field_birth_place_term.bio',
  'field.node.field_employer.bio' => 'field.node.field_employer.bio',
  'field.node.field_description.bio' => 'field.node.field_description.bio',
  'field.node.field_favorite_quote.bio' => 'field.node.field_favorite_quote.bio',
  'field.node.field_occupation.bio' => 'field.node.field_occupation.bio',
  'field.node.field_organizations.bio' => 'field.node.field_organizations.bio',
  'field.node.field_married.bio' => 'field.node.field_married.bio',
  'field.node.field_speakers_bureau_audience.bio' => 'field.node.field_speakers_bureau_audience.bio',
  'field.node.field_speakers_bureau_available.bio' => 'field.node.field_speakers_bureau_available.bio',
  'field.node.field_speakers_bureau_honorarium.bio' => 'field.node.field_speakers_bureau_honorarium.bio',
  'field.node.field_bureau_available.bio' => 'field.node.field_bureau_available.bio',
  'field.node.field_bureau_honorarium.bio' => 'field.node.field_bureau_honorarium.bio',
  'field.node.field_birth_year.bio' => 'field.node.field_birth_year.bio',
  'field.node.field_bureau_region_city.bio' => 'field.node.field_bureau_region_city.bio',
  'field.node.field_bureau_region_state.bio' => 'field.node.field_bureau_region_state.bio',
  'field.node.field_bureau_region.bio' => 'field.node.field_bureau_region.bio',
  'field.node.field_flash_video_duration.bio' => 'field.node.field_flash_video_duration.bio',
  'field.node.field_flash_video_titles.bio' => 'field.node.field_flash_video_titles.bio',
  'field.node.field_event_title_sponsor.bio' => 'field.node.field_event_title_sponsor.bio',
  'field.node.field_events_sponsors.bio' => 'field.node.field_events_sponsors.bio',
  'field.node.field_spec_sponsor_logos.bio' => 'field.node.field_spec_sponsor_logos.bio',
  'field.node.field_event_title_sponsor_url.bio' => 'field.node.field_event_title_sponsor_url.bio',
  'field.node.field_bio_pdf.bio' => 'field.node.field_bio_pdf.bio',
  'field.node.field_occupation_categories.bio' => 'field.node.field_occupation_categories.bio',
  'field.node.field_search_occupation_category.bio' => 'field.node.field_search_occupation_category.bio',
  'field.node.field_thm_da_link.bio' => 'field.node.field_thm_da_link.bio',
  'field.node.field_sm_da_link.bio' => 'field.node.field_sm_da_link.bio',
  'permission.create_bio_content' => 'permission.create_bio_content',
  'permission.edit_own_bio_content' => 'permission.edit_own_bio_content',
  'permission.edit_any_bio_content' => 'permission.edit_any_bio_content',
  'permission.delete_own_bio_content' => 'permission.delete_own_bio_content',
  'permission.delete_any_bio_content' => 'permission.delete_any_bio_content',
);

$modules = array(
  0 => 'node',
);