import React, {useContext} from 'react';
import { ItemContext } from '../../services/ItemContext';
import { Button } from 'semantic-ui-react';
import { parenthesisMatch } from '../../services/ParenthesisMatch';

const Analyze = () => {
    const { items } = useContext(ItemContext).state;
    const analyze = () => console.log(parenthesisMatch(items));
return <Button onClick={analyze}>Analyze</Button>
}
export default Analyze;