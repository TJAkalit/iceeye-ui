import React, {
    useState,
    useEffect,
} from "react";
import { IVirtualMachine } from "../models";
import { useEnpoints } from "./enpoints"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const emptyMachine: IVirtualMachine = {
    name: '',
    cpu: 0,
    ram: 0,
}

export function useVirtMachine(id: number | undefined) {

    const [machine, setMachine] = useState<IVirtualMachine>(emptyMachine);

    const [name, setName] = useState(machine.name);
    const [cpu, setCpu] = useState(machine.cpu);
    const [ram, setRam] = useState(machine.ram);
    const [pm_id, setPMid] = useState(machine.pm_id);

    const [cName, setCName] = useState(false);
    const [cCpu, setCCpu] = useState(false);
    const [cRam, setCRam] = useState(false);
    const [cPMid, setCPMid] = useState(false);

    const ep = useEnpoints();
    const nav = useNavigate();

    async function fetchMachine() {
        const r = await axios.get<IVirtualMachine>(`${ep.virtMachine}${id}`);
        setMachine(r.data);
        setName(r.data.name);
        setCpu(r.data.cpu);
        setRam(r.data.ram);
        setPMid(r.data.pm_id);
    };

    useEffect(() => { if (!(id==null))fetchMachine() }, []);
    useEffect(
        () => {
            setCName(machine.name != name); setCRam(machine.ram != ram); setCCpu(machine.cpu != cpu); setCPMid(machine.pm_id != pm_id);
        }
    )

    function deleteMachine() {
        const a = async () => {
            await axios.delete(`${ep.virtMachine}${id}`)
            nav('/virtual-machine');
        }
        a();
    }

    function updateMachine() {
        const a = async () => {
            await axios.put(
                `${ep.virtMachine}${id}`,
                {
                    name: name,
                    cpu: cpu,
                    ram: ram,
                    pm_id: pm_id,
                }
            );
            nav(0);
        };
        a();
    }

    return {
        machine,
        setName,
        setCpu,
        setRam,
        setPMid,
        cName,
        cCpu,
        cRam,
        cPMid,
        name,
        cpu,
        ram,
        pm_id,
        updateMachine,
        deleteMachine,
    }
}