import React, { useContext } from 'react';
import {
    useParams,
} from 'react-router-dom';
import {
    ToolKit,
    TextControl,
    NumControl,
    ReloadButton,
    AppPageContent,
} from '../components/template';
import {
    useCreateStorage,
    useStorageList,
    useStorage,
} from '../hooks/Storage';
import {
    useNavigate
} from 'react-router-dom';
import {
    Button,
    Table,
    Form,
    Container,
} from 'react-bootstrap';
import {
    IStorage
} from '../models';
import { useModal } from '../hooks/lib';
import { usePhysMachineList } from '../hooks/physMachineList';

import { PMListState, PMListContext } from '../context/PhysicalMachine';


type inpEvent = React.ChangeEvent<HTMLInputElement>;

type MapType = {
    [id: number]: string;
};

const StorageType: MapType = {};
StorageType[1] = 'SSD';
StorageType[2] = 'HDD';
StorageType[3] = 'NVMe';

export function Storage(){

    const { id } = useParams<'id'>();
    const s = useStorage(Number(id));
    const m = usePhysMachineList();

    return (
        <div className='app-page'>
            <ToolKit>
                <Button 
                disabled={!s.cPMid && !s.cName && !s.cSize && !s.cType}
                onClick={s.updateItem}
                >Сохранить</Button>
                <Button variant='danger' onClick={s.deleteItem}>Удалить</Button>
                <ReloadButton name='Сбросить' />
            </ToolKit>
            <AppPageContent name='Хранилище'>
                <Form className='app-form-control'>
                    <NumControl
                        label='id'
                        value={Number(id)}
                        onChange={(e: inpEvent)=>{}}
                    />
                    <TextControl
                        label='Название'
                        value={s.name}
                        onChange={(e: inpEvent)=>{ s.setName(e.target.value) }}
                        changed={s.cName}
                    />
                    <Form.Select 
                        value={s.type}
                        aria-label="Default select example"
                        className={'app-num-control-select' + (s.cType ? ' app-control-changed' : '')}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { s.setType(Number(e.target.value)) }}
                    >
                        <option>Выберите тип диска...</option>
                        <option value='1' key={1}>SSD</option>
                        <option value='2' key={2}>HDD</option>
                        <option value='3' key={3}>NVMe</option>
                    </Form.Select>
                    <NumControl
                        label='Объём'
                        value={Number(s.size)}
                        onChange={(e: inpEvent)=>{ s.setSize(Number(e.target.value))}}
                        changed={s.cSize}
                    />
                    <Form.Select
                        value={s.pm_id}
                        aria-label="Default select example"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { s.setPMid(Number(e.target.value)) }}
                    >
                        <option>Выберите физический хост...</option>
                        {
                            m.items.map(item => <option value={item.id} key={item.id}>{item.name}</option>)
                        }
                    </Form.Select>
                </Form>
            </AppPageContent>
        </div>
    )
}

function StorageModal(props: {close: ()=>void}) {
    const modal = useModal();
    const n = useCreateStorage();
    const m = usePhysMachineList();

    return (
        <>
            <div className='app-black' onClick={props.close}></div>
            <Container className='app-modal'>
                <Form>
                    <TextControl
                        label='Имя'
                        value={n.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { n.setName(e.target.value) }}
                    />
                    <Form.Select
                        value={n.type}
                        aria-label="Default select example"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { n.setType(Number(e.target.value)) }}
                    >
                        <option>Выберите тип диска...</option>
                        <option value='1' key={1}>SSD</option>
                        <option value='2' key={2}>HDD</option>
                        <option value='3' key={3}>NVMe</option>
                    </Form.Select>
                    <NumControl
                        label='Размер'
                        value={n.size}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { n.setSize(Number(e.target.value)) }}
                    />
                    <Form.Select
                        value={n.machine}
                        aria-label="Default select example"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { n.setMachine(Number(e.target.value)) }}
                    >
                        <option>Выберите физический хост...</option>
                        {
                            m.items.map(item => <option value={item.id} key={item.id}>{item.name}</option>)
                        }
                    </Form.Select>
                    <Button onClick={n.createItem}>Сохранить</Button>
                    <Button variant="danger" onClick={props.close}>Закрыть</Button>
                </Form>
            </Container>
        </>
    )
}

function StorageRow(props: { item: IStorage }) {

    const nav = useNavigate();
    const pmList = useContext(PMListContext);

    function getMachineName(id: number){
        for (let i = 0; i < pmList.items.length; i++){
            if (pmList.items[i].id==id){
                return pmList.items[i].name;
            }
        }
        return '---';
    };

    return (
        <tr key={props.item.id} onClick={()=>{nav(`/storage/${props.item.id}`)}}>
            <td>{props.item.id}</td>
            <td>{props.item.name}</td>
            <td>{StorageType[props.item.type]}</td>
            <td>{props.item.size}</td>
            <td>{ getMachineName(props.item.pm_id) }</td>
        </tr>
    );
};

export function StorageList() {
    const items = useStorageList();
    const colums = ['ИД', 'Название', 'Тип', 'Объём', 'Физическая машина'];
    const modal = useModal();

    return (
        <div className='app-page'>
            <ToolKit>
                <Button onClick={modal.open}>Создать</Button>
                <Form.Control
                    size="sm"
                    placeholder='Поиск по имени машины...'
                    value={items.searchName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { items.fetchItemsSearch(e.target.value) }}
                />
            </ToolKit>
            <div className='app-page-content'>
                <Table striped bordered hover>
                    <thead>
                        <tr>{colums.map((item) => <th key={item}>{item}</th>)}</tr>
                    </thead>
                    <PMListState>
                        <tbody>
                            {items.items.map(item => <StorageRow key={item.id} item={item} />)}
                        </tbody>
                    </PMListState>
                </Table>
            </div>
            {modal.status && <StorageModal close={modal.close} />}
        </div>
    )
}