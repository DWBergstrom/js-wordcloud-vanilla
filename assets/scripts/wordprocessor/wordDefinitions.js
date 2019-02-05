'use strict'

const wordDefinitions = function (event) {
  event.preventDefault()
  console.log('event in wordDefinitions is ', event)
}

module.exports = {
  wordDefinitions
}
