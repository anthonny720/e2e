import React, {useRef, useState} from 'react';
import Planning from "../Home";
import NavBuy from "../../../../components/Planning/Buy/Nav";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import Table from "../../../../components/Planning/Buy/Table";
import {useSelector} from "react-redux";
import {filter, size} from "lodash";
import {DownloadTableExcel} from "react-export-table-to-excel";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {Helmet} from "react-helmet";

const BuyDone = () => {
    const payload = useSelector(state => state.Operations.purchases);
    const [formData, setFormData] = useState({
        supplier__display_name: '', order_id: '', invoice_id: '', guide_number: ''
    })


    const onDateChange = (e) => {
        setDate(e)
        setFormData({
            ...formData,
            start_date: e?.[0] ? new Date(e?.[0]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : '',
            end_date: e?.[1] ? new Date(e?.[1]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : ''
        })
    }

    const tableRef = useRef(null);
    const [date, setDate] = useState();
    return (<Planning>
         <Helmet>
            <title>Compras</title>
        </Helmet>
        <NavBuy/>
        <div className={'p-2 flex justify-between'}>
            <p><span
                className={"font-bold text-sm text-gray-800"}>{size(payload ? filter(payload, {status: 'received'}) : [])} </span><span
                className={"font-medium text-sm text-gray-800"}> Ordenes</span></p>
            <p className={"hidden sm:block"}><DateRangePicker
                className={`z-[100] rounded-2xl bg-white 'w-max' text-gray-400 text-xs p-1 mb-2  flex flex-col border-2 border-green-400`}
                calendarClassName={"border-1"} onChange={onDateChange}
                value={date}/></p>
            <p className={"right-0 pr-2 flex gap-2"}>
                <DownloadTableExcel
                    filename={`Compra ${new Date().toLocaleDateString()}`}
                    sheet="Data"
                    currentTableRef={tableRef.current}
                >
                    <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>

                </DownloadTableExcel>
            </p>
        </div>
        <Table date={date} formData={formData} setFormData={setFormData} reference={tableRef}
               data={payload ? filter(payload, {status: 'received'}) : []}/>
    </Planning>);
};

export default BuyDone;
