import React, {useEffect, useRef} from 'react';
import Planning from "../Home";
import {useDispatch, useSelector} from "react-redux";
import {size} from "lodash";
import {get_stock_reentries} from "../../../../redux/actions/operations";
import NavStock from "../../../../components/Planning/Stock/Nav";
import Skeleton from "react-loading-skeleton";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Helmet} from "react-helmet";
import Filter from "../../../../components/Planning/Filter";

const ReEntry = () => {
    const tableRef = useRef(null);
    const dispatch = useDispatch()
    const payload = useSelector(state => state.Operations.stock_reentries)


    useEffect(() => {
        dispatch(get_stock_reentries())
    }, []);


    return (<Planning>
            <Helmet>
                <title>Re-ingresos de stock</title>
            </Helmet>
            <NavStock/>
            <div className={'p-2 flex justify-between '}>
                <p><span className={"font-bold text-sm text-gray-800"}>{size(payload)} </span><span
                    className={" text-sm text-gray-800"}> Re-ingresos</span></p>
                <Filter dispatch={dispatch} action={get_stock_reentries} dateField={true}/>
                <div className={" right-0 flex gap-2"}>
                    <DownloadTableExcel
                        filename={`ReIngresos ${new Date().toLocaleDateString()}`}
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
                        </th>

                    </tr>
                    </thead>
                    <tbody>
                    {payload && payload !== null && payload !== undefined && size(payload) > 0 ? payload.map((item, index) =>
                        <tr className="bg-white border-b  " key={index}>
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
                                {new Date(item?.date + "T00:00:00").toLocaleDateString('es-PE', {
                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                })}
                            </td>

                            <td className="text-center py-4 text-xs  text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.quantity}
                            </td>
                            <td className="text-center py-4 text-xs  text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                50.00
                            </td>
                            <td className="text-center py-4 text-xs  text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                150.00
                            </td>

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
