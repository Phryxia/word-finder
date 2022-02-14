export abstract class Filter {
  public abstract isRecognized(word: string): boolean
}

export class LengthFilter extends Filter {
  public constructor(public readonly length: number) {
    super()
  }

  public isRecognized(word: string): boolean {
    return word.length === this.length
  }
}

export class ExistenceFilter extends Filter {
  public constructor(
    public readonly char: string,
    public readonly index: number | undefined,
    public readonly ignoreCases: boolean
  ) {
    super()
  }

  public isRecognized(word: string): boolean {
    let index: number
    if (this.ignoreCases) {
      index = word.toUpperCase().indexOf(this.char.toUpperCase())
    } else {
      index = word.indexOf(this.char)
    }

    return this.index !== undefined ? index === this.index : index > -1
  }
}

export class ConjunctionFilter extends Filter {
  public constructor(public readonly filters: Filter[]) {
    super()
  }

  public isRecognized(word: string): boolean {
    return this.filters.every((filter) => filter.isRecognized(word))
  }
}

export class DisjunctionFilter extends Filter {
  public constructor(public readonly filters: Filter[]) {
    super()
  }

  public isRecognized(word: string): boolean {
    return this.filters.some((filter) => filter.isRecognized(word))
  }
}

export class NegationFilter extends Filter {
  public constructor(public readonly filter: Filter) {
    super()
  }

  public isRecognized(word: string): boolean {
    return !this.filter.isRecognized(word)
  }
}

export const enum FilterType {
  LENGTH = 'LENGTH',
  EXISTENCE = 'EXISTENCE',
}
