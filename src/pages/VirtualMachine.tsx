import React, {
    useState,
    useEffect,
} from "react";
import {
    useNavigate,
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
    const nav = useNavigate();

    return (
        <div className='app-page'>
            <ToolKit>
                <Button variant="light" onClick={()=>nav(-1)}>{'<<'} Назад</Button>
                <ReloadButton name='Сбросить' />
                <Button variant='danger' onClick={i.deleteMachine}>Удалить</Button>
                <Button
                    disabled={!i.cCpu && !i.cName && !i.cRam && !i.cPMid && !i.cSize}
                    onClick={i.updateMachine}
                >Сохранить</Button>
            </ToolKit>
            <AppPageContent name='Виртуальная машина'>
                <Form className='app-form-control'>
                    <NumControl
                        label='id'
                        value={Number(id)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { }} />
                    <TextControl
                        label='name'
                        value={i.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setName(e.target.value) }}
                        changed={i.cName}
                    />
                    <NumControl
                        label='cpu'
                        value={i.cpu}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setCpu(Number(e.target.value)) }}
                        changed={i.cCpu}
                    />
                    <NumControl
                        label='ram'
                        value={i.ram}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setRam(Number(e.target.value)) }}
                        changed={i.cRam}
                    />
                    <NumControl
                        label='size'
                        value={i.size}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setSize(Number(e.target.value)) }}
                        changed={i.cSize}
                    />
                    <Form.Select
                        value={i.pm_id}
                        className={'app-num-control-select' + (i.cPMid ? ' app-control-changed' : '')}
                        aria-label="Default select example"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { i.setPMid(Number(e.target.value)) }}
                    >
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