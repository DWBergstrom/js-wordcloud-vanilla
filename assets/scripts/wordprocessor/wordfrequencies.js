'use strict'

const d3 = require('d3')
const getFormFields = require('../../../lib/get-form-fields.js')
const datamuse = require('datamuse')

datamuse.request('words?ml=ringing in the ears')
  .then((json) => {
    console.log('datamuse results: ', json)
  })

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

  console.log('wordObject object.entries is ', Object.entries(wordObject))
  console.log('charObject is ', charObject)

  const d3Data = Object.entries(wordObject)

  // d3 chart

  function drawChart (d3Data) {
    // set the dimensions and margins of the graph
    let margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom

    console.log('we are in drawChart and d3Data is ', d3Data)
    // set the ranges
    const x = d3.scaleTime().range([0, width])
    const y = d3.scaleLinear().range([height, 0])

    // define the line
    const valueline = d3.line()
      .x(function (d) {
        console.log('we are in valueline', d)
        return x(d.word)
      })
      .y(function (d) { return y(d.percentage) })

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select('#d3-chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g').attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')')
  }

  drawChart(d3Data)

  const wordTotalHTML = `(<tr> <td>Total Words: </td> <td>${totalWords}</td> <td>N/A</td> </tr>)`
  $('#wtbody').append(wordTotalHTML)

  const charTotalHTML = `(<tr> <td>Total Characters: </td> <td>${totalChars}</td> <td>N/A</td> </tr>)`
  $('#ctbody').append(charTotalHTML)

  for (const word in wordObject) {
    const wordHTML = `(<tr> <td><a data-id="${word}" class="define" href="#definition-div">${word}</a></td> <td>${wordObject[word].count}</td> <td>${wordObject[word].frequency}%</td> </tr>)`
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
