import React, {useEffect} from 'react';
import {map, sumBy} from "lodash";
import Humanize from "humanize-plus";

const TableHistoryMP = ({data, reference}) => {


    const columns = ['Semana', 'Mes', 'Año', 'Lote', 'Planta', 'Fecha de salida Campo', 'Fecha de entrada', 'Fecha de descarga', 'Variedad', 'Condicion', 'Transporte', 'Guia de transportista', 'Guia de proveedor', 'Factura', 'Proveedor', 'Procedencia', 'Parcela', 'Promedio jabas', 'Cantidad de jabas', 'Peso bruto', 'Tara', 'Peso neto', 'Peso guia', 'Diferencia netos con guia', '% Rechazo', 'Kg rechazados', 'Kg aprovechables', '% Descuento S/', 'Descuento S/', 'Precio Campo',  'Precio planta', 'Flete', 'Flete/kg','Estiba/kg', 'Total a pagar planta']

    const get_kg_usable = (item) => {
        try {
            return parseFloat(item?.net_weight) * (1 - parseFloat(item?.discount / 100))
        } catch (e) {
            return 0
        }
    }


    const get_freight_unit = (item) => {
        try {
            const result = parseFloat(item?.freight) / parseFloat(item?.net_weight)
            if (isNaN(result)) {
                return 0
            }
            return result
        } catch (e) {
            return 0
        }
    }




    return (<div className="w-full">
        <div className="mx-auto container bg-white ">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white " ref={reference}>

                    <thead className="sticky top-0 bg-white  ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className=" text-gray-400  font-light  px-6 text-left text-sm tracking-normal leading-4 text-center font-light whitespace-nowrap">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.map((item, index) => {
                        return (<tr className="h-12 border-gray-300  border-b " key={index}>
                            <td className="text-sm whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.week}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.month}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.year}</td>
                            <td className="text-xs  whitespace-nowrap text-gray-800 leading-4 text-center font-bold hover:text-green-400 cursor-pointer">{item?.lot}</td>
                            <td className="text-sm px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.business_maquila_name}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{new Date(item?.departure_date).toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',

                                hour12: true
                            })}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{new Date(item?.entry_date).toLocaleDateString('es-PE', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })}</td>
                            <td className="text-sm  whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{new Date(item?.download_date + "T00:00:00-05:00").toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'numeric', day: 'numeric'
                            })}</td>
                            <td className="text-sm px-4 px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.variety}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.condition_name}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.transport_name}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.carrier_guide}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.provider_guide}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.invoice}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.provider_name}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.origin}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{item?.parcels_name}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.avg_box, 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.quantity_boxes, 0)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.brute_weight, 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.total_tare, 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.net_weight, 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.guide_weight, 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.difference_kg, 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.discount, 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.discount_net_kg, 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(get_kg_usable(item), 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.discount_price, 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.discount_price_soles, 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.price_camp, 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber((item?.price_final / item?.net_weight) ||0, 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.freight , 2)}</td>
                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(get_freight_unit(item), 2)}</td>
                                                        <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.service_downloads , 3)}</td>

                            <td className="text-sm  px-4 whitespace-nowrap text-gray-800 leading-4 text-center font-light ">{Humanize.formatNumber(item?.price_final, 2)}</td>


                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableHistoryMP;
