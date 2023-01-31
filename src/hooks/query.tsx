import React from "react";
import { useLocation } from "react-router-dom";

export function usePage() {

    const { search } = useLocation();
    let page: string | number | null = React.useMemo(() => new URLSearchParams(search), [search]).get('page');
    if (typeof page === 'string' && !Number.isNaN(Number(page)))
        page = Number(page)
    else
        page = 1
    return page;
};