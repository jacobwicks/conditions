import React, {useContext} from 'react';
import { ItemContext } from '../../services/ItemContext';
import { Button } from 'semantic-ui-react';

import { conditionValue } from '../../services/ConditionValue'
import { InputContext } from '../../services/InputContext';

//In more general terms, the number of passes you'll need through your expression
//is determined by the number of precedence levels you have;
//and you need to process the precedence levels from lowest to highest.
// Split expression up; recursively evaluate sub-expressions just considering next
//precedence level and upwards; combine to get final answer.
//https://stackoverflow.com/questions/34904895/how-to-make-program-to-calculate-accordingly-to-order-of-operations-in-math-ja

const Analyze = () => {
    const { items } = useContext(ItemContext).state;
    const { inputs } = useContext(InputContext).state;
    //a single condition may be evaluated to true or false
    //an expression may be either
        //a single condition
        //or a group of operators and conditions
    //an expression may be evaluated to true or false

    //items is an Array<IParenthesis | IOperator | ICondition>{}
    //taken together, these may parse into none, one, or many expressions

    //
    const evaluate = () => {
        //1. split the items into individual expressions
        //2. evaluate the individual expressions
        //3. evaluate expressions with conditionals
        const expression = items.reduce((acc: any[], cur: any) => {
            const { itemType } = cur;
            if (itemType === 'parenthesis') return acc;
            if (itemType === 'operator') {
                const {operatorType } = cur.content;
                let operator;
                if (operatorType === 'not') operator = '!';
                if (operatorType === 'and') operator = '&&';
                if (operatorType === 'or') operator = '||'
                acc.push(operator)
            }
            if (itemType === 'condition') {
                const { conditionId } = cur.content;
                acc.push(conditionValue({conditionId, items, inputs}))
            }
            return acc;
        }, [])

        console.log(expression)

        const evaluate = (operator: string, value: boolean) => {
            const operations = {
                '!': () => !value,
            }
            //@ts-ignore
            return (operations[operator]() || undefined)
        }
        console.log(evaluate(expression[0], expression[1]))
        // const evaluation = (expression: any) => {
        //     const operators = expression.reduce((acc: string[], cur: any) => {
        //         if (itemType === 'operator') {

        //         }
        //     })
        // }
    }
return <Button onClick={evaluate}>Evaluate</Button>
}
export default Analyze;
