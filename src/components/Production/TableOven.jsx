import React from 'react';
import {map} from "lodash";
import {useSelector} from "react-redux";


const TableOven = ({reference}) => {


    const data = useSelector(state => state.Production.oven)

    const columns = ['Fecha', 'Materia Prima', 'Lote', 'Presentación', 'Maduración', 'Espesor', 'Horno', 'N° Coches', 'N° Bandejas', 'Kg habilitado (Reporte)', 'Peso bruto balanza', 'Tara', 'Kg habilitado Balanza', 'Diferencia', 'Peso * bandeja']

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
                            <td className=" md:sticky md:left-0 text-sm bg-white  whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{new Date(item?.date + "T00:00:00").toLocaleDateString('es-ES', {
                                year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'
                            })}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{item?.product}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.lot}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.presentation}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.maturation}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-yellow-800 font-bold  text-center ">
                                <p className={"bg-yellow-300 bg-opacity-60 rounded-lg w-full p-2"}>{item?.width}</p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.oven}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.cars}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.trays}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-blue-800 font-bold  text-center ">
                                <p className={"bg-blue-300 bg-opacity-60 rounded-lg w-full p-2"}>{item?.kg_enable}</p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.kg_brute_balance}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.tare}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-green-800 font-bold  text-center ">
                                <p className={"bg-green-300 bg-opacity-60 rounded-lg w-full p-2"}>{item?.kg_enable_balance}</p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.diff_enable}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.kg_trays}</td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);

};

export default TableOven;
