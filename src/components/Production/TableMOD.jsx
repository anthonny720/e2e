import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";
import {useSelector} from "react-redux";

const TableMODConditioning = ({update, reference}) => {
    const data = useSelector(state => state.Production.mod)

    const columns = ['Kg proceso', 'Supervisor/Controller', 'Fecha', 'Semana', 'CMO total consolidado acondicionado', 'CMO/Kg acondicionado', 'Productividad', 'N° personas acondicionado (día)', 'N° personas acondicionado (noche)', 'Horas laboradas acondicionado (dia)', 'Horas laboradas acondicionado (noche)', 'CMO total acondicionado (dia)', 'CMO total acondicionado (noche)', 'N° personas (extras 25%) acondicionado', 'N° horas (extras 25%) acondicionado', 'CMO (25%) acondicionado', 'N° personas (extras 35%) acondicionado', 'N° horas (extras 35%) acondicionado', 'CMO (35%) acondicionado', 'Total de horas acondicionado',]

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

                            <td title={`Fecha: ${item?.date} \n Kg: ${Humanize.formatNumber(item?.total_process_kg, 2)}`}
                                onClick={() => update(item, 'conditioning')}
                                className="md:sticky cursor-pointer md:left-0 text-sm px-6 text-black font-bold  bg-white  text-center whitespace-nowrap  ">
                                {item?.total_process_kg}
                            </td>
                            <td className="text-sm p-2   p-2 whitespace-normal text-gray-800 font-bold  leading-4 text-center ">
                                <p className={"font-light"}>{item?.supervisor_name_conditioning}</p>
                                <span className={"text-xs whitespace-wrap"}>{item?.controller_name_conditioning}</span>
                            </td>
                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{new Date(item?.date + "T00:00:00").toLocaleDateString('es-ES', {
                                year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'
                            })}</td>
                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.week}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-blue-800 font-bold  text-center ">
                                <p className={"bg-blue-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.total_cost_conditioning, 2)}</p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold leading-4 text-center ">
                                <p className={"bg-green-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.cmo_kg_conditioning, 2)}
                                </p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-red-600 font-bold leading-4 text-center ">
                                <p className={"bg-red-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.productivity_conditioning, 2)}</p></td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.conditioning_people, 0)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.conditioning_people_night, 0)}</td>

                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.conditioning_hours}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.conditioning_hours_night}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_conditioning, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_conditioning_night, 2)}</td>

                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.conditioning_people_25, 0)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.conditioning_hours_25}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_conditioning_25, 2)}</td>


                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.conditioning_people_35, 0)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{item?.conditioning_hours_35}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_conditioning_35, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{item?.total_hours_conditioning}</td>

                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);

};

export default TableMODConditioning;
