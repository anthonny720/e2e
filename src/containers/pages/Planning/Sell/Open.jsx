import React, {useEffect, useRef, useState} from 'react';
import Planning from "../Home";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import Table from "../../../../components/Planning/Sell/Table";
import NavSales from "../../../../components/Planning/Sell/Nav";
import {filter, size} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Helmet} from "react-helmet";
import {get_sales_progress} from "../../../../redux/actions/commercial";

const SellOpen = () => {
    const tableRef = useRef(null);
    const payload = useSelector(state => state.Commercial.sales_progress);
    const [date, setDate] = useState();


    const getCurrentMonth = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
        return String(currentMonth);
    };

    const getCurrentYear = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        return String(currentYear);
    };

    const generateOptions = (start, end) => {
        const options = [];
        for (let i = start; i <= end; i++) {
            options.push({value: String(i), label: String(i)});
        }
        return options;
    };
    const years = generateOptions(2020, 2030);

    const renderOptions = (options) => {
        return options.map((option) => (<option key={option.value} value={option.value}>
            {option.label}
        </option>));
    };


    const [formData, setFormData] = useState({
        sku: '',
        client_name: '',
        po_number: '',
        pfi_number: '',
        commercial_status: '',
        month: getCurrentMonth(), year:getCurrentYear(),
        fcl_name: '',
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_sales_progress(formData))
    }, [dispatch, formData])


    return (<Planning>
        <Helmet>
            <title>Ventas</title>
        </Helmet>

        <NavSales/>


        <div className={'p-2 flex justify-between'}>
            <p><span
                className={"font-bold text-sm text-gray-800"}>{payload && size(filter(payload, item => item.status === 'TBT' || item.status === 'TBD' || item.status === 'TBP'))} </span><span
                className={"font-medium text-sm text-gray-800"}> Pedidos</span></p>
            <div className={"gap-2 flex flex-row"}>
                <select value={formData.month}
                        className={`z-[100] rounded-2xl bg-white 'w-max' text-gray-400 text-xs p-1 mb-2  flex flex-col border-2 border-green-400`}
                        onChange={(e) => setFormData({...formData, month: e.target.value})}>
                    <option value={'1'}>Enero</option>
                    <option value={'2'}>Febrero</option>
                    <option value={'3'}>Marzo</option>
                    <option value={'4'}>Abril</option>
                    <option value={'5'}>Mayo</option>
                    <option value={'6'}>Junio</option>
                    <option value={'7'}>Julio</option>
                    <option value={'8'}>Agosto</option>
                    <option value={'9'}>Septiembre</option>
                    <option value={'10'}>Octubre</option>
                    <option value={'11'}>Noviembre</option>
                    <option value={'12'}>Diciembre</option>
                </select>
                <select
                    value={formData.year}
                    className={`z-[100] rounded-2xl bg-white 'w-max' text-gray-400 text-xs p-1 mb-2  flex flex-col border-2 border-green-400`}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                >
                    {renderOptions([...years])}
                </select>
            </div>

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

        <Table formData={formData} setFormData={setFormData} date={date} reference={tableRef}
               data={payload ? filter(payload, item => item.status === 'TBT' || item.status === 'TBD' || item.status === 'TBP') : []}/>

    </Planning>);
};

export default SellOpen;
