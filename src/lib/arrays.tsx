import React from "react";

export class Paginator<T>{

    private items: T[]
    private count: number;

    constructor(items: T[], count: number) {
        this.items = items;
        this.count = count;
    };

    pages(): number {
        return (this.items.length - this.items.length % this.count) / this.count + 1;
    };

    getPage(page: number): T[] {
        let pageItems: T[] = [];
        let startItem: number = (page - 1) * this.count;
        let endItem: number = startItem + this.count;

        if (startItem > this.items.length)
            return [];

        if (endItem > this.items.length)
            endItem = this.items.length;

        for (let i = startItem; i < endItem; i++) {
            pageItems.push(this.items[i]);
        };
        return pageItems;
    };
    hasNext(page: number): boolean {
        let startItem: number = (page) * this.count;
        return startItem <= this.items.length;
    };
    hasPrev(page: number): boolean {
        let startItem: number = (page - 2) * this.count;
        let endItem: number = startItem + this.count;

        return startItem >= 0;
    };
};