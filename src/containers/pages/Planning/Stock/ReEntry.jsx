<<<<<<< HEAD
import React, {useEffect, useRef} from 'react';
=======
import React, {useEffect, useRef, useState} from 'react';
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
import Planning from "../Home";
import {useDispatch, useSelector} from "react-redux";
import {size} from "lodash";
import {get_stock_reentries} from "../../../../redux/actions/operations";
import NavStock from "../../../../components/Planning/Stock/Nav";
import Skeleton from "react-loading-skeleton";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import {DownloadTableExcel} from "react-export-table-to-excel";
<<<<<<< HEAD
import {Helmet} from "react-helmet";
import Filter from "../../../../components/Planning/Filter";
=======
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {Helmet} from "react-helmet";
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977

const ReEntry = () => {
    const tableRef = useRef(null);
    const dispatch = useDispatch()
    const payload = useSelector(state => state.Operations.stock_reentries)
<<<<<<< HEAD


    useEffect(() => {
        dispatch(get_stock_reentries())
    }, []);
=======
    const [formData, setFormData] = useState({
        stock_entry__item__name: '',
        start_date: '',
        end_date: ''
    })
    const {stock_entry__item__name} = formData
    const [date, setDate] = useState();


    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        dispatch(get_stock_reentries(formData))
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
<<<<<<< HEAD
                <title>Re-ingresos de stock</title>
            </Helmet>
            <NavStock/>
            <div className={'p-2 flex justify-between '}>
                <p><span className={"font-bold text-sm text-gray-800"}>{size(payload)} </span><span
                    className={" text-sm text-gray-800"}> Re-ingresos</span></p>
                <Filter dispatch={dispatch} action={get_stock_reentries} dateField={true}/>
                <div className={" right-0 flex gap-2"}>
=======
            <title>Re-ingresos de stock</title>
        </Helmet>
            <NavStock/>
            <div className={'p-2 flex justify-between '}>
                <p><span className={"font-bold text-sm text-gray-800"}>{size(payload)} </span><span
                    className={"font-medium text-sm text-gray-800"}> Re-ingresos</span></p>
                <p className={"hidden sm:block"}><DateRangePicker
                    className={`z-[100] rounded-2xl bg-white 'w-max' text-gray-400 text-xs p-1 mb-2  flex flex-col border-2 border-green-400`}
                    calendarClassName={"border-1"} onChange={onDateChange}
                    value={date}/></p>
                <p className={" right-0 flex gap-2"}>
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
                    <DownloadTableExcel
                        filename={`ReIngresos ${new Date().toLocaleDateString()}`}
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
                            Código
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Nombre
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            OC
                        </th>

                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Fecha de reingreso
                        </th>

                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Cantidad
                        </th>

                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Precio unitario
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-gray-400">
                            Precio total
=======
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
                                name="stock_entry__item__name"
                                id="stock_entry__item__name"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                value={stock_entry__item__name}
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
                                name="date"
                                id="date"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled
                                placeholder="Fecha de ingreso"
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
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
                        </th>

                    </tr>
                    </thead>
                    <tbody>
                    {payload && payload !== null && payload !== undefined && size(payload) > 0 ? payload.map((item, index) =>
                        <tr className="bg-white border-b  " key={index}>
<<<<<<< HEAD
                            <td className="text-center py-4 text-xs  text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.stock_entry?.code_sap}
                            </td>
                            <td className="text-center py-4 text-xs  text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.stock_entry?.material}
                            </td>
                            <td className="text-center py-4 text-xs  text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.stock_entry?.po_number}
                            </td>

                            <td className="text-center py-4 text-xs  text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
=======
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
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
                                {new Date(item?.date + "T00:00:00").toLocaleDateString('es-PE', {
                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                })}
                            </td>

<<<<<<< HEAD
                            <td className="text-center py-4 text-xs  text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.quantity}
                            </td>
                            <td className="text-center py-4 text-xs  text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                50.00
                            </td>
                            <td className="text-center py-4 text-xs  text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                150.00
                            </td>
=======
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.quantity}
                            </td>
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977

                        </tr>) : <tr>
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

export default ReEntry;
