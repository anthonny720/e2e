import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";
import {TrashIcon} from "@heroicons/react/24/outline";

const TableStock = ({data, remove}) => {


    const columns = [' ', 'Fecha', 'Lote', 'Kg', 'Destino']

    return (<div className="w-full">

        <div className="mx-auto container bg-white ">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white ">
                    <thead className="sticky top-0 bg-white  ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className=" text-gray-400  font-light  pr-6 text-left text-sm tracking-normal leading-4 text-center">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {data && map(data, (item, index) => {
                        return (<tr className="h-14 sm:h-8 border-gray-300  border-b" key={index}>
                            <td className=" text-center whitespace-no-wrap text-sm text-gray-800  tracking-normal leading-4">
                                <TrashIcon className="w-6 text-red-400 cursor-pointer"
                                           onClick={() => remove(item?.id)}/>
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 font-light  font-light leading-4 text-center ">
                                {new Date(item?.date + "T00:00:00-05:00").toLocaleDateString('es-PE', {
                                    year: "numeric", month: "short", day: "numeric"
                                })}
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 font-bold   leading-4 text-center ">
                                {item?.lot_name}
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 font-light  font-light leading-4 text-center ">
                                {Humanize.formatNumber(item?.kg, 2)}
                            </td>
                            <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 font-light   leading-4 text-center ">
                                {item?.destine === 'M' ? 'Merma' : 'Producción'}
                            </td>
                        </tr>)
                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableStock;
