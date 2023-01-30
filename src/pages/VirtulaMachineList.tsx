import React, {
    useState, useEffect, useContext,
} from "react";
import {
    useNavigate,
    useParams,
    Link,
    useLocation,
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
    TextControl,
    NumControl,
    NumControlRange,
    ReloadButton,
    AppPageContent,
} from "../components/template";
import { IVirtualMachine } from "../models";
import axios from "axios";
import { useEnpoints } from "../hooks/enpoints";
import { useVirtMachineList } from '../hooks/virtMachineList';
import { useVirtMachine } from "../hooks/virtMachine";
import { usePhysMachine } from "../hooks/PhysMachine";

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

class Pagginator<T>{

    private items: T[]
    private count: number;

    constructor(items: T[], count: number) {
        this.items = items;
        this.count = count;
    };

    pages(): number {
        return (this.items.length - this.items.length % this.count)/this.count + 1;
    };

    getPage(page: number): T[] {
        let pageItems: T[] = [];
        let startItem: number = (page - 1) * this.count;
        let endItem: number = startItem + this.count;

        if (startItem > this.items.length)
            return [];

        if (endItem > this.items.length)
            endItem = this.items.length;

        for (let i = startItem; i < endItem; i++){
            pageItems.push(this.items[i]);
        };
        return pageItems;
    };
    hasNext(page: number): boolean {
        let startItem: number = (page) * this.count;
        return startItem <= this.items.length;
    };
    hasPrev(page: number): boolean {
        let startItem: number = (page - 2) * this.count;
        let endItem: number = startItem + this.count;

        return startItem >= 0;
    };
};


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

    const { search } = useLocation();

    
    function usePage(){
        let page: string | number | null = React.useMemo(() => new URLSearchParams(search), [search]).get('page');
        if (typeof page==='string' && !Number.isNaN(Number(page)))
        page = Number(page)
        else 
        page = 1
        return page;
    };
    
    let page = usePage();

    let p = new Pagginator<IVirtualMachine>(machines.items, 20);

    return (
        <div className='app-page'>
            <ToolKit>
                <Button onClick={machines.open}>Создать</Button>
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
                <Pagination>
                    { page!==2 && page!==1 && <Pagination.Item onClick={()=>{nav(`/virtual-machine/?page=1`)}}>{'<<'}</Pagination.Item>}
                    { p.hasPrev(page) && <Pagination.Item onClick={()=>{nav(`/virtual-machine/?page=${page - 1}`)}}>{page - 1}</Pagination.Item>}
                    <Pagination.Item active>{page}</Pagination.Item>
                    { p.hasNext(page) && <Pagination.Item onClick={()=>{nav(`/virtual-machine/?page=${page + 1}`)}}>{page + 1}</Pagination.Item>}
                    { page!==p.pages() && page!==(p.pages()-1) && <Pagination.Item onClick={()=>{nav(`/virtual-machine/?page=${p.pages()}`)}}>{'>>'}</Pagination.Item>}
                </Pagination>
            </div>
        </div>
    )
}
