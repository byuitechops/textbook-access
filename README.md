# Textbook Access
### *Package Name*: textbook-access
### *Child Type*: post import
### *Platform*: online default, pathway default, campus optional

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose

There is no current module for textbook information. This child module creates a module for that purpose.

## How to Install

```
npm install textbook-access
```

## Run Requirements

Must run after action-series-master.

## Options

None

## Outputs

None

## Process

1. Make a POST request to create a new module with `name: 'Textbook Access'` and `position: 2`
2. Make a PUT request to `publish` the module (cannot be done upon creation)

## Log Categories

- Created Module
- Published Module

## Requirements

Must create a new module named `Textbook Access` and publish it as the second module in the course 