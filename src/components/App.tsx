import React from 'react'
import Main from './Main'
import '@src/styles/global.css'
import FilterProvider from './FilterProvider'

export default function App() {
  return (
    <FilterProvider>
      <Main />
    </FilterProvider>
  )
}
