import React, { useEffect, useState } from "react";
import { IService, IStorage } from "../models";
import { useEnpoints } from './enpoints'
import axios from "axios";
import { useNavigate } from "react-router-dom";

type MapType = {
    [id: number]: string;
};

const StorageType: MapType = {};
StorageType[1] = 'SSD';
StorageType[2] = 'HDD';
StorageType[3] = 'NVMe';

const DummyService: IStorage = {
    name: '',
    type: 0,
    size: 0,
    pm_id: 0,
}

export function useStorage(id: number) {

    const ep = useEnpoints();
    const nav = useNavigate();

    const [storage, setStorage] = useState(DummyService);

    const [name, setName] = useState(storage.name);
    const [type, setType] = useState(storage.type);
    const [size, setSize] = useState(storage.size);
    const [pm_id, setPMid] = useState(storage.pm_id);

    const [cName, setCName] = useState(false);
    const [cType, setCType] = useState(false);
    const [cSize, setCSize] = useState(false);
    const [cPMid, setCPMid] = useState(false);

    function updateItem() {
        const a = async () => {
            await axios.put<IStorage>(
                `${ep.storage}${id}`,
                {
                    name: name,
                    type: type,
                    size: size,
                    pm_id: pm_id,
                }
            )
        };
        a();
        nav(0);
    };

    function fetchItem() {
        const a = async () => {
            const r = await axios.get<IStorage>(`${ep.storage}${id}`);
            setStorage(r.data);
            setName(r.data.name);
            setType(r.data.type);
            setSize(r.data.size);
            setPMid(r.data.pm_id);
        };
        a();
    };

    function deleteItem() {
        const a = async () => {
            const r = await axios.delete(`${ep.storage}${id}`)
            nav('/storage/')
        };
        a();
    }

    useEffect(fetchItem, [])

    useEffect(
        () => {
            setCName(name != storage.name); setCType(type != storage.type);
            setCSize(size != storage.size); setCPMid(pm_id != storage.pm_id);
        }
    )

    return {
        name, setName, cName,
        type, setType, cType,
        size, setSize, cSize,
        pm_id, setPMid, cPMid,
        updateItem,
        deleteItem,
    }
}

export function useCreateStorage() {

    const [name, setName] = useState('');
    const [type, setType] = useState(0);
    const [size, setSize] = useState(0);
    const [machine, setMachine] = useState(0);
    const ep = useEnpoints();
    const nav = useNavigate();

    function createItem() {
        const a = async () => {
            const r = axios.post(
                `${ep.storage}`,
                {
                    name: name,
                    type: type,
                    size: size,
                    pm_id: machine,
                }
            );
        };
        a();
        nav(0);
    };

    return {
        name, setName,
        type, setType,
        size, setSize,
        machine, setMachine,
        createItem,
    }
}

export function useStorageList() {

    const [items, setItems] = useState<IStorage[]>([]);
    const [searchName, setSearchName] = useState('');
    const ep = useEnpoints();

    function fetchItems() {
        const a = async () => {
            const r = await axios.get<IStorage[]>(`${ep.storage}`);
            setItems(r.data);
        };
        a();
    }

    function fetchItemsSearch(name: string) {
        setSearchName(name);
        const a = async () => {
            const r = await axios.get<IStorage[]>(`${ep.storage}?machine_name=${name}`);
            setItems(r.data)
        }
        a();
    }
    useEffect(fetchItems, []);



    return {
        items,
        searchName,
        setSearchName,
        fetchItemsSearch,
    };
}