import React, { useState, useEffect } from 'react';
import { IVirtualMachine } from '../models';
import { useEnpoints } from './enpoints';
import axios from 'axios';

export function useVirtMachineList() {

    const [items, setItems] = useState<IVirtualMachine[]>([]);
    const [modal, setModal] = useState(false);
    const ep = useEnpoints();

    async function fetchItems() {
        const result = await axios.get<IVirtualMachine[]>(`${ep.virtMachine}`);
        setItems(result.data);
    }

    function addItems(item: IVirtualMachine) {
        setItems(prev=>[...prev, item]);
    }

    useEffect(() => { fetchItems() }, [])

    const close = ()=> setModal(false);
    const open = ()=> setModal(true);

    return { items, setItems, modal, close, open, addItems}
}