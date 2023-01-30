import React from 'react';

export interface IPhysicalMachine {
    id?: number,
    name: string,
    cpu: number,
    ram: number,
    cpu_multiply: number, 
}

export interface IVirtualMachine {
    id?: number,
    name: string,
    cpu: number,
    ram: number,
    size: number,
    pm_id?: number
}

export interface IService {
    id?: number,
    name: string,
    cpu: number,
    ram: number,
    vm_id?: number,
}

export interface ILoad {
    cpu: number,
    ram: number,
}

export interface IPhysicalLoad {
    id: number
    name: string
    cpu: number
    ram: number
    cpu_sum: number
    ram_sum: number
    cpu_multiply: number
    storage_sum: number
    virtual_machine_size: number
    virtual_machines: IVirtualMachine[]
}

export interface IStorage {
    id?: number
    name: string
    type: number
    size: number
    pm_id: number
}