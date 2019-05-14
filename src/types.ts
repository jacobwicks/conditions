export enum colors {
    blue = "blue",
    red = "red",
    yellow = "yellow",
    orange = 'orange',
    green = 'green',
    purple = 'purple',
    grey = 'grey'
  }

export enum directions {
  horizontal = 'horizontal',
  vertical = 'vertical'
}

export enum targetTypes {
    info = "info",
    group = "group",
  }

export enum matchTypes {
    exact = 'exact',
    partial = 'partial',
    partialInclusive = 'partialInclusive',
    none = 'none',
    any = 'any'
}

export interface IMatch {
    values: string[],
    type: keyof typeof matchTypes
}

export interface IExpression extends Array<IParenthesis | IOperator | ICondition>{}

export interface IFunction {
  id: string,
  name?: string,
  target?: string,
  conditions?: string[]
} 

export interface IInput {
  id: string,
  name: string,
  value: string
}

export interface IParenthesis {
    itemType: 'parenthesis',
    content: {
        parenType: 'open' | 'close' | 'pair',
        highlight?: boolean
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

export interface IFunctionContent {
  functionId: string,
  open ?: boolean,
  target: ITarget,
  conditions: string[]
}

export interface ITarget {
  id: string,
}

export interface INewFunctionPlaceholder {
  itemType: 'functionPlaceholder'
}

export interface INewParenthesis {
  itemType: 'parenthesis',
  content: {
    parenType: 'pair' | 'open' | 'close'
  }
}

export interface INewComponents extends Array<INewFunctionPlaceholder | IOperator | INewParenthesis>{}


export interface IAction {
  type: string,
  [key: string] : any
}

export enum responseEvaluators {
  anyResponse = 'anyResponse',
  noResponse = 'noResponse'
}

export enum searchEvaluators {
  exact = 'exact',
  inclusive = 'inclusive',
  partial = 'partial'
}

export enum mathEvaluators {
  equals = 'equals',
  greaterThan = 'greaterThan',
  lessThan = 'lessThan',
  greaterThanOrEqualTo = 'greaterThanOrEqualTo',
  lessThanOrEqualTo = 'lessThanOrEqualTo',
  between = 'between'
}

export type evaluator = responseEvaluators | searchEvaluators | mathEvaluators;

export const allEvaluators = {
  ...responseEvaluators,
  ...searchEvaluators,
  ...mathEvaluators
};

export interface ICondition2 {
  name ?: string,
  id: string,
  evaluator: evaluator,
  values ?: (string | number)[]
}