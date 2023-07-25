import { useSpeechRecognition } from "react-speech-recognition"
import { useRandomizeTranscript } from "./use-randomize-transcript"

export const useSpeechToText = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const { addRandomNumberToWord } = useRandomizeTranscript()

  const getResultWithRandomNumber = () => {
    if (transcript) {
      const words = transcript.split(" ")
      return words.map(addRandomNumberToWord).join(" ")
    }
    return ""
  }

  return {
    transcript,
    resetTranscript,
    getResultWithRandomNumber,
  }
}
