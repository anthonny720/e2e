import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";
import {useSelector} from "react-redux";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import {Helmet} from "react-helmet";

const TableProduction = ({update, reference, add_packing}) => {
    const data = useSelector(state => state.Production.process)

    const columns = ['Lote', 'Fecha', 'Proveedor', 'Kg logistica', 'Rechazo', '%Rechazo', 'Kg proceso', 'Brix','Corona', '%', 'Cáscara y tronco', '%', 'Pulpa', '%', 'Kg habilitado', '%']

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
                            <td title={`Fecha: ${item?.date} \n `}
                                className="md:sticky cursor-pointer md:left-0 text-sm px-6 text-black font-bold  bg-white  text-center whitespace-nowrap  ">
                                <div className={"flex items-center gap-2"}>
                                    <PlusCircleIcon className={"h-5 w-5 ml-2 text-green-300"}
                                                    onClick={() => add_packing(item)}/>
                                    <p onClick={() => {
                                        update(item)
                                    }}>{item?.lot}</p>
                                </div>

                            </td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{new Date(item?.date + "T00:00:00").toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'short', day: 'numeric', timeZone: 'America/Lima'
                            })}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.supplier}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-blue-800 font-bold leading-4 text-center ">
                                <p className={"bg-blue-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.kg_logistic, 2)}
                                </p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-red-600 font-bold leading-4 text-center ">
                                <p className={"bg-red-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.rejection, 2)}</p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-red-600 font-bold leading-4 text-center ">
                                <p className={"bg-red-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.percent_rejection, 2)}</p>
                            </td>

                            <td className="text-sm bg-white px-6 whitespace-nowrap text-green-600 font-bold leading-4 text-center ">
                                <p className={"bg-green-400 bg-opacity-60 rounded-lg w-full p-2"}>{Humanize.formatNumber(item?.processed_kg, 2)}</p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.brix, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.crown, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.percent_crown, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.shell_trunk, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.percent_shell_trunk, 2)}</td>

                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(item?.pulp, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.percent_pulp, 2)}</td>

                            <td className="text-sm bg-white px-6 whitespace-nowrap text-yellow-800 font-bold leading-4 text-center ">
                                <p className={"bg-yellow-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.kg_enabled, 2)}</p>
                            </td>

                            <td className="text-sm bg-white px-6 whitespace-nowrap text-yellow-800 font-normal leading-4 text-center ">
                                <p className={"bg-yellow-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.percent_enabled, 2)}</p>

                            </td>
                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}


export default TableProduction;
