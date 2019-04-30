export enum colors {
    blue = "blue",
    red = "red",
    yellow = "yellow",
  }
  

export enum targetTypes {
    info = "info",
    group = "group",
  }

export interface ITarget {
    name: string,
    type: keyof typeof targetTypes
}

export enum matchTypes {
    exact = 'exact',
    partial = 'partial',
    none = 'none',
    any = 'any'
}

export interface IMatch {
    values: string[],
    type: keyof typeof matchTypes
}

export interface ICondition {
    conditionId: string,
    open ?: boolean,
    target: ITarget,
    match: IMatch,
}
