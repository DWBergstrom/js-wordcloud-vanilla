'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')

const wordLetterFrequencies = function (event) {
  event.preventDefault()
  $('#wtbody').html('')
  $('#ctbody').html('')
  const data = getFormFields(event.target)
  // console.log('data.comment is ', data.comment)
  const charString = data.comment.trim()
  $('#user-input').html(charString)
  const wordString = charString.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ')
  const wordArray = wordString.split(' ')
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

  const charArray = charString.split('')
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
    wordObject[word].frequency = Number(((wordObject[word].count / totalWords) * 100).toFixed(2))
  }

  for (const char in charObject) {
    charObject[char].frequency = Number(((charObject[char].count / totalChars) * 100).toFixed(2))
  }

  console.log('wordObject is ', wordObject)
  console.log('charObject is ', charObject)

  const wordTotalHTML = `(<tr> <td>Total Words: </td> <td>${totalWords}</td> <td>N/A</td> </tr>)`
  $('#wtbody').append(wordTotalHTML)

  const charTotalHTML = `(<tr> <td>Total Characters: </td> <td>${totalChars}</td> <td>N/A</td> </tr>)`
  $('#ctbody').append(charTotalHTML)

  for (const word in wordObject) {
    const wordHTML = `(<tr> <td>${word}</td> <td>${wordObject[word].count}</td> <td>${wordObject[word].frequency}%</td> </tr>)`
    $('#wtbody').append(wordHTML)
  }

  for (const char in charObject) {
    const charHTML = `(<tr> <td>${char}</td> <td>${charObject[char].count}</td> <td>${charObject[char].frequency}%</td> </tr>)`
    $('#ctbody').append(charHTML)
  }

  $('#enter-text-form').trigger('reset')
}

module.exports = {
  wordLetterFrequencies
}
