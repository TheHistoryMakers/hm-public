### Become a Member

This drupal module suite depends on the Drupal Commerce 
suite and has a few extra dependencies:


#### PHP Extensions


- The PHP bcmath extension is required. Add the following to your local.config.yml

```
php_packages_extra:
  - "php{{ php_version }}-bcmath"
```
