#!/usr/bin/env node
'use strict'

const program = require('commander')
const { prompt, registerPrompt } = require('inquirer')
const { exec } = require('child_process')
const fs = require('fs')
const ejs = require('ejs')

const create = require('./createFiles/create')
registerPrompt('recursive', require('inquirer-recursive'))
const questions = [
  {
    type : 'input',
    name : 'name',
    message : 'Name of entity'
  },
  {
    type : 'checkbox',
    name : 'methods',
    message : 'What methods do you want to add in route?',
    choices: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
    ]
  },
  {
    type : 'confirm',
    name : 'createSchema',
    message : 'Do you want to create schema for this entity?',
  },
  {
    when: ({ createSchema }) => (createSchema),
    type : 'recursive',
    name : 'fields',
    message : 'Create field?',
    prompts: [
      {
        type: 'input',
        name: 'fieldName',
        message: 'Fieldname: '
      },
      {
        type: 'list',
        name: 'fieldType',
        message: 'Select type of field',
        choices: [
          'String',
          'Number',
          'Date',
          'Buffer',
          'Boolean',
          'Mixed',
          'ObjectId',
          'Array',
          'Decimal128',
          'Map'
        ]
      },
      {
        type: 'confirm',
        name: 'fieldRequired',
        message: 'Is this field required?'
      }
    ]
  },
];

program
  .version('0.0.1')
  .description('CLI interface for creating api boilerplate')

program
  .command('createFile')
  .alias('cf')
  .description('create file')
  .action(() => {
    prompt(questions).then(({ methods, ...answers}) => {
      const reducedMethods = methods.reduce((prev, current) => ({
        ...prev,
        [current]: true
      }), {})
      create('Model', { ...answers, methods: reducedMethods }, () => (console.log('Model created')))
      create('Route', { ...answers, methods: reducedMethods }, () => (console.log('Route created')))
      create('Test', { ...answers, methods: reducedMethods }, () => (console.log('Test created')))
    })
  })

program.parse(process.argv)