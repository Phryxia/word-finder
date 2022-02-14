import React, { ChangeEvent, useLayoutEffect, useMemo, useState } from 'react'
import {
  Filter,
  ConjunctionFilter,
  DisjunctionFilter,
  NegationFilter,
  LengthFilter,
  ExistenceFilter,
} from '@src/model/filter'
import { FilterProps, getFilterId } from './shared'
import FilterCreator from './FilterCreator'
import LengthFilterEditor from './LengthFilterEditor'
import ExistenceFilterEditor from './ExistenceFilterEditor'

export default function CompositeFilter({ onChange }: FilterProps) {
  const id = useMemo(() => getFilterId(), [])
  const [childFilters, setChildFilters] = useState<Filter[]>([])
  const [isConjunction, setIsConjunction] = useState<boolean>(true)
  const [isNegated, setIsNegated] = useState<boolean>(false)

  function createFilter(): void {
    let filter: Filter = isConjunction
      ? new ConjunctionFilter(childFilters)
      : new DisjunctionFilter(childFilters)
    filter = isNegated ? new NegationFilter(filter) : filter

    onChange(filter)
  }

  useLayoutEffect(() => {
    createFilter()
  }, [childFilters, isConjunction, isNegated])

  function updateFilter(targetIndex: number, newFilter: Filter): void {
    setChildFilters(
      childFilters.map((filter, index) =>
        index === targetIndex ? newFilter : filter
      )
    )
  }

  function removeFilter(targetIndex: number): void {
    setChildFilters(childFilters.filter((_, index) => index !== targetIndex))
  }

  function handleNegationChange(event: ChangeEvent<HTMLInputElement>): void {
    setIsNegated(event.target.checked)
  }

  function handleIsConjunctionChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setIsConjunction(event.target.value === 'and')
  }

  function handleChildCreation(filter: Filter) {
    setChildFilters((childFilters) => [...childFilters, filter])
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

        <input
          type="radio"
          name={id + '-mode'}
          id={id + '-mode-and'}
          value="and"
          checked={isConjunction}
          onChange={handleIsConjunctionChange}
        />
        <label>AND</label>

        <input
          type="radio"
          name={id + '-mode'}
          id={id + '-mode-or'}
          value="or"
          checked={!isConjunction}
          onChange={handleIsConjunctionChange}
        />
        <label>OR</label>
      </form>

      <div>
        {childFilters.map((childFilter, index) => {
          let FilterEditor: (props: FilterProps) => JSX.Element

          if (childFilter instanceof NegationFilter) {
            childFilter = childFilter.filter
          }

          if (childFilter instanceof LengthFilter) {
            FilterEditor = LengthFilterEditor
          } else if (childFilter instanceof ExistenceFilter) {
            FilterEditor = ExistenceFilterEditor
          } else if (childFilter instanceof CompositeFilter) {
            FilterEditor = CompositeFilter
          }

          if (!FilterEditor) return null

          return (
            <div key={index}>
              <FilterEditor
                onChange={(filter) => updateFilter(index, filter)}
              />

              <button onClick={() => removeFilter(index)}>조건 삭제</button>
            </div>
          )
        })}

        <FilterCreator onCreate={handleChildCreation} />
      </div>
    </div>
  )
}
