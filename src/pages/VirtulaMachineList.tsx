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
import { useVirtMachineList } from '../hooks/virtMachineList';

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
