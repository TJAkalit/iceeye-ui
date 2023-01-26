import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { PhysicalMachineList } from './pages/PhysMachineList';
import { PhysicalMachine } from './pages/PhysMachine';
import { VirtualMachineList } from './pages/VirtulaMachineList';
import { VirtualMachine } from './pages/VirtualMachine';

import { ButtonGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { ToolKit, AppPageContent } from './components/template';

function LoginPage() {

  return (
    <Container>test</Container>
  )
}

function SideBar() {

  function SideButton(prop: { name: string, to: string }) {
    const nav = useNavigate();
    const variant = 'secondary'
    return (
      <Button
        onClick={() => nav(prop.to)}
        variant={variant}
      >{prop.name}</Button>
    )
  }

  return (
    <ButtonGroup
      vertical
      className='app-sidebar'
    >
      <SideButton name='Главная' to='/' />
      <SideButton name='Физические машины' to='/physical-machine/' />
      <SideButton name='Виртуальные машины' to='/virtual-machine/' />
    </ButtonGroup>
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

function AppPage({ children }: { children: React.ReactNode }) {
  console.log(children)
  return (
    <>
      {children}
    </>
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
          <Route path='/example' element={<AppPage><ExamplePage /></AppPage>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
