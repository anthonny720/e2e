import React, {useEffect, useRef} from 'react';
import Planning from "../Home";
import {useDispatch, useSelector} from "react-redux";
import {size} from "lodash";
import {get_stock_entries} from "../../../../redux/actions/operations";
import Humanize from "humanize-plus";
import NavStock from "../../../../components/Planning/Stock/Nav";
import Skeleton from "react-loading-skeleton";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import {DownloadTableExcel} from "react-export-table-to-excel";

import {Helmet} from "react-helmet";
import Filter from "../../../../components/Planning/Filter";

const Input = () => {
    const tableRef = useRef(null);
    const dispatch = useDispatch()
    const payload = useSelector(state => state.Operations.stock_entries)


    useEffect(() => {
        dispatch(get_stock_entries())
    }, []);


    return (<Planning>
            <Helmet>
                <title>Ingresos de stock</title>
            </Helmet>
            <NavStock/>
            <div className={'p-2 flex justify-between '}>
                <p><span className={"font-bold text-sm text-gray-800"}>{size(payload)} </span><span
                    className={" text-sm text-gray-800 "}> Ingresos</span></p>

                <Filter dispatch={dispatch} action={get_stock_entries} dateField={true}/>

                <div className={" right-0 flex gap-2"}>
                    <DownloadTableExcel
                        filename={`Ingresos ${new Date().toLocaleDateString()}`}
                        sheet="Data"
                        currentTableRef={tableRef.current}
                    >
                        <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>

                    </DownloadTableExcel>
                </div>
            </div>
            <div className="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
                <table className="w-full  text-sm text-left text-gray-500 " ref={tableRef}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
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
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {payload && payload !== null && payload !== undefined && size(payload) > 0 ? payload.map((item, index) =>
                        <tr className="bg-white border-b  " key={index}>
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
                                {new Date(item?.po_date + "T00:00:00").toLocaleDateString('es-PE', {
                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                })}
                            </td>
                            <td className="px-6 py-4 text-xs text-center text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {new Date(item?.arrival_date + "T00:00:00").toLocaleDateString('es-PE', {
                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                })}
                            </td>

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
                        </tr>) : <tr>
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

export default Input;
