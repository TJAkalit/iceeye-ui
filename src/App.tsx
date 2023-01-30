import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';
import { PhysicalMachineList } from './pages/PhysMachineList';
import { PhysicalMachine } from './pages/PhysMachine';
import { VirtualMachineList } from './pages/VirtulaMachineList';
import { VirtualMachine } from './pages/VirtualMachine';
import { ServicesList, Service } from './pages/ServicesList';
import { StorageList, Storage } from './pages/Storage';

import { ButtonGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { ToolKit, AppPageContent } from './components/template';
import { PhysicalLoad } from './pages/Load';
import { Accordion } from 'react-bootstrap';

function LoginPage() {

  return (
    <Container>test</Container>
  )
}

function SideBar() {

  function SideButton(prop: { name: string, to: string }) {
    const nav = useNavigate();
    const variant = 'light'
    return (
      <Button className='app-sidebar-btn'
        onClick={() => nav(prop.to)}
        variant={variant}
      >{prop.name}</Button>
    )
  }

  return (
    <>
      <Accordion 
      defaultActiveKey="0" 
      flush
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Структура</Accordion.Header>
          <Accordion.Body className='app-sidebar-accordion'>
            <ButtonGroup vertical className='app-sidebar'>
              <SideButton name='Физические машины' to='/physical-machine/' />
              <SideButton name='Хранилища' to='/storage/' />
              <SideButton name='Группы физических машин(-)' to='/tmp/' />
            </ButtonGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Продуктовая среда</Accordion.Header>
          <Accordion.Body className='app-sidebar-accordion'>
            <ButtonGroup vertical className='app-sidebar'>
              <SideButton name='Виртуальные машины' to='/virtual-machine/' />
              <SideButton name='Группы виртуальных машин(-)' to='/tmp/' />
              <SideButton name='Сервисы' to='/service/' />
              <SideButton name='Визуализация нагрузки' to='/load-vizualize/' />
            </ButtonGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

function MainPage() {
  return (
    <div>MainPage</div>
  )
}

function ExamplePage() {
  return (
    <div className='app-page'>
      <ToolKit>
        <Button>Save</Button>
        <Button>Delete</Button>
        <Button>Export</Button>
        <Button>Save</Button>
        <Button>Delete</Button>
        <Button>Export</Button>
      </ToolKit>
      <AppPageContent name='Физические машины'>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </AppPageContent>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Container className='app-root'>
        <SideBar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/auth' element={<LoginPage />} />
          <Route path='/physical-machine/' element={<PhysicalMachineList />} />
          <Route path='/physical-machine/:id' element={<PhysicalMachine />} />
          <Route path='/virtual-machine/' element={<VirtualMachineList />} />
          <Route path='/virtual-machine/:id' element={<VirtualMachine />} />
          <Route path='/service/' element={<ServicesList />} />
          <Route path='/service/:id' element={<Service />} />
          <Route path='/load-vizualize/' element={<PhysicalLoad />} />
          <Route path='/storage/' element={<StorageList/>} />
          <Route path='/storage/:id' element={<Storage/>} />
          <Route path='/example' element={<ExamplePage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
