import React, {useEffect, useRef, useState} from 'react';
import Planning from "../Home";
import {useDispatch, useSelector} from "react-redux";
import {size} from "lodash";
import {get_stock_available, get_stock_outputs} from "../../../../redux/actions/operations";
import NavStock from "../../../../components/Planning/Stock/Nav";
import Skeleton from "react-loading-skeleton";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import Modal from "../../../../components/util/Modal";
import ModalHook from "../../../../components/util/hooks";
import {DownloadTableExcel} from "react-export-table-to-excel";
import Humanize from "humanize-plus";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {Helmet} from "react-helmet";

const Output = () => {
    const tableRef = useRef(null);
    const dispatch = useDispatch()
    const payload = useSelector(state => state.Operations.stock_outputs)
    const data = useSelector(state => state.Operations.stock_available)
    const [formData, setFormData] = useState({product__name: '', start_date: '', end_date: ''})
    const {product__name} = formData
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();
    const [date, setDate] = useState();


    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        dispatch(get_stock_outputs(formData))
    }, [date, formData]);

    useEffect(() => {
        dispatch(get_stock_available())
    }, []);

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
                <title>Salidas de stock</title>
            </Helmet>
            <NavStock/>
            <Modal isOpen={isOpen} close={openModal} children={content}/>
            <div className={'p-2 flex justify-between '}>
                <p><span className={"font-bold text-sm text-gray-800"}>{size(payload)} </span><span
                    className={"font-medium text-sm text-gray-800"}> Salidas</span></p>
                <p className={"hidden sm:block"}><DateRangePicker
                    className={`z-[100] rounded-2xl bg-white 'w-max' text-gray-400 text-xs p-1 mb-2  flex flex-col border-2 border-green-400`}
                    calendarClassName={"border-1"} onChange={onDateChange}
                    value={date}/></p>
                <p className={" right-0 flex gap-2"}>
                    <DownloadTableExcel
                        filename={`Salidas ${new Date().toLocaleDateString()}`}
                        sheet="Data"
                        currentTableRef={tableRef.current}
                    >
                        <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>

                    </DownloadTableExcel>
                </p>
            </div>
            <div className="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
                <table className="w-full  text-sm text-left text-gray-500 " ref={tableRef}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="code"
                                id="code"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="Codigo"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="product__name"
                                id="product__name"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                value={product__name}
                                onChange={e => onChange(e)}
                                placeholder="Nombre"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="order_id"
                                id="order_id"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="OC"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="guide_number"
                                id="guide_number"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="# Guia"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="vale_number"
                                id="vale_number"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="# Vale"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="lot_id"
                                id="lot_id"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="Lote"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="date"
                                id="date"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="Fecha de salida"
                            />
                        </th>

                        <th scope="col" className="px-4 py-3">
                            <input
                                name="quantity"
                                id="quantity"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="Cantidad"
                            />
                        </th>

                        <th scope="col" className="px-4 py-3">
                            <input
                                name="currency"
                                id="currency"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="Moneda"
                            />
                        </th>

                        <th scope="col" className="px-4 py-3">
                            <input
                                name="price"
                                id="price"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="Precio unitario"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="total"
                                id="total"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="Precio total"
                            />
                        </th>

                    </tr>
                    </thead>
                    <tbody>
                    {payload && payload !== null && payload !== undefined && size(payload) > 0 ? payload.map((item, index) =>
                        <tr className="bg-white border-b  " key={index}>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.stock_entry?.code_sap}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.stock_entry?.material}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.stock_entry?.po_number}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.guide_number}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.vale_number}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.lot_id}
                            </td>

                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {new Date(item?.date + "T00:00:00").toLocaleDateString('es-PE', {
                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                })}
                            </td>

                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.quantity}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                $
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.price, 2)}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.price * item?.quantity, 2)}
                            </td>

                        </tr>) : <tr>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>


                    </tr>}
                    </tbody>
                </table>
            </div>
        </Planning>

    );
};

export default Output;
