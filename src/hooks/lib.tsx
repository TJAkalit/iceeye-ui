import React,{
    useState
} from "react";

export function useModal(){
    const [status, setStatus] = useState(false);

    const open = ()=> {setStatus(true); console.log('opened')};
    const close = ()=> {setStatus(false); console.log('closed')};

    return {status, open, close};
}