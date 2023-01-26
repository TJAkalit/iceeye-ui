import React, {
  useState,
  useEffect,
} from 'react';
import {
  Container,
  Table,
  Button,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import {
  useParams,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import { IPhysicalMachine } from '../models';
import {
  ToolKit,
  AppPageContent,
  TextControl,
  NumControl,
  ReloadButton,
  NumControlRange,
} from '../components/template';
import { useEnpoints } from "../hooks/enpoints";
import { usePhysMachine } from '../hooks/PhysMachine';
import { usePhysMachineList } from '../hooks/physMachineList';

function AddPhysicalMachine(props: { close: () => void, addMachine: (item: IPhysicalMachine) => void }) {

  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);
  const [name, setName] = useState('');
  const nav = useNavigate();
  const ep = useEnpoints();

  async function createMachine() {
    const data: IPhysicalMachine = {name: name, cpu: cpu, ram: ram}
    const response = axios.post<IPhysicalMachine>(
      `${ep.physMachine}`, data
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

function PhysicalMachineRow(props: { obj: IPhysicalMachine }) {
  const nav = useNavigate();
  return (
    <tr key={props.obj.id} onClick={() => nav(`/physical-machine/${props.obj.id}`)}>
      <td>{props.obj.id}</td><td>{props.obj.name}</td><td>{props.obj.cpu}</td><td>{props.obj.ram}</td>
    </tr>
  )
}

function PhysicalMachineTable(props: { items: IPhysicalMachine[] }) {

  return (
    <Table striped bordered hover>
      <thead>
        <tr><th>id</th><th>name</th><th>cpu</th><th>ram</th></tr>
      </thead>
      <tbody>
        {props.items.map((item) => <PhysicalMachineRow key={item.id} obj={item} />)}
      </tbody>
    </Table>
  )
}

export function PhysicalMachineList() {

  const machines = usePhysMachineList();

  return (
    <div className='app-page'>
      <ToolKit><Button onClick={machines.open}>Создать</Button></ToolKit>
      <div className='app-page-content'>
        <PhysicalMachineTable items={machines.items} />
        {machines.modal && <AddPhysicalMachine addMachine={machines.addItems} close={machines.close} />}
      </div>
    </div>
  )
}