import React, {
    useState
} from "react";

export function useEnpoints() {
    const [physMachine, setPhysMachine] = useState('http://127.0.0.1:8000/api/dictionary/phys-machine/');
    const [virtMachine, setVirtMachine] = useState('http://127.0.0.1:8000/api/dictionary/virt-machine/');

    return { physMachine, virtMachine};
}