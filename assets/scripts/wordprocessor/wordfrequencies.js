'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')

const wordLetterFrequencies = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('data.comment is ', data.comment)
  const string = data.comment.trim()
  const wordArray = string.split(' ')
  // console.log('wordArray is ', wordArray)
  const totalWords = wordArray.length
  const wordObject = {}
  wordArray.forEach(element => {
    if (!(element === '')) {
      if (wordObject[element]) {
        wordObject[element].count++
      } else {
        wordObject[element] = { count: 1 }
      }
    }
  })

  const charArray = string.split('')
  // console.log('charArray is ', charArray)
  const totalChars = charArray.length
  const charObject = {}
  charArray.forEach(element => {
    if (charObject[element]) {
      charObject[element].count++
    } else {
      charObject[element] = { count: 1 }
    }
  })

  for (const word in wordObject) {
    wordObject[word].frequency = (wordObject[word].count / totalWords) * 100
  }

  for (const char in charObject) {
    charObject[char].frequency = Number(((charObject[char].count / totalChars) * 100).toFixed(2))
  }

  // console.log('wordArray is ', wordArray, 'and totalWords is ', totalWords)
  // console.log('charArray is ', charArray, 'and totalChars is ', totalChars)
  console.log('wordObject is ', wordObject)
  console.log('charObject is ', charObject)



}

module.exports = {
  wordLetterFrequencies
}
