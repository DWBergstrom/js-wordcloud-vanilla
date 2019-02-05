'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const wordEvents = require('./wordprocessor/wordfrequencies.js')
const wordDefine = require('./wordprocessor/wordDefinitions.js')

$(() => {
  $('#enter-text-form').on('submit', wordEvents.wordLetterFrequencies)
  $('a').click(() => console.log('word clicked'))
})
