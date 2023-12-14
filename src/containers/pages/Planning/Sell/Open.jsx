import React, {useRef} from 'react';
import Planning from "../Home";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import Table from "../../../../components/Planning/Sell/Table";
import NavSales from "../../../../components/Planning/Sell/Nav";
import {filter, size} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Helmet} from "react-helmet";
import {get_sales_progress} from "../../../../redux/actions/commercial";
import Filter from "../../../../components/Planning/Sell/Filter";

const SellOpen = () => {
    const tableRef = useRef(null);
    const payload = useSelector(state => state.Commercial.sales_progress);


    const dispatch = useDispatch()


    return (<Planning>
        <Helmet>
            <title>Ventas</title>
        </Helmet>

        <NavSales/>


        <div className={'p-2 flex justify-between'}>
            <p><span
                className={"font-bold text-sm text-gray-800"}>{payload && size(filter(payload, item => item.status === 'TBT' || item.status === 'TBD' || item.status === 'TBP'))} </span><span
                className={"font-medium text-sm text-gray-800"}> Pedidos</span></p>
            <Filter dispatch={dispatch} action={get_sales_progress}/>

            <div className={" right-0 pr-2 flex gap-2"}>
                <DownloadTableExcel
                    filename={`Ventas ${new Date().toLocaleDateString()}`}
                    sheet="Data"
                    currentTableRef={tableRef.current}
                >
                    <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>
                </DownloadTableExcel>

            </div>
        </div>

        <Table reference={tableRef}
               data={payload ? filter(payload, item => item.status === 'TBT' || item.status === 'TBD' || item.status === 'TBP') : []}/>

    </Planning>);
};

export default SellOpen;
