import { Filter } from '@src/model/filter'

export interface FilterProps {
  onChange(filter: Filter): void
}

let idCnt = 0

export function getFilterId(): string {
  return (idCnt++).toString()
}
