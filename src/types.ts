export enum colors {
    blue = "blue",
    red = "red",
    yellow = "yellow",
  }
  

export enum targetTypes {
    info = "info",
    group = "group",
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


export interface IExpression extends Array<IParenthesis | IOperator | ICondition>{}

export interface IParenthesis {
    itemType: 'parenthesis',
    content: {
        parenType: 'open' | 'close'
    }
}

export interface IOperator {
    itemType: 'operator',
    content: {
        operatorType: 'and' | 'or' | 'not'
    }
}

export interface ICondition {
    itemType: 'condition',
    content:  IConditionContent
}

export interface IConditionContent {
  conditionId: string,
  open ?: boolean,
  target: ITarget,
  match: IMatch,
}  

export interface ITarget {
  name: string,
  type: keyof typeof targetTypes
}

