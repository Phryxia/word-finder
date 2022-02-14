import React, { ChangeEvent, useLayoutEffect, useMemo, useState } from 'react'
import { Filter, LengthFilter, NegationFilter } from '@src/model/filter'
import { FilterProps, getFilterId } from './shared'

export default function LengthFilterEditor({ onChange }: FilterProps) {
  const id = useMemo(() => getFilterId(), [])
  const [isNegated, setIsNegated] = useState<boolean>(false)
  const [length, setLength] = useState<number>(1)

  function createFilter(): void {
    let filter: Filter = new LengthFilter(length)
    filter = isNegated ? new NegationFilter(filter) : filter
    onChange(filter)
  }

  useLayoutEffect(() => {
    createFilter()
  }, [isNegated, length])

  function handleNegationChange(event: ChangeEvent<HTMLInputElement>): void {
    setIsNegated(event.target.checked)
  }

  function handleOptionChange(event: ChangeEvent<HTMLInputElement>): void {
    const newValue = Number.parseInt(event.target.value)

    if (!newValue || Number.isNaN(newValue)) return

    setLength(newValue)
  }

  return (
    <div>
      <form>
        <input
          type="checkbox"
          id={id + '-not'}
          checked={isNegated}
          onChange={handleNegationChange}
        />
        <label htmlFor={id + '-not'}>부정</label>

        <label htmlFor={id + '-length'}>길이</label>
        <input
          id={id + '-length'}
          type="number"
          min="1"
          step="1"
          value={length}
          onChange={handleOptionChange}
        />
      </form>
    </div>
  )
}
