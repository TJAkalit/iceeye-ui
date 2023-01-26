import React, { ChangeEvent, useEffect, useState } from "react"
import {
    FloatingLabel,
    Form,
    Button,
} from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export function ToolKit({ children }: { children: React.ReactNode }) {
    return (
        <div className='app-page-toolkit'>
            {children}
        </div>
    )
}

export function AppPageContent({ children, name }: { children: React.ReactNode, name: string }) {
    return (
        <div className='app-page-content'>
            <h1>{name}</h1>
            {children}
        </div>
    )
}

export function TextControl(props: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <FloatingLabel label={props.label} className='app-text-control'>
            <Form.Control value={props.value} onChange={props.onChange}/>
        </FloatingLabel>
    )
}

export function NumControl(props: { label: string, value: number | undefined, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {

    return (
        <FloatingLabel label={props.label} className='app-num-control'>
            <Form.Control value={props.value} onChange={props.onChange}/>
        </FloatingLabel>
    )
}

export function ReloadButton(props: { name: string }) {
    const nav = useNavigate();
    return (
        <Button variant='warning' onClick={() => { nav(0) }}>{props.name}</Button>
    )
}

export function NumControlRange(props: {name: string, value: number, min: number, max: number, onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void}) {

    const [start, setStart] = useState(props.value);
    const [current, setCurrent] = useState(start);

    return (
        <FloatingLabel label={`${props.name}: ${current}`} className="app-num-control-range">
            <Form.Control
                type='range' 
                min={props.min} max={props.max} value={props.value}
                onChange={props.onChange}
            />
        </FloatingLabel>
    )
}