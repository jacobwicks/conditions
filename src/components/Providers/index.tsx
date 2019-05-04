import React from 'react';
import { ExpressionProvider } from '../../services/ExpressionContext';
import { InputProvider } from '../../services/InputContext';

const Providers = (props: any) => 
<ExpressionProvider
{...props}
>
<InputProvider
{...props}
>
</InputProvider>
</ExpressionProvider>

export default Providers;