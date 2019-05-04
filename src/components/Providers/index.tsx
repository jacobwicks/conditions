import React from 'react';
import { ItemProvider } from '../../services/ItemContext';
import { InputProvider } from '../../services/InputContext';

const Providers = (props: any) => 
<ItemProvider
{...props}
>
<InputProvider
{...props}
>
</InputProvider>
</ItemProvider>

export default Providers;