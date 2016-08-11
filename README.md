Chapter 1
=========
folder structure
1. entry point is separate from source code.
2. source code is organized into folders
3. application components are consolidated in application.js
4. one folder per module may seem excessive, but help later on when adding tests, constants etc

modules
1. each file exports a javascript object, function or class (demonstrate simple modules)
2. create test.js file to make sure imports are correct and work properly
  a. allows for basic testing while iterating quickly
  b. tests are ideal, but architecture may change in the beginning so wait on that
3. well defined modules and simple dependency tree make application easy to reason about

classes
1. classes hold state and have methods (anything else?)

syntax
1. module.exports
2. use const for modules
3. class syntax
