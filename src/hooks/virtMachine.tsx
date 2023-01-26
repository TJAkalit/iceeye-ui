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

export function useVirtMachine(id: number) {

  const [machine, setMachine] = useState<IVirtualMachine>(emptyMachine);
  const ep = useEnpoints();
  const nav = useNavigate();

  const [name, setName] = useState(machine.name);
  const [cpu, setCpu] = useState(machine.cpu);
  const [ram, setRam] = useState(machine.ram);
  const [pm_id, setPMid] = useState(machine.pm_id);

  const [cName, setCName] = useState(false);
  const [cCpu, setCCpu] = useState(false);
  const [cRam, setCRam] = useState(false);
  const [cPMid, setCPMid] = useState(false);


  async function fetchMachine() {
    const response = await axios.get<IVirtualMachine>(`${ep.virtMachine}${id}`);
    setMachine(response.data);
    setName(response.data.name);
    setCpu(response.data.cpu);
    setRam(response.data.ram);
  };

  useEffect(
    () => { fetchMachine() }, []
  );

  useEffect(
    () => {
      setCName(machine.name != name);
      setCRam(machine.ram != ram);
      setCCpu(machine.cpu != cpu);
    }
  )
  
  function postMachine() {
    const a = async ()=> {
      const response = await axios.put(
        `${ep.virtMachine}${id}`,
        {
          name: name,
          cpu: cpu,
          ram: ram
        }
      );
      nav(0);
    };
    a();
  }

  function deleteMachine() {
    const a = async ()=> {
      const response = await axios.delete(`${ep.virtMachine}${id}`)
      nav('/virtual-machine');
    }
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
    name,
    cpu,
    ram,
    pm_id,
    postMachine,
    deleteMachine,
  }
}