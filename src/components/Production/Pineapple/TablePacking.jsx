import React from 'react';
import {map} from "lodash";
import Humanize from "humanize-plus";
import {useSelector} from "react-redux";
import {Helmet} from "react-helmet";

const TablePacking = ({reference}) => {
    const data = useSelector(state => state.Production.packing_process)


    const columns = ['Lote', 'Fecha proceso', 'Fecha envasado', 'Kg procesados', 'Corte', 'Cliente', 'Lote PT', 'Kg total', 'Kg neto', 'Venta local', 'Subproducto', 'Merma', 'Calidad', 'Agregado', 'Lotes agregados', 'Rendimiento', 'Humedad','Cajas', 'Bolsa','Bolsas adicionales' ]

    return (<div className="w-full">
        <Helmet>
            <title>Envasado</title>
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

                            <td title={`Fecha: ${item?.date} \n`}

                                className="md:sticky cursor-pointer md:left-0 text-sm px-6 text-black font-bold  bg-white  text-center whitespace-nowrap">
                                <div className={"flex items-center gap-4"}>
                                    <p>{item?.lot}</p>

                                </div>

                            </td>

                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{new Date(item?.date + "T00:00:00").toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'short', day: 'numeric', timeZone: 'America/Lima'
                            })}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">
                                {new Date(item?.date_packing + "T00:00:00").toLocaleDateString('es-PE', {
                                    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'America/Lima'
                                })}
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-no-wrap text-gray-800 font-bold leading-4 text-center ">
                                <p className={"bg-green-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.process, 2)}
                                </p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.cut}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.customer}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.lot_packing}</td>

                            <td className="text-sm bg-white px-6 whitespace-nowrap text-blue-800 font-bold leading-4 text-center ">
                                <p className={"bg-blue-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.pt_total, 2)}</p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-orange-800 font-bold leading-4 text-center ">
                                <p className={"bg-orange-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber(item?.pt_total - item?.pt_aggregated, 2)}</p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center "> {Humanize.formatNumber(item?.pt_local, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center "> {Humanize.formatNumber(item?.pt_subproduct, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center "> {Humanize.formatNumber(item?.pt_merma, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center "> {Humanize.formatNumber(item?.pt_quality, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center "> {Humanize.formatNumber(item?.pt_aggregated, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center "> {item?.lots_aggregated}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-orange-800 font-bold leading-4 text-center ">
                                <p className={"bg-orange-400 bg-opacity-60 rounded-lg w-full p-2"}>
                                    {Humanize.formatNumber((parseFloat(item?.pt_total) + parseFloat(item?.pt_subproduct) + parseFloat(item?.pt_quality) - parseFloat(item?.pt_aggregated)) / parseFloat(item?.process) * 100, 2)}</p>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center "> {Humanize.formatNumber(item?.humidity, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center "> {item?.boxes} und</td>

                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center "> {item?.bags} und</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center "> {item?.bags_extra} und</td>


                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TablePacking;
