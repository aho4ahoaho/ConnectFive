'use client';

import React from 'react';

export const Title = ({ children }: { children: React.ReactNode }) => {
    React.useEffect(() => {
        document.title = String(children);
    }, [children]);
    return <></>;
};
