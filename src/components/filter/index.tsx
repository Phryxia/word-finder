import { Filter } from '@src/model/filter'
import React from 'react'
import { useFilter } from '@src/components/FilterProvider'
import CompositeFilter from './CompositeFilterEditor'

interface FilterEditorProps {}

export default function FilterEditor({}: FilterEditorProps) {
  const { setFilter } = useFilter()

  function handleFilterChange(filter: Filter): void {
    setFilter(filter)
  }

  return (
    <div>
      <CompositeFilter onChange={handleFilterChange} />
    </div>
  )
}
