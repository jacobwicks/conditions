import React, {useContext} from 'react';
import { ItemContext } from '../../services/ItemContext';
import { Button } from 'semantic-ui-react';
import { parenthesisMatch } from '../../services/ParenthesisMatch';
import { IParenthesis, ICondition, IOperator } from '../../types';
import { conditionValue } from '../../services/ConditionValue'
import { InputContext } from '../../services/InputContext';

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

