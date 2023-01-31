import React, {
    useState, useEffect, useContext,
} from "react";
import {
    useNavigate,
    useParams,
    Link,
    useLocation,
    redirect,
    Navigate
} from 'react-router-dom';
import {
    Button,
    Table,
    Container,
    Form,
    Pagination,
} from "react-bootstrap";
import {
    ToolKit,
    BottomBar,
    TextControl,
    NumControl,
    NumControlRange,
} from "../components/template";
import { IVirtualMachine } from "../models";
import axios from "axios";
import { useEnpoints } from "../hooks/enpoints";
import { useVirtMachineList } from '../hooks/virtMachineList';
import { Paginator } from '../lib/arrays';
import { usePage } from '../hooks/query';

import { PMListState, PMListContext } from "../context/PhysicalMachine";


function AddVirtualMachine(props: { close: () => void, addMachine: (item: IVirtualMachine) => void }) {

    const [cpu, setCpu] = useState(0);
    const [ram, setRam] = useState(0);
    const [name, setName] = useState('');
    const [size, setSize] = useState(0);
    const nav = useNavigate();
    const endpoint = useEnpoints();

    async function createMachine() {
        const data: IVirtualMachine = {
            name: name,
            cpu: cpu,
            size: size,
            ram: ram
        }
        const response = axios.post<IVirtualMachine>(
            `${endpoint.virtMachine}`, data
        );
        props.close();
        nav(0);
    };

    return (
        <Container>
            <Form>
                <TextControl
                    label='Имя'
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }}
                />
                <NumControlRange
                    name='ЦПУ' value={cpu} min={0} max={32}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpu(Number(e.target.value))}
                />
                <NumControlRange
                    name='ОЗУ' value={ram} min={0} max={64}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRam(Number(e.target.value))}
                />
                <NumControl
                    label="Размер"
                    value={size}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSize(Number(e.target.value)) }}
                />
                <Button onClick={() => createMachine()}>Create</Button>
            </Form>
        </Container>
    )
}

function VirtualMachineRow(props: { item: IVirtualMachine }) {
    const nav = useNavigate();

    const pms = useContext(PMListContext);

    function getName(id: number | undefined) {
        for (let i = 0; i < pms.items.length; i++) {
            if (pms.items[i].id == id) {
                return pms.items[i].name;
            }
        };
        return '';
    };

    return (
        <tr key={props.item.id}>
            <td>{props.item.id}</td>
            <td>{props.item.name}</td>
            <td>{props.item.cpu}</td>
            <td>{props.item.ram}</td>
            <td>{props.item.size}</td>
            <td>{getName(props.item.pm_id)}</td>
            <td><Link to={`/virtual-machine/${props.item.id}`} >Подробнее</Link></td>
        </tr>

    )
}

export function VirtualMachineList() {

    const machines = useVirtMachineList();
    const columns = [
        'id',
        'Имя',
        'ЦПУ',
        'ОЗУ, ГБ',
        'Размер, ГБ',
        'Хост',
        '',
    ];
    const nav = useNavigate();

    let page = usePage();
    let [iPP, setIPP] = useState(20);
    let p = new Paginator<IVirtualMachine>(machines.items, iPP);

    return (
        <div className='app-page'>
            <ToolKit>
                <Button variant='primary' onClick={() => {machines.reload(); machines.setSearchName(''); machines.setSearchHostName('')}}>Перезагрузить</Button>
                <Button variant='success' onClick={machines.open}>Создать</Button>
                <Form.Control
                    size="sm"
                    placeholder='Поиск: виртуальная машина...'
                    value={machines.searchName}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            machines.setSearchName(e.target.value);
                            machines.fetchBySearch(e.target.value, machines.searchHostName);
                        }
                    }
                />
                <Form.Control
                    size="sm"
                    placeholder='Поиск: физическая машина...'
                    value={machines.searchHostName}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            machines.setSearchHostName(e.target.value);
                            machines.fetchBySearch(machines.searchName, e.target.value);
                        }
                    }
                />
            </ToolKit>
            <div className='app-page-content'>
                <Table striped bordered hover>
                    <thead>
                        <tr>{columns.map(item => <th key={item}>{item}</th>)}</tr>
                    </thead>
                    <PMListState>
                        <tbody>
                            {
                                p.getPage(page).map(
                                    (item) => <VirtualMachineRow key={item.id} item={item} />
                                )
                            }
                        </tbody>
                    </PMListState>
                </Table>
                {machines.modal && <AddVirtualMachine addMachine={machines.addItems} close={machines.close} />}
                <BottomBar>
                    <div></div>
                    <Pagination>
                        {page !== 2 && page !== 1 && <Pagination.Item onClick={() => { nav(`/virtual-machine/?page=1`) }}>{'«'}</Pagination.Item>}
                        {p.hasPrev(page) && <Pagination.Item onClick={() => { nav(`/virtual-machine/?page=${page - 1}`) }}>{page - 1}</Pagination.Item>}
                        <Pagination.Item active>{page}</Pagination.Item>
                        {p.hasNext(page) && <Pagination.Item onClick={() => { nav(`/virtual-machine/?page=${page + 1}`) }}>{page + 1}</Pagination.Item>}
                        {page !== p.pages() && page !== (p.pages() - 1) && <Pagination.Item onClick={() => { nav(`/virtual-machine/?page=${p.pages()}`) }}>{'»'}</Pagination.Item>}
                    </Pagination>
                    <Form.Select
                        size="sm"
                        value={iPP}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setIPP(Number(e.target.value)) }}
                        aria-label="Default select example">
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                    </Form.Select>
                </BottomBar>
            </div>
        </div>
    )
}
