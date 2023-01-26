import React from 'react';

export interface IPhysicalMachine {
    id?: number,
    name: string,
    cpu: number,
    ram: number,
}

export interface IVirtualMachine {
    id?: number,
    name: string,
    cpu: number,
    ram: number,
    pm_id?: number
}