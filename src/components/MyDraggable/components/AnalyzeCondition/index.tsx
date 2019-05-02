import React from 'react';
import { Button } from 'semantic-ui-react';
import { match } from '../../../../services/Match';

const AnalyzeCondition = ({conditionId}: {conditionId: string}) => {
    const analyze = () => console.log(
        match({
            searchString: '',
            items: [],
        }))
    return (
        <Button onClick={() => analyze()}>Analyze</Button>
    )
}

export default AnalyzeCondition;