import React from "react";
import { TextControl, ToolKit, FloatControlRange, AppPageContent, NumControl, ReloadButton } from "../components/template";
import { useService, useServiceCreate, useServicesList } from "../hooks/services";
import {
    Button, Container, Table, Form,
} from 'react-bootstrap';
import { IService } from "../models";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../hooks/lib";
import { useVirtMachineList } from "../hooks/virtMachineList";
import { useVirtMachine } from "../hooks/virtMachine";

type inpEvent = React.ChangeEvent<HTMLInputElement>;

export function Service() {

    const vms = useVirtMachineList();
    const { id } = useParams<'id'>();
    const i = useService(Number(id));

    return (
        <div className="app-page">
            <ToolKit>
                <Button
                    disabled={!i.cCpu && !i.cName && !i.cRam && !i.cVMid}
                    onClick={i.updateItem}
                >Сохранить</Button>
                <Button variant='danger' onClick={i.deleteItem}>Удалить</Button>
                <ReloadButton name='Сбросить' />
            </ToolKit>
            <AppPageContent name='Сервис'>
                <Form className='app-form-control'>
                    <NumControl
                        label='id'
                        value={Number(id)}
                        onChange={(e: inpEvent) => { }}
                    />
                    <TextControl
                        label='Название сервиса'
                        value={i.name}
                        onChange={(e: inpEvent) => { i.setName(e.target.value) }}
                        changed={i.cName}
                    />
                    <NumControl
                        label='ЦПУ'
                        value={i.cpu}
                        onChange={(e: inpEvent) => { i.setCpu(Number(e.target.value)) }}
                        changed={i.cCpu}
                    />
                    <NumControl
                        label='ОЗУ'
                        value={i.ram}
                        onChange={(e: inpEvent) => { i.setRam(Number(e.target.value)) }}
                        changed={i.cRam} />
                    <Form.Select
                        value={i.vm_id}
                        aria-label="Default select example"
                        className={'app-num-control-select' + (i.cVMid ? ' app-control-changed' : '')}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { i.setVMid(Number(e.target.value)) }}
                    >
                        <option>Open this select menu</option>
                        {
                            vms.items.map(
                                item => <option key={item.id} value={item.id}>{item.name}</option>
                            )
                        }
                    </Form.Select>
                </Form>
            </AppPageContent>
        </div>
    )
}

function AddService() {

    const add = useServiceCreate();

    return (
        <Container>
            <Form>
                <TextControl
                    label='Имя'
                    value={add.name}
                    onChange={(e: inpEvent) => { add.setName(e.target.value) }}
                />
                <FloatControlRange
                    name='ЦПУ' value={add.cpu} min={0} max={12}
                    onChange={(e: inpEvent) => { add.setCpu(Number(e.target.value)) }}
                />
                <FloatControlRange
                    name='ОЗУ' value={add.ram} min={0} max={12}
                    onChange={(e: inpEvent) => { add.setRam(Number(e.target.value)) }}
                />
                <Button onClick={add.create}>Создать</Button>
            </Form>
        </Container>
    )
}


function ServiceRow(item: { obj: IService }) {

    const nav = useNavigate();
    const vm = useVirtMachine(item.obj.vm_id);

    return (
        <tr key={item.obj.id} onClick={() => nav(`/service/${item.obj.id}`)}>
            <td>{item.obj.id}</td>
            <td>{item.obj.name}</td>
            <td>{item.obj.cpu}</td>
            <td>{item.obj.ram}</td>
            <td>{vm.name}</td>
        </tr>
    )
}


export function ServicesList() {

    const items = useServicesList();
    const columns = ['id', 'name', 'cpu', 'ram', 'vm_name'];
    const modal = useModal();

    return (
        <div className="app-page">
            <ToolKit>
                <Button onClick={modal.open}>Создать</Button>
            </ToolKit>
            <div className="app-page-content">
                <Table striped bordered hover>
                    <thead>
                        <tr>{columns.map((item) => <th key={item}>{item}</th>)}</tr>
                    </thead>
                    <tbody>
                        {items.services.map((item) => <ServiceRow obj={item} />)}
                    </tbody>
                </Table>
                {modal.status && <AddService />}
            </div>
        </div>
    )
};