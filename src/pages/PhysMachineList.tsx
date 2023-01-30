import React, {
  useContext,
  useState,
} from 'react';
import {
  Container,
  Table,
  Button,
  Form,
} from 'react-bootstrap';
import {
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import { IPhysicalMachine } from '../models';
import {
  ToolKit,
  TextControl,
  NumControlRange,
} from '../components/template';
import { useEnpoints } from "../hooks/enpoints";
import { usePhysMachineList } from '../hooks/physMachineList';
import { PMSizeState, PMSizeContext } from '../context/PhysicalMachine';

function AddPhysicalMachine(props: { close: () => void, addMachine: (item: IPhysicalMachine) => void }) {

  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);
  const [name, setName] = useState('');
  const [cpu_multiply, setCpu_multiply] = useState(0);
  const nav = useNavigate();
  const ep = useEnpoints();

  async function createMachine() {
    const data: IPhysicalMachine = { name: name, cpu: cpu, ram: ram, cpu_multiply: cpu_multiply };
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
          name='ЦПУ'
          value={cpu}
          min={0}
          max={32}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpu(Number(e.target.value))}
        />
        <NumControlRange
          name='ОЗУ'
          value={ram}
          min={0}
          max={64}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRam(Number(e.target.value))}
        />
        <Button onClick={() => createMachine()}>Create</Button>
      </Form>
    </Container>
  )
}

function PhysicalMachineRow(props: { obj: IPhysicalMachine }) {

  const nav = useNavigate();
  const size = useContext(PMSizeContext);

  function getSize(id: number | undefined) {
    for (let i = 0; i < size.items.length; i++) {
      if (size.items[i].id == id) {
        return `${size.items[i].size}`;
      };
    };
    return '0';
  };

  return (
    <tr key={props.obj.id} onClick={() => nav(`/physical-machine/${props.obj.id}`)}>
      <td>{props.obj.id}</td>
      <td>{props.obj.name}</td>
      <td>{props.obj.cpu}</td>
      <td>{props.obj.ram}</td>
      <td>{getSize(props.obj.id)}</td>
    </tr>
  )
}

export function PhysicalMachineList() {

  const machines = usePhysMachineList();
  const columns = [
    'ИД',
    'Название',
    'ЦПУ',
    'ОЗУ',
    'Объём дисков'
  ]

  return (
    <div className='app-page'>
      <ToolKit>
        <Button onClick={machines.open}>Создать</Button>
        <Form.Control
          size="sm"
          placeholder='Поиск по имени машины...'
          value={machines.searchName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {machines.searchByName(e.target.value)}}
        />
      </ToolKit>
      <div className='app-page-content'>
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map((item) => <th>{item}</th>)}
            </tr>
          </thead>
          <PMSizeState>
            <tbody>
              {machines.items.map((item) => <PhysicalMachineRow key={item.id} obj={item} />)}
            </tbody>
          </PMSizeState>
        </Table>
        {machines.modal && <AddPhysicalMachine addMachine={machines.addItems} close={machines.close} />}
      </div>
    </div>
  )
}