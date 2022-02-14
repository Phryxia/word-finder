import React, { useEffect, useMemo, useState } from 'react'
import FilterEditor from './filter'
import { useFilter } from './FilterProvider'

function numbers(size: number): number[] {
  const result: number[] = new Array(size)
  for (let n = 0; n < size; ++n) {
    result[n] = n
  }
  return result
}

export default function Main() {
  const { filter } = useFilter()
  const [progress, setProgress] = useState<number>(0)
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    const urls = numbers(26).map(
      (index) =>
        `./dict/D${String.fromCharCode('A'.charCodeAt(0) + index)}.json`
    )
    const requests = urls.map(async (url) => {
      const result = await (await fetch(url)).json()
      setProgress((progress) => progress + 1)
      return result
    })
    Promise.all(requests).then((responses) => {
      setWords(
        responses.reduce(
          (acc, response) => acc.concat(Object.keys(response)),
          [] as string[]
        )
      )
    })
  }, [])

  const results = useMemo(() => {
    return words
      .filter((word) => filter?.isRecognized(word) ?? true)
      .slice(0, 100)
  }, [words, filter])

  return (
    <div>
      <h1>WORDLE FINDER</h1>

      <progress value={progress / 26}></progress>

      <FilterEditor />

      <div>
        {results.map((word) => (
          <div key={word}>{word}</div>
        ))}
      </div>
    </div>
  )
}
