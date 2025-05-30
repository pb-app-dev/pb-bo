"use client";

import React, {ReactNode, useState} from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


interface ReactQueryProviderPayload {
    children: ReactNode;
}


const ReactQueryProvider = ({children}: ReactQueryProviderPayload) => {

    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;