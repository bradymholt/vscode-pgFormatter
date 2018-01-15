# pgFormatter [![Build Status](https://travis-ci.org/bradymholt/vscode-pgFormatter.svg?branch=master)](https://travis-ci.org/bradymholt/vscode-pgFormatter)

A VS Code extension that beautifies PostgresSQL SQL

## Features

* Supports keywords from SQL-92, SQL-99, SQL-2003, SQL-2008, SQL-2011 and PostgreSQL specifics keywords

## Installation

Install through VS Code extensions area. Search for `pgFormatter`

[Visual Studio Code Market Place: pgFormatter](https://marketplace.visualstudio.com/items?itemName=bradymholt.pgFormatter)

Also, it can be installed with the following command:

```
ext install pgFormatter
```

**pgFormatter requires [Perl](https://www.perl.org/) to be installed and available**

## Configuration

This extension contributes the following settings:

* `pgformatter.spaces`: Number of spaces to indent the code (Type: number; Default: 2)
* `pgformatter.maxLength`: Maximum length of a query (Type: string; Default: null)
* `pgformatter.commaStart`: Use preceding comma in parameter list (Type: boolean; Default: false)
* `pgformatter.commaEnd`: Use trailing comma in parameter list (Type: boolean; Default: true)
* `pgformatter.noComment`: Remove any comments (Type: boolean; Default: false)
* `pgformatter.functionCase`: Case of the function names (Type: ["unchanged", "lowercase", "uppercase", "capitalize"]; Default: "unchanged")
* `pgformatter.keywordCase`: Case of the reserved keywords (Type: ["unchanged", "lowercase", "uppercase", "capitalize"]; Default: "uppercase")
* `pgformatter.perlBinPath`: The path to the perl executable (Type: String; Default: "perl")
