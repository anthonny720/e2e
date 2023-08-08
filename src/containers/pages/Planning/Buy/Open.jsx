import React, {useEffect, useRef, useState} from 'react';
import Planning from "../Home";
import NavBuy from "../../../../components/Planning/Buy/Nav";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import Table from "../../../../components/Planning/Buy/Table";
import {add_transfer_stock, delete_purchase, get_purchases} from "../../../../redux/actions/operations";
import {useDispatch, useSelector} from "react-redux";
import {filter, size} from 'lodash'
import Modal from "../../../../components/util/Modal";
import ModalHook from "../../../../components/util/hooks";
import {MySwal} from "../../../../components/util/colors";
import FormPurchase from "../../../../components/Planning/Buy/Form";
import {get_currencies, get_suppliers, get_taxes} from "../../../../redux/actions/management";
import {DownloadTableExcel} from "react-export-table-to-excel";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {Helmet} from "react-helmet";

const BuyOpen = () => {
    const tableRef = useRef(null);
    const [formData, setFormData] = useState({
        supplier__display_name: '', order_id: '', invoice_id: '', guide_number: '', start_date: '', end_date: ''
    })
    const [date, setDate] = useState();
    const dispatch = useDispatch();
    const payload = useSelector(state => state.Operations.purchases);
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();
    const suppliers = useSelector(state => state.Management.suppliers);
    const taxes = useSelector(state => state.Management.taxes);
    const currencies = useSelector(state => state.Management.currencies);

    useEffect(() => {
        dispatch(get_purchases());
        dispatch(get_suppliers());
        dispatch(get_taxes());
        dispatch(get_currencies());
    }, []);

    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormPurchase close={openModal} taxes={taxes} suppliers={suppliers} currencies={currencies}/>
        </div>)
    }

    const handleUpdateForm = (item) => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormPurchase data={item} close={openModal} taxes={taxes} suppliers={suppliers}/>
        </div>)
    }

    const handleTransfer = (id) => {
        MySwal.fire({
            title: '¿Desea finalizar este pedido?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(add_transfer_stock({id: id}))
            }
        })
    }
    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar esta Orden de compra?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_purchase(id))
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
        <NavBuy/>
         <Helmet>
            <title>Compras</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={'p-2 flex justify-between'}>
            <p><span
                className={"font-bold text-sm text-gray-800"}>{size(payload ? filter(payload, {status: 'pending'}) : [])} </span><span
                className={"font-medium text-sm text-gray-800"}> Ordenes</span></p>
            <p className={"hidden sm:block"}><DateRangePicker
                className={`z-[100] rounded-2xl bg-white 'w-max' text-gray-400 text-xs p-1 mb-2  flex flex-col border-2 border-green-400`}
                calendarClassName={"border-1"} onChange={onDateChange}
                value={date}/></p>

            <p className={"right-0 pr-2 flex gap-2"}>
                <span className={"font-bold text-sm text-green-500 cursor-pointer"}
                      onClick={handleAddForm}>+ Orden</span>
                <DownloadTableExcel
                    filename={`Compra ${new Date().toLocaleDateString()}`}
                    sheet="Data"
                    currentTableRef={tableRef.current}
                >
                    <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>

                </DownloadTableExcel>
            </p>
        </div>
        <Table date={date} formData={formData} setFormData={setFormData} reference={tableRef} handleEdit={handleUpdateForm} handleDelete={handleDelete}
               handleTransfer={handleTransfer}
               data={payload ? filter(payload, {status: 'pending'}) : []}/>
    </Planning>);
};

export default BuyOpen;
