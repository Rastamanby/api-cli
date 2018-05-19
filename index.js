#!/usr/bin/env node
'use strict'

const program = require('commander')
const { prompt } = require('inquirer')
const { exec } = require('child_process')
const fs = require('fs')
const ejs = require('ejs')

const create = require('./createFiles/create')

const questions = [
  {
    type : 'input',
    name : 'name',
    message : 'Name of file'
  },
  {
    type : 'checkbox',
    name : 'components',
    message : 'Check components what you want to create',
    choices: [
      'Route',
      'Model',
      'Test'
    ]
  },
  // {
  //   type : 'input',
  //   name : 'phone',
  //   message : 'Enter phone number ...'
  // },
  // {
  //   type : 'input',
  //   name : 'email',
  //   message : 'Enter email address ...'
  // }
];

program
  .version('0.0.1')
  .description('CLI interface for creating api boilerplate')

program
  .command('createFile')
  .alias('cf')
  .description('create file')
  .action(() => {
    prompt(questions).then(({ name }) => {
      create('Model', name, () => (console.log('Model created')))
      create('Route', name, () => (console.log('Route created')))
      create('Test', name, () => (console.log('Test created')))
    })
  })

program.parse(process.argv)