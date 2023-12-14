import React, {useRef} from 'react';
import Planning from "../Home";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import NavSales from "../../../../components/Planning/Sell/Nav";
import Table from "../../../../components/Planning/Sell/Table";
import {filter, size} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Helmet} from "react-helmet";
import Filter from "../../../../components/Planning/Sell/Filter";
import {get_sales_progress} from "../../../../redux/actions/commercial";

const SellDone = () => {
    const payload = useSelector(state => state.Commercial.sales_progress);
    const tableRef = useRef(null);
    const dispatch = useDispatch()


    return (<Planning>
        <Helmet>
            <title>Ventas</title>
        </Helmet>
        <NavSales/>
        <div className={'p-2 flex justify-between'}>
            <p><span
                className={"font-bold text-sm text-gray-800"}>{payload && size(filter(payload, {status: 'P'}))} </span><span
                className={"font-medium text-sm text-gray-800"}> Pedidos</span></p>
            <Filter dispatch={dispatch} action={get_sales_progress}/>
            <p className={" right-0 pr-2 flex gap-2"}>
                <DownloadTableExcel
                    filename={`Ventas ${new Date().toLocaleDateString()}`}
                    sheet="Data"
                    currentTableRef={tableRef.current}
                >
                    <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>

                </DownloadTableExcel>
            </p>
        </div>
        <Table reference={tableRef}
               data={payload ? filter(payload, {status: 'P'}) : []}/>
    </Planning>);
};

export default SellDone;
