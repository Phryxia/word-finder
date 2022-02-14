import React, { ChangeEvent, useLayoutEffect, useRef, useState } from 'react'
import {
  ExistenceFilter,
  Filter,
  FilterType,
  LengthFilter,
} from '@src/model/filter'

interface FilterCreatorProps {
  onCreate(filter: Filter): void
}

const filterTypeOptions = [
  {
    type: 'none',
    desc: '조건을 선택하세요',
  },
  {
    type: FilterType.LENGTH,
    desc: '단어 길이',
  },
  {
    type: FilterType.EXISTENCE,
    desc: '철자 포함',
  },
]

export default function FilterCreator({ onCreate }: FilterCreatorProps) {
  const [filterType, setFilterType] = useState<FilterType | undefined>(
    undefined
  )
  const ref = useRef<HTMLSelectElement>()
  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    const filterType = event.currentTarget.value as unknown as
      | FilterType
      | 'none'

    if (filterType === 'none') return

    let filter: Filter
    switch (filterType) {
      default:
      case FilterType.LENGTH:
        filter = new LengthFilter(0)
        break
      case FilterType.EXISTENCE:
        filter = new ExistenceFilter('a', 0)
        break
    }

    onCreate(filter)
    setFilterType(undefined)
  }

  useLayoutEffect(() => {
    if (!ref.current) return

    ref.current.selectedIndex = 0
  }, [filterType])

  return (
    <select value={filterType ?? 'none'} onChange={handleSelect} ref={ref}>
      {filterTypeOptions.map(({ type, desc }) => (
        <option key={type} value={type}>
          {desc}
        </option>
      ))}
    </select>
  )
}
