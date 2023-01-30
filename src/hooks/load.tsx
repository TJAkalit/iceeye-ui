import React, {
    useState, useEffect
} from 'react';
import axios from 'axios';
import { useEnpoints } from './enpoints';
import { ILoad } from '../models';


export function useLoad(id: number | undefined){
    const [ram, setRam] = useState(0);
    const [cpu, setCpu] = useState(0);

    const ep = useEnpoints();

    function fetchLoad(){
        const a = async()=>{
            const r = await axios.get<ILoad>(`${ep.virtMachine}${id}/load`);
            setCpu(r.data.cpu);
            setRam(r.data.ram);
        }
        a();
    }
    useEffect(fetchLoad, []);

    return {cpu, ram};
}