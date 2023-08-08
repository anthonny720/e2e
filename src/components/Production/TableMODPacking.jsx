import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";
import {useSelector} from "react-redux";

const TableMODPacking = ({update,reference}) => {
    const data = useSelector(state => state.Production.mod)

    const columns = ['Kg pt','Supervisor/Controller', 'Fecha', 'Semana', 'CMO total consolidado envasado', 'CMO/Kg envasado', 'Productividad', 'N° personas envasado (dia)', 'N° personas envasado (noche)', 'Horas laboradas envasado (dia)', 'Horas laboradas envasado (noche)', 'CMO total envasado (día)', 'CMO total envasado (noche)', 'N° personas (extras 25%) envasado', 'N° horas (extras 25%) envasado', 'CMO (25%) envasado', 'N° personas (extras 35%) envasado', 'N° horas (extras 35%) envasado', 'CMO (35%) acondicionado', 'Total de horas envasado (dia)', 'Total de horas envasado (noche)',]


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
                            <td title={`Fecha: ${item?.date} \n Kg: ${Humanize.formatNumber(item?.total_process_kg,2)}`}
                                onClick={() => update(item, 'packing')}
                                className="md:sticky cursor-pointer md:left-0 text-sm px-6 text-black font-bold  bg-white  text-center whitespace-nowrap  ">
                                {Humanize.formatNumber(item?.total_kg,2)}
                            </td>
                            <td className="text-sm p-2   p-2 whitespace-normal text-gray-800 font-bold  leading-4 text-center ">
                                    <p className={"font-light"}>{item?.supervisor_name_packing}</p>
                                    <span className={"text-xs whitespace-wrap"}>{item?.controller_name_packing}</span>
                            </td>
                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{ new Date(item?.date).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    timeZone: 'UTC'
                                })}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.week}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-blue-800 font-bold  text-center ">
                                <p className={"bg-blue-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.total_cost_packing, 2)}</p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold leading-4 text-center ">
                                <p className={"bg-green-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.cmo_kg_packing, 2)}
                                </p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-red-600 font-bold leading-4 text-center ">
                                <p className={"bg-red-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.productivity_packing, 2)}</p></td>


                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.packing_people_day, 0)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.packing_people_night, 0)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.packing_hours_day}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.packing_hours_night}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_packing_day, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_packing_night, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.packing_people_25, 0)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.packing_hours_25}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_packing_25, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.packing_people_35, 0)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.packing_hours_35}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_packing_35, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{item?.total_hours_packing}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{item?.packing_hours_night}</td>


                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}


export default TableMODPacking;
