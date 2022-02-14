import { Filter } from '@src/model/filter'
import React, { createContext, ReactElement, useContext, useState } from 'react'

interface IFilterContext {
  filter?: Filter
  setFilter(newFilter?: Filter): void
}

// @ts-ignore
const FilterContext = createContext<IFilterContext>()

export default function FilterProvider({
  children,
}: {
  children: ReactElement
}) {
  const [filter, setFilter] = useState<Filter | undefined>(undefined)

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter(): IFilterContext {
  return useContext(FilterContext)
}
