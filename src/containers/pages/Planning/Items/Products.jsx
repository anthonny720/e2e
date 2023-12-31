import React, {useEffect, useRef} from 'react';
import Planning from "../Home";
import NavItems from "../../../../components/Planning/Items/Nav";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import Table from "../../../../components/Planning/Items/Products/Table";
import {useDispatch, useSelector} from "react-redux";
import {size} from "lodash";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Helmet} from "react-helmet";
import {get_skus} from "../../../../redux/actions/operations";

const Products = () => {
    const tableRef = useRef(null);


    const dispatch = useDispatch();
    const payload = useSelector(state => state.Operations.products)

    useEffect(() => {
        dispatch(get_skus())
    }, []);


    return (<Planning>
        <Helmet>
            <title>Sku's</title>
        </Helmet>
        <NavItems/>

        <div className={'p-2 flex justify-between'}>
            <p>
                <span className={"font-bold text-sm text-gray-800"}>{size(payload)} </span>
                <span className={"font-medium text-sm text-gray-800"}> Productos</span>
            </p>
            <p className={"absolute right-0 pr-2 flex gap-2"}>
                <DownloadTableExcel
                    filename={`Productos ${new Date().toLocaleDateString()}`}
                    sheet="Data"
                    currentTableRef={tableRef.current}>
                    <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>
                </DownloadTableExcel>
            </p>
        </div>

        <div className="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
            <Table reference={tableRef} payload={payload}/>
        </div>
    </Planning>);
};

export default Products;
