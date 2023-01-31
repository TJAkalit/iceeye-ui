import React, { createContext, useState, useEffect } from 'react';
import { IPhysicalMachine } from '../models';
import { useEnpoints } from '../hooks/enpoints';
import axios from 'axios';
import { useStorage } from '../hooks/Storage';

interface IPMListContext {
    items: IPhysicalMachine[]
};

export const PMListContext = createContext<IPMListContext>(
    {
        items: []
    }
);

export function PMListState({ children }: { children: React.ReactNode }) {

    const [items, setItems] = useState<IPhysicalMachine[]>([]);
    const ep = useEnpoints();

    function fetchItems() {
        const a = async () => {
            const r = await axios.get<IPhysicalMachine[]>(`${ep.physMachine}`);
            setItems(r.data);
        };
        a()
    };
    useEffect(fetchItems, []);

    return (
        <PMListContext.Provider value={{ items }}>
            {children}
        </PMListContext.Provider>
    )
}

interface IPMSizeContext {
    items: { id: number, size: number }[]
}

export const PMSizeContext = createContext<IPMSizeContext>(
    {
        items: []
    }
)

export function PMSizeState({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<{ id: number, size: number }[]>([])
    const ep = useEnpoints();

    function fetchItems() {
        const a = async () => {
            const r = await axios.get<{ id: number, size: number }[]>(`${ep.physMachine}storages/`)
            setItems(r.data);
        };
        a();
    };

    useEffect(fetchItems, []);

    return (
        <PMSizeContext.Provider value={{ items }}>
            {children}
        </PMSizeContext.Provider>
    )
}