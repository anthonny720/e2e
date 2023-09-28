import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";
import {useSelector} from "react-redux";
import {Helmet} from "react-helmet";

function changeFormat(decimal) {
    let horas = Math.floor(decimal);
    let minutosDecimal = (decimal - horas) * 60;
    let minutos = Math.floor(minutosDecimal);
    let segundos = Math.round((minutosDecimal - minutos) * 60);
    let result = horas.toString().padStart(2, "0") + ":" + minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
    return result;
}

const TableBreak = ({reference}) => {
    const data = useSelector(state => state.Production.mod)

    const columns = ['Fecha', 'N° personas descanso/vacaciones', 'Horas descanso/vacaciones', 'CMO Descanso/Vacaciones']

    return (<div className="w-full">
        <Helmet>
            <title>Acondicionado</title>
        </Helmet>
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
                            <td className="text-sm bg-white  whitespace-no-wrap text-gray-800 font-normal leading-4 text-center ">{new Date(item?.date).toLocaleDateString('es-ES', {
                                year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'
                            })}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.people_rest, 0)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{changeFormat(item?.people_rest_hours)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.cmo_rest, 2)}</td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}


export default TableBreak;
