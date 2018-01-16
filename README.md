# pgFormatter [![Build Status](https://travis-ci.org/bradymholt/vscode-pgFormatter.svg?branch=master)](https://travis-ci.org/bradymholt/vscode-pgFormatter)

A VS Code extension that beautifies PostgresSQL SQL, using the Perl based [pgFormatter](https://github.com/darold/pgFormatter) tool developed by [Gilles Darold](https://github.com/darold).

## Features

* Supports keywords from SQL-92, SQL-99, SQL-2003, SQL-2008, SQL-2011 and PostgreSQL specifics keywords
* Provides configuration to control formatting style

## Installation

**pgFormatter requires [Perl](https://www.perl.org/) to be installed and available**. You can either add it to your PATH or set the `pgformatter.perlBinPath` configuration setting.

To install this extension:

1. Press `Ctrl + Shift + X` (`Cmd + Shift + X` on macOS), wait a moment while the list of available extensions is populated
2. Type `pgFormatter` and Click "Install"

## Configuration

This extension has the following configuration settings:

* `pgformatter.spaces` - Number of spaces to indent the code (Default: 2)
* `pgformatter.maxLength` - Maximum length of a query
* `pgformatter.commaStart` - Use preceding comma in parameter list (Default: false)
* `pgformatter.commaEnd` - Use trailing comma in parameter list (Default: true)
* `pgformatter.noComment` - Remove any comments (Default: false)
* `pgformatter.functionCase` - Case of the function names (Options: ["unchanged", "lowercase", "uppercase", "capitalize"]; Default: "unchanged")
* `pgformatter.keywordCase` - Case of the reserved keywords (Options: ["unchanged", "lowercase", "uppercase", "capitalize"]; Default: "uppercase")
* `pgformatter.perlBinPath` - The path to the perl executable (Default: "perl")
