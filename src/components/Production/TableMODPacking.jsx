import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";
import {useSelector} from "react-redux";


function changeFormat(decimal) {
    let horas = Math.floor(decimal);
    let minutosDecimal = (decimal - horas) * 60;
    let minutos = Math.floor(minutosDecimal);
    let segundos = Math.round((minutosDecimal - minutos) * 60);
    let result = horas.toString().padStart(2, "0") + ":" + minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
    return result;
}

const TableMODPacking = ({reference}) => {
    const data = useSelector(state => state.Production.mod)

    const columns = ['Kg pt', 'Fecha', 'CMO total consolidado envasado', 'CMO/Kg envasado', 'Productividad', 'N° personas envasado (dia)', 'N° personas envasado (noche)', 'Horas laboradas envasado (dia)', 'Horas laboradas envasado (noche)', 'CMO total envasado (día)', 'CMO total envasado (noche)', 'N° personas (extras 25%) envasado', 'N° horas (extras 25%) envasado', 'CMO (25%) envasado', 'N° personas (extras 35%) envasado', 'N° horas (extras 35%) envasado', 'CMO (35%) acondicionado', 'Total de horas envasado (dia)', 'Total de horas envasado (noche)',]


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
                            <td title={`Fecha: ${item?.date} \n Kg: ${Humanize.formatNumber(item?.process, 2)}`}

                                className="md:sticky cursor-pointer md:left-0 text-sm px-6 text-black font-bold  bg-white  text-center whitespace-nowrap  ">
                                {Humanize.formatNumber(item?.pt, 2)}
                            </td>

                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{new Date(item?.date).toLocaleDateString('es-ES', {
                                year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'
                            })}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-blue-800 font-bold  text-center ">
                                <p className={"bg-blue-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(parseFloat(item?.cmo_packing) + parseFloat(item?.cmo_packing_25) + parseFloat(item?.cmo_packing_35) + parseFloat(item?.cmo_night), 2)}</p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-green-800 font-bold leading-4 text-center ">
                                <p className={"bg-green-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber((parseFloat(item?.cmo_packing) + parseFloat(item?.cmo_packing_25) + parseFloat(item?.cmo_packing_35) + parseFloat(item?.cmo_night)) / parseFloat(item?.pt), 2)}
                                </p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-red-600 font-bold leading-4 text-center ">
                                <p className={"bg-red-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                {Humanize.formatNumber(item?.pt/parseFloat(item?.people_packing)/(parseFloat(item?.people_packing_hours)+parseFloat(item?.people_packing_25_hours)+parseFloat(item?.people_packing_35_hours)), 2)}
                                </p></td>


                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.people_packing, 0)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.people_night, 0)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{changeFormat(item?.people_packing_hours)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{changeFormat(item?.people_night_hours)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_packing, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_night, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.people_packing_25, 0)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{changeFormat(item?.people_packing_25_hours)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_packing_25, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.people_packing_35, 0)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{changeFormat(item?.people_packing_35_hours)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_packing_35, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{changeFormat(parseFloat(item?.people_packing_hours) + parseFloat(item?.people_packing_25_hours) + parseFloat(item?.people_packing_35_hours))}</td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">{changeFormat(item?.people_night_hours)}</td>


                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}


export default TableMODPacking;
