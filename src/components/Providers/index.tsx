import React from 'react';
import { ConditionsProvider } from '../../services/ConditionsContext';
import { ExpressionProvider } from '../../services/ExpressionContext';
import { FunctionsProvider } from '../../services/FunctionsContext';
import { InputProvider } from '../../services/InputContext';
import { InstructionsProvider } from '../../services/InstructionsContext';

const Providers = (props: any) => 
<ConditionsProvider>
<ExpressionProvider>
<FunctionsProvider>
<InputProvider>
<InstructionsProvider
{...props}
/>
</InputProvider>
</FunctionsProvider>
</ExpressionProvider>
</ConditionsProvider>

export default Providers;