import React, {
    useState
} from "react";

export function useEnpoints() {

    function getDictUrl(){
        if (typeof process.env.REACT_APP_IE_DICT_URI ==='string')
            return process.env.REACT_APP_IE_DICT_URI
        return '/';
    }

    const [physMachine, setPhysMachine] = useState(`${getDictUrl()}api/dictionary/phys-machine/`);
    const [virtMachine, setVirtMachine] = useState(`${getDictUrl()}api/dictionary/virt-machine/`);
    const [services, setServices] = useState(`${getDictUrl()}api/dictionary/service/`);
    const [storage, setStorage] = useState(`${getDictUrl()}api/dictionary/storage/`)

    return { 
        physMachine, 
        virtMachine, 
        services,
        storage,
    };
}