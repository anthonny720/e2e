import React, {useEffect, useRef} from 'react';
import Planning from "../Home";
import {useDispatch, useSelector} from "react-redux";
import {size} from "lodash";
import {get_stocks} from "../../../../redux/actions/operations";
import Humanize from "humanize-plus";
import NavStock from "../../../../components/Planning/Stock/Nav";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Helmet} from "react-helmet";
import Filter from "../../../../components/Planning/Filter";

const Inventory = () => {
    const tableRef = useRef(null);
    const dispatch = useDispatch()
    const payload = useSelector(state => state.Operations.stocks)


    useEffect(() => {
        dispatch(get_stocks())
    }, []);


    return (<Planning>
            <Helmet>
                <title>Stock</title>
            </Helmet>
            <NavStock/>
            <div className={'p-2 flex justify-between relative'}>

                <p><span className={"font-bold text-sm text-gray-800"}>{size(payload)} </span><span
                    className={"text-center text-xs  text-gray-800"}> Items</span></p>
                <Filter dispatch={dispatch} action={get_stocks} dateField={false}/>
                <div className={" right-0 flex gap-2"}>
                    <DownloadTableExcel
                        filename={`Stock ${new Date().toLocaleDateString()}`}
                        sheet="Data"
                        currentTableRef={tableRef.current}>
                        <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>
                    </DownloadTableExcel>
                </div>
            </div>
            <div className="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
                <table className="w-full  text-sm text-left text-gray-500 " ref={tableRef}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-gray-400 text-center">
                            Codigo
                        </th>
                        <th scope="col" className="px-4 py-3 text-gray-400 text-center">
                            Nombre
                        </th>
                        <th scope="col" className="px-4 py-3 text-gray-400 text-center">
                            Categoría
                        </th>

                        <th scope="col" className="px-4 py-3 text-gray-400 text-center">
                            Stock
                        </th>

                        <th scope="col" className="px-4 py-3 text-gray-400 text-center">
                            U.M.
                        </th>
                        <th scope="col" className="px-4 py-3 text-gray-400 text-center">
                            Costo und
                        </th>
                        <th scope="col" className="px-4 py-3 text-gray-400 text-center">
                            Costo total
                        </th>
                        <th scope="col" className="px-4 py-3 text-gray-400 text-center">
                            Lead time
                        </th>
                        <th scope="col" className="px-4 py-3 text-gray-400 text-center">
                            Consumo
                        </th>
                        <th scope="col" className="px-4 py-3 text-gray-400 text-center">
                            S.S.
                        </th>
                        <th scope="col" className="px-4 py-3 text-gray-400 text-center">
                            R.P.
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {payload && payload !== null && payload !== undefined && size(payload) > 0 ? payload.map((item, index) =>
                        <tr className="bg-white border-b  " key={index}>
                            <td className=" py-4 text-center text-xs text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.product?.sap}
                            </td>
                            <td className=" py-4 text-start pl-2 text-xs text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.product?.name}
                            </td>
                            <td className=" py-4 text-center text-xs text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.product?.group_name}
                            </td>
                            <td className={` py-4 text-center text-xs ${item?.quantity > item?.reorder_point ? 'text-green-400' : item?.quantity <= item?.reorder_point && item?.quantity >= item?.safety_stock ? 'text-yellow-500' : 'text-red-400'}  whitespace-nowrap hover:text-green-400 hover:cursor-pointer`}>
                                {Humanize.formatNumber(item?.quantity, 2)}
                            </td>
                            <td className=" py-4 text-center text-xs text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.product?.unit_of_measurement_name}
                            </td>
                            <td className=" py-4 text-center text-xs text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.price, 2)}
                            </td>
                            <td className=" py-4 text-center text-xs text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.price * item?.quantity, 2)}
                            </td>
                            <td className=" py-4 text-center text-xs text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.lead_time, 0)} días
                            </td>
                            <td className="px-8 py-4 text-center text-xs text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.consumption_average, 2)}
                            </td>
                            <td className=" py-4 text-center text-xs text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.safety_stock, 2)}
                            </td>
                            <td className=" py-4 text-center text-xs text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.reorder_point, 2)}
                            </td>
                        </tr>) : <tr class="bg-white border-b  ">
                        <td colSpan={14}
                            className=" py-4 text-center text-center text-xs text-gray-400 whitespace-nowrap  ">
                            No hay datos
                        </td>
                    </tr>}
                    </tbody>
                </table>
            </div>
        </Planning>

    );
};

export default Inventory;
