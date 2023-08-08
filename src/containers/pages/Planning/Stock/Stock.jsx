import React, {useEffect, useRef, useState} from 'react';
import Planning from "../Home";
import {useDispatch, useSelector} from "react-redux";
import {size} from "lodash";
import {get_stocks} from "../../../../redux/actions/operations";
import Humanize from "humanize-plus";
import NavStock from "../../../../components/Planning/Stock/Nav";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Helmet} from "react-helmet";

const Inventory = () => {
    const tableRef = useRef(null);
    const dispatch = useDispatch()
    const payload = useSelector(state => state.Operations.stocks)
    const [formData, setFormData] = useState({product__name: '', product__sap: ''})
    const {product__name, product__sap} = formData
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        dispatch(get_stocks(formData))
    }, [formData]);


    return (<Planning>
            <Helmet>
            <title>Stock</title>
        </Helmet>
            <NavStock/>
            <div className={'p-2 flex justify-between relative'}>

                <p><span className={"font-bold text-sm text-gray-800"}>{size(payload)} </span><span
                    className={"font-medium text-sm text-gray-800"}> Items</span></p>
                <p className={" right-0 flex gap-2"}>
                    <DownloadTableExcel
                        filename={`Stock ${new Date().toLocaleDateString()}`}
                        sheet="Data"
                        currentTableRef={tableRef.current}>
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
                                name="product__sap"
                                id="product__sap"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                value={product__sap}
                                onChange={e => onChange(e)}
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
                                name="category"
                                id="category"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Categoria"
                            />
                        </th>

                        <th scope="col" className="px-4 py-3">
                            <input
                                name="stock"
                                id="stock"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Stock"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="enable"
                                id="enable"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Disponible"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="expected"
                                id="expected"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Esperado"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="um"
                                id="um"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="U.M."
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="avg_cost"
                                id="avg_cost"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Costo und"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="total_cosst"
                                id="total_cosst"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Costo total"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="lead_time"
                                id="lead_time"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Lead Time"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="safety_stock"
                                id="safety_stock"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="Consumo"
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="safety_stock"
                                id="safety_stock"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="S.S."
                            />
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <input
                                name="reorder_point"
                                id="reorder_point"
                                type="text"
                                className="w-full bg-transparent focus:border-none focus:outline-none"
                                disabled={true}
                                placeholder="P.R."
                            />
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {payload && payload !== null && payload !== undefined && size(payload) > 0 ? payload.map((item, index) =>
                        <tr className="bg-white border-b  " key={index}>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.product?.sap}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.product?.name}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.product?.group_name}
                            </td>
                            <td className={`px-6 py-4 font-medium ${item?.quantity > item?.reorder_point ? 'text-green-400' : item?.quantity <= item?.reorder_point && item?.quantity >= item?.safety_stock ? 'text-yellow-500' : 'text-red-400'}  whitespace-nowrap hover:text-green-400 hover:cursor-pointer`}>
                                {Humanize.formatNumber(item?.quantity, 2)}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(parseInt(item?.quantity) + parseInt(item?.expected), 2)}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.expected, 2)}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {item?.product?.unit_of_measurement_name}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.price, 2)}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.price * item?.quantity, 2)}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.lead_time, 0)} días
                            </td>
                            <td className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.consumption_average, 2)}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.safety_stock, 2)}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer ">
                                {Humanize.formatNumber(item?.reorder_point, 2)}
                            </td>
                        </tr>) : <tr class="bg-white border-b  ">
                        <td colSpan={14}
                            className="px-6 py-4 text-center font-medium text-gray-400 whitespace-nowrap  ">
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
