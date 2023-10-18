import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";
import {useSelector} from "react-redux";


const TableMOD = ({reference}) => {


    const data = useSelector(state => state.Production.mod)

    const columns = ['Fecha', 'Producto', 'Kg proceso', 'Kg Pt','CMO Acondicionado','CMO Envasado', 'CMO Total', 'CMO Descanso Operario', 'CMO Noche Operario', 'CMO Dia Operario', 'CMO Operario', 'CMO Descanso Supervisor', 'CMO Día Supervisor', 'CMO Supervisor', 'CMO Descanso Controller', 'CMO Noche Controller', 'CMO Dia Controller', 'CMO Controller']

    return (<div className="w-full">
        <div className="mx-auto container bg-white ">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">

                <table className="min-w-full bg-white " ref={reference}>

                    <thead className="sticky top-0 bg-white  ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className=" text-gray-400  font-light  px-6 text-left text-sm tracking-normal whitespace-nowrap leading-4 text-center font-light">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {data && map(data, (item, index) => {
                        return (<tr className="h-12 border-gray-300  border-b " key={index}>
                            <td className=" md:sticky md:left-0 text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{new Date(item?.date + "T00:00:00").toLocaleDateString('es-ES', {
                                year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'
                            })}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{item?.product}</td>

                            <td
                                className=" text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold  text-center">
                                {Humanize.formatNumber(item?.process, 2)}
                            </td>
                            <td
                                className=" text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold  text-center">
                                {Humanize.formatNumber(item?.pt, 2)}
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-cyan-800 font-bold  text-center ">
                                 <p className={"bg-cyan-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.cmo_conditioning, 2)}</p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-orange-800 font-bold  text-center ">
                                <p className={"bg-orange-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.cmo_packing, 2)}</p>
                            </td>

                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold  text-center ">
                                <p className={"bg-green-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(parseFloat(item?.worker_rest_day_cost) + parseFloat(item?.worker_night_shift_cost) + parseFloat(item?.worker_day_shift_cost) + parseFloat(item?.supervisor_rest_day_cost) + parseFloat(item?.supervisor_day_shift_cost) + parseFloat(item?.controller_rest_day_cost) + parseFloat(item?.controller_night_shift_cost) + parseFloat(item?.controller_day_shift_cost), 2)}</p>
                            </td>
                            <td
                                className=" text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold  text-center">
                                {Humanize.formatNumber(item?.worker_rest_day_cost, 2)}
                            </td>
                            <td
                                className=" text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold  text-center">
                                {Humanize.formatNumber(item?.worker_night_shift_cost, 2)}
                            </td>
                            <td
                                className=" text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold  text-center">
                                {Humanize.formatNumber(item?.worker_day_shift_cost, 2)}
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-red-800 font-bold  text-center ">
                                <p className={"bg-red-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(parseFloat(item?.worker_rest_day_cost) + parseFloat(item?.worker_night_shift_cost) + parseFloat(item?.worker_day_shift_cost), 2)}</p>
                            </td>
                            <td
                                className=" text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold  text-center">
                                {Humanize.formatNumber(item?.supervisor_rest_day_cost, 2)}
                            </td>
                            <td
                                className=" text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold  text-center">
                                {Humanize.formatNumber(item?.supervisor_day_shift_cost, 2)}
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-yellow-800 font-bold  text-center ">
                                <p className={"bg-yellow-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(parseFloat(item?.supervisor_rest_day_cost) + parseFloat(item?.supervisor_day_shift_cost), 2)}</p>
                            </td>
                            <td
                                className=" text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold  text-center">
                                {Humanize.formatNumber(item?.controller_rest_day_cost, 2)}
                            </td>
                            <td
                                className="text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold  text-center">
                                {Humanize.formatNumber(item?.controller_night_shift_cost, 2)}
                            </td>
                            <td
                                className=" text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold  text-center">
                                {Humanize.formatNumber(item?.controller_day_shift_cost, 2)}
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-blue-800 font-bold  text-center ">
                                <p className={"bg-blue-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(parseFloat(item?.controller_rest_day_cost) + parseFloat(item?.controller_night_shift_cost) + parseFloat(item?.controller_day_shift_cost), 2)}</p>
                            </td>


                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);

};

export default TableMOD;
