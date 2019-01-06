function wordLetterFrequencies (string) {
  const wordArray = string.split(' ')
  const totalWords = wordArray.length
  const wordObject = {}
  wordArray.forEach(element => {
    if(wordObject[element]) {
      wordObject[element]++
    } else {
      wordObject[element] = 1
    }
  })

  const charArray = string.split('')
  const totalChars = charArray.length
  const charObject = {}
  charArray.forEach(element => {
    if(charObject[element]) {
      charObject[element]++
    } else {
      charObject[element] = 1
    }
  })

  // console.log('wordArray is ', wordArray, 'and totalWords is ', totalWords)
  // console.log('charArray is ', charArray, 'and totalChars is ', totalChars)
  // console.log('wordObject is ', wordObject)
  // console.log('charObject is ', charObject)

  const wordFrequencyObject = {}
  for (let word in wordObject) {
    wordFrequencyObject[word] = Number(((wordObject[word]/totalWords)*100).toFixed(2))
  }

  console.log(wordFrequencyObject)

  const charFrequencyObject = {}
  for (let char in charObject) {
    charFrequencyObject[char] = Number(((charObject[char]/totalChars)*100).toFixed(2))
  }

  console.log(charFrequencyObject)

}
