import React, {useEffect, useRef, useState} from 'react';
import Planning from "../Home";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import Table from "../../../../components/Planning/Sell/Table";
import NavSales from "../../../../components/Planning/Sell/Nav";
import {filter, size} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import ModalHook from "../../../../components/util/hooks";
import Modal from "../../../../components/util/Modal";
import FormSell from "../../../../components/Planning/Sell/Form";
import {delete_sales_order, get_skus} from "../../../../redux/actions/operations";
import {get_currencies, get_customers, get_outsourcings, get_taxes} from "../../../../redux/actions/management";
import {MySwal} from "../../../../components/util/colors";
import {DownloadTableExcel} from "react-export-table-to-excel";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {Helmet} from "react-helmet";

const SellOpen = () => {
    const tableRef = useRef(null);
    const payload = useSelector(state => state.Operations.sales);
    const [date, setDate] = useState();
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();
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

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(get_skus())
        dispatch(get_customers())
        dispatch(get_outsourcings())
        dispatch(get_currencies())
        dispatch(get_taxes())
    }, []);

    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<FormSell close={openModal}/>)
    }

    const handleUpdateForm = (item) => {
        setIsOpen(true)
        setContent(<FormSell close={openModal} data={item}/>)
    }

    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar esta Orden de compra?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_sales_order(id))
            }
        })
    }

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

        <Modal isOpen={isOpen} close={openModal} children={content}/>

        <div className={'p-2 flex justify-between'}>
            <p><span
                className={"font-bold text-sm text-gray-800"}>{payload && size(filter(payload, {delivery: 'pending'}))} </span><span
                className={"font-medium text-sm text-gray-800"}> Pedidos</span></p>
            <p className={"hidden sm:block"}>
                <DateRangePicker
                className={`z-[100] rounded-2xl bg-white 'w-max' text-gray-400 text-xs p-1 mb-2  flex flex-col border-2 border-green-400`}
                calendarClassName={"border-1"} onChange={onDateChange}
                value={date}/></p>

            <p className={" right-0 pr-2 flex gap-2"}>
                <span className={"font-bold text-sm text-green-500 cursor-pointer"} onClick={() => handleAddForm()}>+ Pedido</span>
                <DownloadTableExcel
                    filename={`Ventas ${new Date().toLocaleDateString()}`}
                    sheet="Data"
                    currentTableRef={tableRef.current}
                >
                    <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>
                </DownloadTableExcel>

            </p>
        </div>

        <Table formData={formData} setFormData={setFormData} date={date} reference={tableRef} handleDelete={handleDelete} handleEdit={handleUpdateForm}
               data={payload ? filter(payload, {delivery: 'pending'}) : []}/>

    </Planning>);
};

export default SellOpen;
