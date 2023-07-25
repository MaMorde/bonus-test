import { useState } from "react"

type WordRandomNumbers = { [key: string]: number }

export const useRandomizeTranscript = () => {
  const [wordRandomNumbers, setWordRandomNumbers] = useState<WordRandomNumbers>(
    {}
  )

  const addRandomNumberToWord = (word: string) => {
    const randomNumber =
      wordRandomNumbers[word] !== undefined
        ? wordRandomNumbers[word]
        : Math.floor(Math.random() * 100)
    setWordRandomNumbers((prev) => ({ ...prev, [word]: randomNumber }))
    return word + " " + randomNumber
  }

  return {
    addRandomNumberToWord,
  }
}
