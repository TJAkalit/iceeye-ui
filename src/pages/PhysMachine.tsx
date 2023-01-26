import React from "react";
import {
    useParams
} from 'react-router-dom';
import {
    usePhysMachine
} from '../hooks/PhysMachine';
import {
    NumControl,
    TextControl,
    ToolKit,
    AppPageContent,
    ReloadButton,
} from '../components/template';
import {
    Form,
    Button,
} from 'react-bootstrap';

export function PhysicalMachine() {

    const { id } = useParams<'id'>();
    const i = usePhysMachine(Number(id));

    return (
        <div className='app-page'>
            <ToolKit>
                <Button disabled={!i.cName && !i.cCpu && !i.cRam} onClick={i.postMachine}>Сохранить</Button>
                <Button variant='danger' onClick={i.deleteMachine}>Удалить</Button>
                <ReloadButton name='Сбросить' />
            </ToolKit>
            <AppPageContent name='Физическая машина'>
                <Form className='app-form-control'>
                    <NumControl label='id' value={Number(id)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { }} />
                    <TextControl label='name' value={i.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setName(e.target.value) }} changed={i.cName}/>
                    <NumControl label='cpu' value={i.cpu} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setCpu(Number(e.target.value)) }} changed={i.cCpu}/>
                    <NumControl label='ram' value={i.ram} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setRam(Number(e.target.value)) }} changed={i.cRam}/>
                </Form>
            </AppPageContent>
        </div>
    )
}
