import React from 'react';
import {map, round} from "lodash";
import Humanize from "humanize-plus";

const TableCosts = ({update, reference, data}) => {
    const cost_mp = (item) => round((parseFloat(item?.kg_processed) + parseFloat(item?.detriment)) * (parseFloat(item?.price_mp) + parseFloat(item?.freight) + parseFloat(item?.service_download)), 2)
    const cost_md = (item) => {
        const mp = cost_mp(item)
        return parseFloat(item?.cost_bags) + parseFloat(item?.cost_boxes) + parseFloat(item?.cost_materials) + parseFloat(cost_mp(item))
    }

    const cost_mod = (item) => parseFloat(item?.cost_mod_conditioning) + parseFloat(item?.cost_mod_packing)
    const cost_cif = (item) => parseFloat(item?.indirect_labor) + parseFloat(item?.consumables) + parseFloat(item?.glp) + parseFloat(item?.communications) + parseFloat(item?.laboratory) + parseFloat(item?.maintenance) + parseFloat(item?.rent) + parseFloat(item?.electricity) + parseFloat(item?.water) + parseFloat(item?.supplementary) + parseFloat(item?.depreciation)

    const md = (item) => round(cost_md(item) / item.kg_pt, 2)
    const mod = (item) => round(cost_mod(item) / item.kg_pt, 2)
    const cifv = (item) => round(item.glp / item.kg_pt, 2)

    const variable_unit_cost = (item) => round(md(item) + mod(item) + cifv(item), 2)
    const cost_fixed = (item) => round((cost_cif(item) - item.glp) / item.kg_pt, 2)

    const cost_production_unit = (item) => round(variable_unit_cost(item) + cost_fixed(item), 2)

    const contribution_margin = (item) => round(item.price_sale - (variable_unit_cost(item) / item?.exchange_rate), 2)


    const columns = ['Fecha / Lote', 'Sku', 'Cliente', 'FCL', 'Corte', 'Materia Prima', 'Variedad', 'Condición', 'Precio MP (kg)', 'Flete MP (kg)', 'Estiba (kg)', 'MP pagado (kg)', 'Merma MP (kg)', 'Ingreso MP Producción (kg)', '% Rendimiento', '% Humedad', 'Producción (kg)', '% Participación', 'MD (materiales directos)', 'Materia Prima', 'Envase', 'Empaque', 'Embalaje', 'MOD (mano de obra directa)', 'MOD Acondicionado', 'MOD Envasado', 'CIF (costos indirectos de fabricación)', 'Mano de Obra Indirecta', 'Consumibles', 'GLP', 'Comunicaciones', 'Servicio Laboratorio', 'Mantenimiento', 'Alquiler', 'Electricidad', 'Agua', 'Complementarios', 'Depreciación', 'COSTO VARIABLE UNITARIO', 'MD', 'MOD', 'CIF (Variable)', 'COSTO PRODUCCIÓN UNITARIO', 'Costo variable', 'Costo fijo', 'Margen de contribución', 'Precio Venta'];
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
                            <td title={`Fecha: ${item?.date} \n `}
                                className="md:sticky cursor-pointer md:left-0 text-sm px-6 text-black font-bold  bg-white  text-center whitespace-nowrap  ">
                                <div className={"flex items-center gap-2"}>

                                    <p onClick={() => {
                                        update(item)
                                    }}>{new Date(item?.date + "T00:00:00").toLocaleString('es-PE', {
                                        year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'America/Lima'
                                    })} &nbsp;&nbsp;&nbsp;&nbsp;  {item?.lot_name}</p>
                                </div>
                            </td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.sku_name}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.customer_name}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.fcl_name}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.cut_name}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.raw_material}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.variety}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{item?.condition === 'C' ? 'Convencional' : 'Orgánico'}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.price_mp, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.freight, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.service_download, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.mp, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.detriment, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.kg_processed, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.kg_pt / item?.kg_processed * 100, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.humidity, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.kg_pt, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.participation, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{Humanize.formatNumber(cost_md(item), 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{cost_mp(item)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.cost_bags, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.cost_boxes, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.cost_materials, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{cost_mod(item)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.cost_mod_conditioning, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.cost_mod_packing, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{cost_cif(item)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.indirect_labor, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.consumables, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.glp, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.communications, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.laboratory, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.maintenance, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.rent, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.electricity, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.water, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.supplementary, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{Humanize.formatNumber(item?.depreciation, 2)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{variable_unit_cost(item)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{md(item)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{mod(item)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{cifv(item)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-bold leading-4 text-center ">{cost_production_unit(item)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{variable_unit_cost(item)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">{cost_fixed(item)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">$ {contribution_margin(item)}</td>
                            <td className="text-sm bg-white px-6 whitespace-nowrap text-gray-800 font-normal leading-4 text-center ">$ {Humanize.formatNumber(item?.price_sale, 2)}</td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);

};

export default TableCosts;
