# Change Log

All notable changes to the "pgFormatter" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.10.0] - 2019-10-30

### Added

Added `noGrouping` option which adds a newline between statements in transaction regroupement

## [1.9.0] - 2019-10-04

### Added

Added handling for "postgres" language type.

## [1.8.0] - 2019-09-20

### Changed

- Updated to pgFormatter 4.1

## [1.6.0] - 2019-01-29

### Added

- Added support for options:
  - `commaBreak`
  - `formatType`
  - `placeholder`

### Changed

- Upgraded to pgFormatter 3.2

### Removed 

- Removed support for `maxLength` option (because it was confusing)

## [1.5.0] - 2018-09-12

### Changed

* Add language bindings for pgsql extension

## [1.4.0] - 2018-09-12

### Changed

* Upgrades pgFormatter to 3.1

## [1.3.0] - 2018-01-19

### Added

* Adding a comment on the first line of a SQL file with text "pgFormatter-ignore" will now prevent that file from being formatted

## [0.0.1] - 2018-01-15

* Initial release

