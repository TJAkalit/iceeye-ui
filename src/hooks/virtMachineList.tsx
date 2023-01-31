import React, { useState, useEffect, useRef } from 'react';
import { IVirtualMachine } from '../models';
import { useEnpoints } from './enpoints';
import axios from 'axios';

export function useVirtMachineList() {

    const [items, setItems] = useState<IVirtualMachine[]>([]);
    const [modal, setModal] = useState(false);
    const ep = useEnpoints();

    const [searchName, setSearchName] = useState('');
    const [searchHostName, setSearchHostName] = useState('');

    async function fetchItems() {
        const result = await axios.get<IVirtualMachine[]>(`${ep.virtMachine}`);
        setItems(result.data);
    };

    function addItems(item: IVirtualMachine) {
        setItems(prev => [...prev, item]);
    };

    function fetchBySearch(name: string, host_name: string){
        const a = async ()=>{
            const result = await axios.get<IVirtualMachine[]>(`${ep.virtMachine}?name=${name}&host_name=${host_name}`);
            setItems(result.data);
        };
        a();
    }

    useEffect(() => { fetchItems() }, []);

    const close = () => setModal(false);
    const open = () => setModal(true);

    return {
        items, setItems, 
        modal, close, open, 
        addItems,
        searchName, setSearchName,
        searchHostName, setSearchHostName,
        fetchBySearch,
    }
}