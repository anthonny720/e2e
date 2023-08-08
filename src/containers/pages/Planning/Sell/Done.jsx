import React, {useRef, useState} from 'react';
import Planning from "../Home";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import NavSales from "../../../../components/Planning/Sell/Nav";
import Table from "../../../../components/Planning/Sell/Table";
import {filter, size} from "lodash";
import {useSelector} from "react-redux";
import {DownloadTableExcel} from "react-export-table-to-excel";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {Helmet} from "react-helmet";

const SellDone = () => {
    const payload = useSelector(state => state.Operations.sales);
    const [date, setDate] = useState();
    const tableRef = useRef(null);
    const [formData, setFormData] = useState({
        sku__name: '',
        customer__display_name: '',
        process_plant__display_name: '',
        order_id: '',
        quote_id: '',
        management: '',
        start_date: '',
        end_date: ''
    })

    const onDateChange = (e) => {
        setDate(e)
        setFormData({
            ...formData,
            start_date: e?.[0] ? new Date(e?.[0]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : '',
            end_date: e?.[1] ? new Date(e?.[1]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : ''
        })
    }
    return (<Planning>
        <Helmet>
            <title>Ventas</title>
        </Helmet>
        <NavSales/>
        <div className={'p-2 flex justify-between'}>
            <p><span className={"font-bold text-sm text-gray-800"}>{ payload && size(filter(payload, {delivery: 'delivered'}))} </span><span
                className={"font-medium text-sm text-gray-800"}> Pedidos</span></p>
            <p className={"hidden sm:block"}><DateRangePicker
                className={`z-[100] rounded-2xl bg-white 'w-max' text-gray-400 text-xs p-1 mb-2  flex flex-col border-2 border-green-400`}
                calendarClassName={"border-1"} onChange={onDateChange}
                value={date}/></p>
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
        <Table formData={formData} setFormData={setFormData} date={date} reference={tableRef} data={payload ? filter(payload, {delivery: 'delivered'}) : []}/>
    </Planning>);
};

export default SellDone;
