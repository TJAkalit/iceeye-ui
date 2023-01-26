import React, { useState, useEffect } from "react";
import { IService } from "../models";
import axios from "axios";
import { useEnpoints } from './enpoints'
import { useNavigate } from "react-router-dom";

const DummyService: IService = {
    name: '',
    cpu: 0,
    ram: 0,
}

export function useService(id: number) {
    const [service, setService] = useState(DummyService);

    const [name, setName] = useState(service.name);
    const [cpu, setCpu] = useState(service.cpu);
    const [ram, setRam] = useState(service.ram);
    const [vm_id, setVMid] = useState(service.vm_id);

    const [cName, setCName] = useState(false);
    const [cCpu, setCCpu] = useState(false);
    const [cRam, setCRam] = useState(false);
    const [cVMid, setCVMid] = useState(false);

    const ep = useEnpoints();
    const nav = useNavigate();

    async function fetchItem() {
        const r = await axios.get<IService>(`${ep.services}${id}`);
        setService(r.data);
        setCpu(r.data.cpu);
        setRam(r.data.ram);
        setName(r.data.name);
        setVMid(r.data.vm_id);
    }

    useEffect(() => { fetchItem() }, []);
    useEffect(() => { setCName(service.name != name); setCCpu(service.cpu != cpu); setCRam(service.ram != ram); setCVMid(service.vm_id != vm_id); })

    function deleteItem() {
        const a = async () => {
            await axios.delete(`${ep.services}${id}`)
            nav('/service/');
        }
        a();
    }

    function updateItem() {
        const a = async () => {
            await axios.put(
                `${ep.services}${id}`,
                {
                    name: name,
                    cpu: cpu,
                    ram: ram,
                    vm_id: vm_id,
                }
            )
            nav(0);
        };
        a();
    }

    return {
        service,
        setName,
        setCpu,
        setRam,
        setVMid,
        name,
        cpu,
        ram,
        vm_id,
        cName,
        cCpu,
        cRam,
        cVMid,
        deleteItem,
        updateItem,
    };
}

export function useServicesList() {

    const [services, setServices] = useState<IService[]>([]);
    const ep = useEnpoints();

    async function fetchItems() {
        const response = await axios.get(`${ep.services}`);
        setServices(response.data);
    }

    useEffect(() => { fetchItems() }, []);

    return { services };
}

export function useServiceCreate() {


    const [name, setName] = useState('');
    const [cpu, setCpu] = useState(0.0);
    const [ram, setRam] = useState(0.0);
    const ep = useEnpoints();
    const nav = useNavigate();

    async function createItem() {
        await axios.post(
            `${ep.services}`,
            {
                name: name,
                cpu: cpu,
                ram: ram,
            }
        );
        nav(0);
    }
    const create = () => {
        createItem();
    }

    return {
        setName,
        setRam,
        setCpu,
        name,
        cpu,
        ram,
        create,
    };
}