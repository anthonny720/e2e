import React from 'react';
import {map} from 'lodash';
import Humanize from "humanize-plus";
import {TrashIcon} from "@heroicons/react/24/outline";

const TableData = ({data, update, remove, lot}) => {
    const columns = ['', 'N°', 'Ubicación', 'Peso  bruto', 'Peso  neto', 'Tara', 'Pallet', 'Jabas']
    const columns_2 = ['C6', 'C8', 'C10', 'C12', 'C14']
    return (<div className="overflow-auto scrollbar-hide w-full">
        <div className=" container bg-white ">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white ">
                    <thead className="sticky top-0 bg-white  ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className="text-gray-600 whitespace-nowrap px-4  font-normal text-center  text-sm tracking-normal leading-4 text-center">
                                {value}
                            </th>);
                        })}
                        {lot?.category_name === "Piña" && map(columns_2, (value, index) => {
                            return (<th key={index}
                                        className="text-gray-600 whitespace-nowrap px-4  font-normal text-center  text-sm tracking-normal leading-4 text-center">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {map(data, (value, index) => {
                        return (<tr className="h-12 border-gray-300  border-b" key={index}>
                            <td className="pl-2  text-left whitespace-nowrap px-4 text-sm text-blue-400  tracking-normal leading-4 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => update(value)}
                                     className="icon cursor-pointer icon-tabler icon-tabler-edit" width={20}
                                     height={20}
                                     viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
                                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
                                    <line x1={16} y1={5} x2={19} y2={8}/>
                                </svg>
                                <TrashIcon className={"icon cursor-pointer text-red-400"} width={20}
                                           onClick={() => remove(value?.id)}/>
                            </td>
                            <td className="text-sm text-center  whitespace-nowrap px-4 text-gray-800  tracking-normal leading-4 ">{value?.number}</td>
                            <td className="text-sm text-center  whitespace-nowrap px-4 text-gray-800  tracking-normal leading-4">{value?.location_name}</td>

                            <td className="text-sm text-center  whitespace-nowrap px-4 text-gray-800  tracking-normal leading-4">{Humanize.formatNumber(value?.weight, 2)}</td>
                            <td className="text-sm text-center  whitespace-nowrap px-4 text-gray-800  tracking-normal leading-4">{Humanize.formatNumber(value?.net_weight, 2)}</td>
                            <td className="text-sm text-center  whitespace-nowrap px-4 text-gray-800  tracking-normal leading-4">{Humanize.formatNumber(value?.tare, 2)}</td>
                            <td className="text-sm text-center  whitespace-nowrap px-4 text-gray-800  tracking-normal leading-4">{value?.pallet_name}</td>

                            <td className="text-sm text-center  whitespace-nowrap px-4 text-gray-800  tracking-normal leading-4">{value?.boxes}</td>


                            {lot?.category_name === "Piña" && <>
                                <td className="text-sm text-center  whitespace-nowrap px-4 text-gray-800  tracking-normal leading-4">{value?.c6}</td>
                                <td className="text-sm text-center  whitespace-nowrap px-4 text-gray-800  tracking-normal leading-4">{value?.c8}</td>
                                <td className="text-sm text-center  whitespace-nowrap px-4 text-gray-800  tracking-normal leading-4">{value?.c10}</td>
                                <td className="text-sm text-center  whitespace-nowrap px-4 text-gray-800  tracking-normal leading-4">{value?.c12}</td>
                                <td className="text-sm text-center  whitespace-nowrap px-4 text-gray-800  tracking-normal leading-4">{value?.c14}</td>
                            </>}

                        </tr>)
                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableData;
