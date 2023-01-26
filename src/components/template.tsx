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

interface TCProps {
    label: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    changed?: boolean
}

export function TextControl(props: TCProps) {

    let classes = 'app-num-control';
    if (props.changed)
        classes += ' app-control-changed';

    return (
        <FloatingLabel label={props.label} className={classes}>
            <Form.Control value={props.value} onChange={props.onChange}/>
        </FloatingLabel>
    )
}

interface NCProps {
    label: string,
    value: number|undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    changed?: boolean
}

export function NumControl(props: NCProps) {

    let classes = 'app-num-control';
    if (props.changed)
        classes += ' app-control-changed';

    return (
        <FloatingLabel label={props.label} className={classes}>
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

interface NumControlRangeProps {
    name: string, 
    value: number, 
    min: number, 
    max: number, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void, 
}

export function NumControlRange(props: NumControlRangeProps) {

    return (
        <FloatingLabel label={`${props.name}: ${props.value}`} className="app-num-control-range">
            <Form.Control
                type='range' 
                min={props.min} max={props.max} value={props.value}
                onChange={props.onChange}
            />
        </FloatingLabel>
    )
}

interface FCRProps {
    name: string, 
    value: number, 
    min: number, 
    max: number, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void, 
}

export function FloatControlRange(props: FCRProps) {

    return (
        <FloatingLabel label={`${props.name}: ${props.value}`} className="app-num-control-range">
            <Form.Control
                type='range' 
                min={props.min} max={props.max} value={props.value} step='0.1'
                onChange={props.onChange}
            />
        </FloatingLabel>
    )
}