import "regenerator-runtime/runtime"
import React, { useState } from "react"
import { Layout } from "~/components/layout/layout"
import SpeechRecognition from "react-speech-recognition"
import { useSpeechToText } from "~/hooks/use-speech-to-text"

export default function Speech() {
  const [isRecording, setIsRecording] = useState(false)
  const [result, setResult] = useState("")

  const { transcript, resetTranscript, getResultWithRandomNumber } =
    useSpeechToText()

  const handleStartRecording = () => {
    setIsRecording(true)
    resetTranscript()
    setResult("")
    SpeechRecognition.startListening({ continuous: true })
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    SpeechRecognition.stopListening()
  }

  React.useEffect(() => {
    setResult(getResultWithRandomNumber())
  }, [transcript])

  return (
    <Layout>
      <h1>Распознавание речи с добавлением случайного числа</h1>
      <div>
        <p>Результат:</p>
        <p>{result}</p>
        {isRecording ? (
          <button onClick={handleStopRecording}>Stop</button>
        ) : (
          <button onClick={handleStartRecording}>Start</button>
        )}
        <button onClick={resetTranscript}>Сбросить</button>
      </div>
    </Layout>
  )
}
