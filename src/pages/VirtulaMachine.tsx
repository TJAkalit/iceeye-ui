import React, {
    useState, useEffect,
} from "react";
import {
    useNavigate,
    useParams,
} from 'react-router-dom';
import {
    Button,
    Table,
    Container,
    Form,
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
import { usePhysMachineList } from '../hooks/physMachineList';
import { useVirtMachineList } from '../hooks/virtMachineList';

export function VirtualMachine() {

    const { id } = useParams<'id'>();
    const [data, setData] = useState<IVirtualMachine>({ name: '', cpu: 0, ram: 0 });
    const [loaded, setLoaded] = useState(false);
    const endpoint = useEnpoints();

    async function fetchMachine() {
        const response = await axios.get<IVirtualMachine>(`${endpoint.virtMachine}${id}`);
        setData(response.data);
        setLoaded(true);
    }
    useEffect(() => { fetchMachine() }, [])

    function DataView(prop: { item: IVirtualMachine }) {
        const [name, setName] = useState(prop.item.name)
        const [cpu, setCpu] = useState(prop.item.cpu)
        const [ram, setRam] = useState(prop.item.ram)
        const [physId, setPhysId] = useState(prop.item.pm_id)

        const pmList = usePhysMachineList();

        return (
            <Form className='app-form-control'>
                <NumControl label='id' value={prop.item.id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { }} />
                <TextControl label='name' value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }} />
                <NumControl label='cpu' value={cpu} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCpu(Number(e.target.value)) }} />
                <NumControl label='ram' value={ram} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setRam(Number(e.target.value)) }} />
                <Form.Select value={physId} className='app-num-control-select' aria-label="Default select example" onChange={()=>{}}>
                    <option>Open this select menu</option>
                    {
                        pmList.items.map(
                            item => <option value={item.id} key={item.id}>{item.name}</option>
                        )
                    }
                </Form.Select>
            </Form>
        )
    }

    return (
        <div className='app-page'>
            <ToolKit>
                <Button>Сохранить</Button>
                <Button variant='danger'>Удалить</Button>
                <ReloadButton name='Сбросить' />
            </ToolKit>
            <AppPageContent name='Виртуальная машина'>
                {loaded && <DataView item={data} />}
            </AppPageContent>
        </div>
    )
}

function AddVirtualMachine(props: { close: () => void, addMachine: (item: IVirtualMachine) => void }) {

    const [cpu, setCpu] = useState(0);
    const [ram, setRam] = useState(0);
    const [name, setName] = useState('');
    const nav = useNavigate();
    const endpoint = useEnpoints();

    async function createMachine() {
        const data: IVirtualMachine = {
            name: name,
            cpu: cpu,
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
                <Button onClick={() => createMachine()}>Create</Button>
            </Form>
        </Container>
    )
}


function VirtualMachineTable() {

    const nav = useNavigate();
    const machines = useVirtMachineList();

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>id</th><th>name</th><th>cpu</th><th>ram</th>
                </tr>
            </thead>
            <tbody>
                {
                    machines.items.map(
                        (item) => <tr
                            key={item.id}
                            onClick={() => nav(`/virtual-machine/${item.id}`)}
                        >
                            <td>{item.id}</td><td>{item.name}</td><td>{item.cpu}</td><td>{item.ram}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    )
}

export function VirtualMachineList() {

    const machines = useVirtMachineList();

    return (
        <div className='app-page'>
            <ToolKit><Button onClick={machines.open}>Создать</Button></ToolKit>
            <div className='app-page-content'>
                <VirtualMachineTable />
                {machines.modal && <AddVirtualMachine addMachine={machines.addItems} close={machines.close} />}
            </div>
        </div>
    )
}
