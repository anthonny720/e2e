import React from 'react';
import {map, maxBy} from "lodash";

const TableParcels = ({data, update, reference}) => {
    const latestObject = maxBy(data, 'updated_at');
    const columns = ['', 'Status', 'Parcela', 'Cultivo', 'Condición', 'Variedad', 'Muestra', 'Propietario', 'Area', 'Sector y zona', 'Coordenadas'];

    return (<div className="w-full">
        <div className="mx-auto container bg-white ">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white " ref={reference}>
                    <thead className="sticky top-0 bg-white  ">
                    <tr className={"text-xs text-black absolute left-0"}>
                        <td>
                            Última
                            actualización: {latestObject && new Date(latestObject?.updated_at).toLocaleDateString('es-PE', {
                            day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric"
                        })}
                        </td>
                    </tr>
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className=" text-gray-400  whitespace-nowrap  font-light  px-6  text-sm tracking-normal leading-4 text-center">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {map(data, (value, index) => {
                        return (<tr className="h-10 border-gray-300  border-b  " key={index}>
                            <td className="pl-8 pr-6 text-left p-2 whitespace-nowrap text-sm text-blue-400  tracking-normal leading-4 hover:text-blue-600">
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
                            </td>
                            <td className="text-xs  p-2 whitespace-nowrap text-gray-800 font-bold   leading-4 text-center ">
                                <span
                                    className={`${value?.status === 'P' ? 'bg-red-400' : 'bg-green-400'} text-white rounded-xl p-1 bg-opacity-60`}>
                                    {value?.status_name}
                                </span>
                            </td>
                            <td className="text-sm p-2   p-2 whitespace-normal text-gray-800 font-bold  leading-4 text-center ">
                                <a target="_blank" rel="noopener noreferrer" href={value?.documents}
                                   className={"cursor-pointer"}>
                                    <p className={"font-light"}>{value?.parcel}</p>
                                    <span className={"text-xs whitespace-wrap"}>{value?.provider_name}</span>
                                </a>
                            </td>
                            <td className="text-xs  p-2 whitespace-nowrap text-gray-800 font-light    leading-4 text-center ">
                                {value?.product_name}
                            </td>
                            <td className="text-xs  p-2 whitespace-nowrap text-gray-800 font-light   leading-4 text-center ">
                                {value?.type_mp_name}
                            </td>
                            <td className="text-xs  p-2 whitespace-nowrap text-gray-800 font-light   leading-4 text-center ">
                                {value?.variety}
                            </td>
                            <td className="text-xs  p-2 whitespace-nowrap text-gray-800 font-light   leading-4 text-center ">
                                {value?.type_sample_name}
                            </td>

                            <td className="text-xs  p-2 whitespace-nowrap text-gray-800 font-light    leading-4 text-center ">
                                {value?.property_name}
                            </td>
                            <td className="text-xs  p-2 whitespace-nowrap text-gray-800 font-light    leading-4 text-center ">
                                {value?.area}
                            </td>
                            <td className="text-xs  p-2 whitespace-nowrap text-gray-800 font-light   leading-4 text-center ">{value?.sector}</td>
                            <td title={`Parcela: ${value?.parcel}\nProveedor: ${value?.provider_name}`}
                                className="text-xs  p-2 whitespace-wrap text-gray-800 font-light   leading-4 text-center ">
                                <a href={`https://www.google.com/maps/search/?api=1&query=${value?.latitude},${value?.longitude}`}
                                   target="_blank" rel="noopener noreferrer">
                                    {value?.latitude},{value?.longitude} </a>
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}


export default TableParcels;
