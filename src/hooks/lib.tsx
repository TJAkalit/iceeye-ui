import React,{
    useState
} from "react";

export function useModal(){
    const [status, setStatus] = useState(false);

    const open = ()=> setStatus(true);
    const close = ()=> setStatus(false);

    return {status, open, close};
}