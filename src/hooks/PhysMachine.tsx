import React, {
  useState,
  useEffect,
} from "react";
import { IPhysicalMachine } from "../models";
import { useEnpoints } from "./enpoints"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const emptyMachine: IPhysicalMachine = {
  name: '',
  cpu: 0,
  ram: 0,
  cpu_multiply: 0,
}

export function usePhysMachine(id: number | undefined) {

  const [machine, setMachine] = useState<IPhysicalMachine>(emptyMachine);
  const ep = useEnpoints();
  const nav = useNavigate();

  const [name, setName] = useState(machine.name);
  const [cpu, setCpu] = useState(machine.cpu);
  const [ram, setRam] = useState(machine.ram);
  const [cpu_multiply, setCpuMultiply] = useState(machine.cpu_multiply);

  const [cName, setCName] = useState(false);
  const [cCpu, setCCpu] = useState(false);
  const [cRam, setCRam] = useState(false);
  const [cCpuMultiply, setCCpuMultiply] = useState(false);

  async function fetchMachine() {
    const response = await axios.get<IPhysicalMachine>(`${ep.physMachine}${id}`);
    setMachine(response.data);
    setName(response.data.name);
    setCpu(response.data.cpu);
    setRam(response.data.ram);
    setCpuMultiply(response.data.cpu_multiply);
  };

  useEffect(
    () => {
      if (id!=null)
        fetchMachine()
    }, []
  );

  useEffect(
    () => {
      setCName(machine.name != name);
      setCRam(machine.ram != ram);
      setCCpu(machine.cpu != cpu);
      setCCpuMultiply(machine.cpu_multiply != cpu_multiply);
    }
  )
  
  function postMachine() {
    const a = async ()=> {
      console.log(cpu_multiply);
      const response = await axios.put(
        `${ep.physMachine}${id}`,
        {
          name: name,
          cpu: cpu,
          ram: ram,
          cpu_multiply: cpu_multiply,
        }
      );
      nav(0);
    };
    a();
  }

  function deleteMachine() {
    const a = async ()=> {
      const response = await axios.delete(`${ep.physMachine}${id}`)
      nav('/physical-machine');
    }
    a();
  }

  return {
    machine,
    setName,
    setCpu,
    setRam,
    setCpuMultiply,
    cName,
    cCpu,
    cRam,
    cCpuMultiply,
    name,
    cpu,
    ram,
    cpu_multiply,
    postMachine,
    deleteMachine,
  }
}