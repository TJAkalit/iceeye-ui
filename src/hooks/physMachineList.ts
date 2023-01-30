import React, { useState, useEffect } from 'react';
import { IPhysicalMachine, IPhysicalLoad } from '../models';
import { useEnpoints } from './enpoints';
import axios from 'axios';

export function usePhysMachineList() {

    const [items, setItems] = useState<IPhysicalMachine[]>([]);
    const [modal, setModal] = useState(false);
    const ep = useEnpoints();

    const [searchName, setSearchName] = useState('');

    async function fetchItems() {
        const result = await axios.get<IPhysicalMachine[]>(`${ep.physMachine}`);
        setItems(result.data);
    }

    function addItems(item: IPhysicalMachine) {
        setItems(prev=>[...prev, item]);
    }

    useEffect(() => { fetchItems() }, [])

    function searchByName(name: string){
        setSearchName(name);
        const a = async ()=> {
            const r = await axios.get<IPhysicalMachine[]>(`${ep.physMachine}?name=${name}`);
            setItems(r.data);
        };
        a();
    };

    const close = ()=> setModal(false);
    const open = ()=> setModal(true);

    return {
        items, setItems, 
        modal, close, open, 
        addItems, 
        searchName, searchByName,
    };
}

export function usePhysicalLoad(){
    const [data, setData] = useState<IPhysicalLoad[]>([]);
    const ep = useEnpoints();

    function fetchData(){
        const a = async ()=> {
            const r = await axios.get<IPhysicalLoad[]>(`${ep.physMachine}load/`)
            setData(r.data);
        }
        a()
    };

    useEffect(fetchData, []);

    return {data};
}