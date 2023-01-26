import React, { useState, useEffect } from 'react';
import { IPhysicalMachine } from '../models';
import { useEnpoints } from './enpoints';
import axios from 'axios';

export function usePhysMachineList() {

    const [items, setItems] = useState<IPhysicalMachine[]>([]);
    const [modal, setModal] = useState(false);
    const ep = useEnpoints();

    async function fetchItems() {
        const result = await axios.get<IPhysicalMachine[]>(`${ep.physMachine}`);
        setItems(result.data);
    }

    function addItems(item: IPhysicalMachine) {
        setItems(prev=>[...prev, item]);
    }

    useEffect(() => { fetchItems() }, [])

    const close = ()=> setModal(false);
    const open = ()=> setModal(true);

    return { items, setItems, modal, close, open, addItems}
}