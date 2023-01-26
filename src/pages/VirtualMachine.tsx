import React, {
    useState,
    useEffect,
} from "react";
import {
    useParams,
} from "react-router-dom";
import { useVirtMachine } from "../hooks/virtMachine";
import {
    Button,
    Form,
} from 'react-bootstrap';
import {
    ToolKit,
    ReloadButton,
    AppPageContent,
    NumControl,
    TextControl,
} from '../components/template'
import { usePhysMachineList } from "../hooks/physMachineList";

export function VirtualMachine() {

    const { id } = useParams<'id'>();
    const i = useVirtMachine(Number(id));
    const pm = usePhysMachineList();

    return (
        <div className='app-page'>
            <ToolKit>
                <Button>Сохранить</Button>
                <Button variant='danger'>Удалить</Button>
                <ReloadButton name='Сбросить' />
            </ToolKit>
            <AppPageContent name='Виртуальная машина'>
                <Form className='app-form-control'>
                    <NumControl label='id' value={Number(id)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { }} />
                    <TextControl label='name' value={i.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setName(e.target.value) }} />
                    <NumControl label='cpu' value={i.cpu} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setCpu(Number(e.target.value)) }} />
                    <NumControl label='ram' value={i.ram} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setRam(Number(e.target.value)) }} />
                    <Form.Select value={i.pm_id} className='app-num-control-select' aria-label="Default select example" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {i.setPMid(Number(e.target.value))}}>
                        <option>Open this select menu</option>
                        {
                            pm.items.map(
                                item => <option value={item.id} key={item.id}>{item.name}</option>
                            )
                        }
                    </Form.Select>
                </Form>
            </AppPageContent>
        </div>
    )
}