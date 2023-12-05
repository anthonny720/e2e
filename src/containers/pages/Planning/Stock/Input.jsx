<<<<<<< HEAD
import React, {useEffect, useRef} from 'react';
=======
import React, {useEffect, useRef, useState} from 'react';
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
import Planning from "../Home";
import {useDispatch, useSelector} from "react-redux";
import {size} from "lodash";
import {get_stock_entries} from "../../../../redux/actions/operations";
import Humanize from "humanize-plus";
import NavStock from "../../../../components/Planning/Stock/Nav";
import Skeleton from "react-loading-skeleton";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import {DownloadTableExcel} from "react-export-table-to-excel";
<<<<<<< HEAD

import {Helmet} from "react-helmet";
import Filter from "../../../../components/Planning/Filter";
=======
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {Helmet} from "react-helmet";
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977

const Input = () => {
    const tableRef = useRef(null);
    const dispatch = useDispatch()
    const payload = useSelector(state => state.Operations.stock_entries)
<<<<<<< HEAD


    useEffect(() => {
        dispatch(get_stock_entries())
    }, []);


=======
    const [formData, setFormData] = useState({item__name: '', start_date: '', end_date: ''})
    const {item__name} = formData
    const [date, setDate] = useState();

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        dispatch(get_stock_entries(formData))
    }, [date, formData]);


    const onDateChange = (e) => {
        setDate(e)
        setFormData({
            ...formData,
            start_date: e?.[0] ? new Date(e?.[0]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : '',
            end_date: e?.[1] ? new Date(e?.[1]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : ''
        })
    }

>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
    return (<Planning>
            <Helmet>
                <title>Ingresos de stock</title>
            </Helmet>
            <NavStock/>
            <div className={'p-2 flex justify-between '}>
                <p><span className={"font-bold text-sm text-gray-800"}>{size(payload)} </span><span
<<<<<<< HEAD
                    className={" text-sm text-gray-800 "}> Ingresos</span></p>

                <Filter dispatch={dispatch} action={get_stock_entries} dateField={true}/>

                <div className={" right-0 flex gap-2"}>
=======
                    className={"font-medium text-sm text-gray-800"}> Ingresos</span></p>
                <p className={"hidden sm:block"}>
                    <DateRangePicker
                        className={`z-[100] rounded-2xl bg-white 'w-max' text-gray-400 text-xs p-1 mb-2  flex flex-col border-2 border-green-400`}
                        calendarClassName={"border-1"} onChange={onDateChange}
                        value={date}/>
                </p>
                <p className={" right-0 flex gap-2"}>
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
                    <DownloadTableExcel
                        filename={`Ingresos ${new Date().toLocaleDateString()}`}
                        sheet="Data"
                        currentTableRef={tableRef.current}
                    >
                        <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>

                    </DownloadTableExcel>
<<<<<<< HEAD
                </div>
=======
                </p>
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
            </div>
            <div className="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
                <table className="w-full  text-sm text-left text-gray-500 " ref={tableRef}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
<<<<<<< HEAD
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Codigo
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Nombre
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            OC
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Proveedor
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Fecha de OC
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Fecha de ingreso
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Precio
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Cantidad
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Precio total
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Stock
=======
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="product__sap"
                                id="product__sap"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="Codigo"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="item__name"
                                id="item__name"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                value={item__name}
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
                                name="supplier"
                                id="supplier"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="Proveedor"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="po_date"
                                id="po_date"
                                type="text"
                                disabled
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                placeholder="Fecha de OC"
                            />
                        </th>
                         <th scope="col" className="px-4 py-3">
                            <input
                                name="arrival_date"
                                id="arrival_date"
                                type="text"
                                disabled
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                placeholder="Fecha de ingreso"
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
                                placeholder="Precio"
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
                                name="total"
                                id="total"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="Precio total"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="stock"
                                id="stock"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="Stock"
                            />
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {payload && payload !== null && payload !== undefined && size(payload) > 0 ? payload.map((item, index) =>
                        <tr className="bg-white border-b  " key={index}>
<<<<<<< HEAD
                            <td className="px-6 py-4 text-xs text-center text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.code_sap}
                            </td>
                            <td className="px-6 py-4 text-xs text-center text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.material}
                            </td>
                            <td className="px-6 py-4 text-xs text-center text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.po_number}
                            </td>
                            <td className="px-6 py-4 text-xs text-center text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.supplier}
                            </td>
                            <td className="px-6 py-4 text-xs text-center text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
=======
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.code_sap}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.material}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.po_number}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.supplier}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
                                {new Date(item?.po_date + "T00:00:00").toLocaleDateString('es-PE', {
                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                })}
                            </td>
<<<<<<< HEAD
                            <td className="px-6 py-4 text-xs text-center text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
=======
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
                                {new Date(item?.arrival_date + "T00:00:00").toLocaleDateString('es-PE', {
                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                })}
                            </td>
<<<<<<< HEAD

                            <td className="px-6 py-4 text-xs text-center text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.price_per_unit, 2)}
                            </td>
                            <td className="px-6 py-4 text-xs text-center text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.quantity}
                            </td>
                            <td className="px-6 py-4 text-xs text-center text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.price_per_unit * item?.quantity, 2)}
                            </td>
                            <td className="px-6 py-4 text-xs text-center text-gray-900 whitespace-nowrap hover:text-green-400 ">
                                <div className={"flex justify-between"}>
                                    <p>{item?.stock} </p>
                                </div>
                            </td>
=======
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                $
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.price_per_unit, 2)}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.quantity}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.price_per_unit * item?.quantity, 2)}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 ">
                                <div className={"flex justify-between"}>
                                    <p>{item?.stock} </p>
                                </div>

                            </td>

>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
                        </tr>) : <tr>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
                        <td className={"px-4"}><Skeleton count={20}/></td>
<<<<<<< HEAD
=======
                        <td className={"px-4"}><Skeleton count={20}/></td>
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977

                    </tr>}
                    </tbody>
                </table>
            </div>
        </Planning>

    );
};

export default Input;
