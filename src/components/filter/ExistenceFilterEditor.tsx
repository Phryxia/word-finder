import React, { ChangeEvent, useLayoutEffect, useMemo, useState } from 'react'
import { ExistenceFilter, Filter, NegationFilter } from '@src/model/filter'
import { FilterProps, getFilterId } from './shared'

export default function ExistenceFilterEditor({ onChange }: FilterProps) {
  const id = useMemo(() => getFilterId(), [])
  const [isNegated, setIsNegated] = useState<boolean>(false)
  const [target, setTarget] = useState<string>('a')
  const [index, setIndex] = useState<number>(-1)

  function createFilter(): void {
    if (!target) return

    let filter: Filter = new ExistenceFilter(
      target,
      index > -1 ? index : undefined,
      true
    )
    filter = isNegated ? new NegationFilter(filter) : filter
    onChange(filter)
  }

  useLayoutEffect(() => {
    createFilter()
  }, [isNegated, target, index])

  function handleNegationChange(event: ChangeEvent<HTMLInputElement>): void {
    setIsNegated(event.target.checked)
  }

  function handleCharChange(event: ChangeEvent<HTMLInputElement>): void {
    setTarget(event.target.value.replace(/[^a-zA-Z]/g, ''))
  }

  function handleUsePositionChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.checked) {
      setIndex(0)
    } else {
      setIndex(-1)
    }
  }

  function handleIndexChange(event: ChangeEvent<HTMLInputElement>): void {
    const newValue = Number.parseInt(event.target.value)

    if (!newValue || Number.isNaN(newValue)) return

    setIndex(newValue)
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

        <label htmlFor={id + '-char'}>철자</label>
        <input
          id={id + '-char'}
          type="text"
          value={target}
          onChange={handleCharChange}
        />

        <label htmlFor={id + '-use-position'}>위치 여부</label>
        <input
          id={id + '-use-position'}
          type="checkbox"
          onChange={handleUsePositionChange}
          checked={index > -1}
        />

        {index > -1 && (
          <>
            <label htmlFor={id + '-index'}>위치</label>
            <input
              id={id + '-index'}
              type="number"
              min="0"
              step="1"
              value={index}
              onChange={handleIndexChange}
            />
          </>
        )}
      </form>
    </div>
  )
}
