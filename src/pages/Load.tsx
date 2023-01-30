import React from "react";
import { AppPageContent, ToolKit } from "../components/template";
import {
    Card,
    ProgressBar,
} from 'react-bootstrap'
import {
    useVirtMachineList
} from '../hooks/virtMachineList'
import {
    IVirtualMachine,
    ILoad,
    IPhysicalLoad,
} from '../models'
import {
    usePhysicalLoad
} from '../hooks/physMachineList';

function OneLoad(props: {item: IPhysicalLoad}){
    return (
        <Card body>
            <Card.Title>{props.item.id}: {props.item.name}</Card.Title>
            <div>ЦПУ: {props.item.cpu} ядер</div>
            <div>ОЗУ: {props.item.ram} ГБ</div>
            <ProgressBar now={props.item.cpu_sum / (props.item.cpu * props.item.cpu_multiply) * 100} label={`${props.item.cpu_sum} / ${props.item.cpu * props.item.cpu_multiply}`} />
            <ProgressBar variant="success" now={props.item.ram_sum / props.item.ram * 100} label={`${props.item.ram_sum} / ${props.item.ram} ГБ`} />
            <ProgressBar variant="warning" now={props.item.virtual_machine_size / props.item.storage_sum * 100 } label={`${props.item.virtual_machine_size} / ${props.item.storage_sum} ГБ`} />
        </Card>
    )
}

export function PhysicalLoad(){

    const load = usePhysicalLoad();

    return (
        <div className="app-page">
            <ToolKit> </ToolKit>
            <AppPageContent name='Визуализация физической нагрузки'>
                {
                    load.data.map(
                        (item)=><OneLoad key={item.id} item={item}/>
                    )
                }
            </AppPageContent>
        </div>
    )
}