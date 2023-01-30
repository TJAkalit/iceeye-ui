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
                <Button disabled={!i.cName && !i.cCpu && !i.cRam && !i.cCpuMultiply} onClick={i.postMachine}>Сохранить</Button>
                <Button variant='danger' onClick={i.deleteMachine}>Удалить</Button>
                <ReloadButton name='Сбросить' />
            </ToolKit>
            <AppPageContent name='Физическая машина'>
                <Form className='app-form-control'>
                    <NumControl label='id' value={Number(id)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { }} />
                    <TextControl label='name' value={i.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setName(e.target.value) }} changed={i.cName}/>
                    <NumControl label='cpu' value={i.cpu} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setCpu(Number(e.target.value)) }} changed={i.cCpu}/>
                    <NumControl label='ram' value={i.ram} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { i.setRam(Number(e.target.value)) }} changed={i.cRam}/>
                    <Form.Select 
                    value={i.cpu_multiply} 
                    className={'app-num-control-select' + (i.cCpuMultiply ? ' app-control-changed' : '')}
                    aria-label="Default select example"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { i.setCpuMultiply(Number(e.target.value)) }}
                    >
                        <option>None</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                    </Form.Select>
                </Form>
            </AppPageContent>
        </div>
    )
}
