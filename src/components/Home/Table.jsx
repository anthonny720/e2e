import React, {useEffect, useState} from 'react';
import {debounce, map} from "lodash";
import Humanize from "humanize-plus";
import {EyeIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {get_lots} from "../../redux/actions/logistic";

const TableSummary = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({lot: ''});
    const {lot} = formData;

    const delayedDispatch = debounce(data => {
        dispatch(get_lots(data));
    }, 2000);

    useEffect(() => {
        delayedDispatch(formData);
        return delayedDispatch.cancel; // Cancela la función debounce cuando el componente se desmonta o el formulario cambia
    }, [formData]);

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };


    const data = useSelector(state => state.Logistic.lots)
    const columns = ['Fecha de descarga', 'Producto', 'Condición', 'Stock', 'Peso neto', 'Precio planta', 'Flete', 'Estiba', 'Kg pagados'];
    return (<div className="w-full">
        <div className="mx-auto container bg-white ">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white ">
                    <thead className="sticky top-0 bg-white">
                    <tr className="w-full h-16">
                        <th scope="col" className="px-2 py-3 w-max">
                            <input
                                name={'lot'}
                                id={'lot'}
                                type="text"
                                className="w-max text-sm leading-4 text-center text-gray-800 bg-transparent font-medium focus:border-none focus:outline-none"
                                value={lot}
                                onChange={e => onChange(e)}
                                placeholder="Lote"
                            />
                        </th>

                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className="text-gray-600  font-normal px-2 text-left text-sm tracking-normal leading-4 text-center">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {map(data, (value, index) => {
                        return (

                            <tr className="h-24 border-gray-300  border-b" key={index}>

                                <td className="text-sm px-2 font-medium hover:text-green-400 whitespace-no-wrap text-gray-800  tracking-normal leading-4 text-center">
                                    <div className={"flex gap-2 items-center w-full px-2"}>
                                        <a href={`/logistic/${value?.lot}`} target='_blank' rel="noreferrer">
                                            <EyeIcon
                                                className={"h-6 w-6 text-gray-400 hover:text-green-400 cursor-pointer"}/>

                                        </a>

                                        <p>{value?.lot}</p></div>
                                </td>


                                <td className="text-sm px-2 font-light whitespace-no-wrap text-gray-800  tracking-normal leading-4 text-center"> {new Date(value?.download_date).toLocaleDateString('es-PE', {
                                    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
                                })}
                                </td>
                                <td className="text-sm px-2 font-light whitespace-no-wrap text-gray-800  tracking-normal leading-4 text-center">{value?.category_name}</td>

                                <td className="text-sm px-2 font-light whitespace-no-wrap text-gray-800  tracking-normal leading-4 text-center">{value?.condition_name}</td>
                                <td className={`text-sm px-2 font-light whitespace-no-wrap text-gray-800  tracking-normal leading-4 text-center `}>
                                    <p className={`${value?.stock > 0 && 'bg-green-400 p-2 rounded-2xl text-white bg-opacity-60'}`}>{Humanize.formatNumber(value?.stock, 2)}</p>
                                </td>
                                <td className={`text-sm px-2 font-light  ${value?.net_weight > 0 ? 'text-black' : 'text-red-500 font-normal'} whitespace-nowrap text-gray-800  tracking-normal leading-4 text-center `}>{Humanize.formatNumber(value?.net_weight, 2)}</td>
                                <td className={`text-sm px-2 font-light  ${value?.price_final > 0 ? 'text-black' : 'text-red-500 font-normal'} whitespace-nowrap text-gray-800  tracking-normal leading-4 text-center `}>{Humanize.formatNumber((value?.price_final - value?.freight - value?.service_downloads) / value?.usable_weight, 2)}</td>
                                <td className={`text-sm px-2 font-light  ${value?.freight > 0 ? 'text-black' : 'text-red-500 font-normal'} whitespace-nowrap text-gray-800  tracking-normal leading-4 text-center `}>{Humanize.formatNumber(value?.freight, 2)}</td>
                                <td className={`text-sm px-2 font-light  ${value?.service_downloads > 0 ? 'text-black' : 'text-red-500 font-normal'} whitespace-nowrap text-gray-800  tracking-normal leading-4 text-center `}>{Humanize.formatNumber(value?.service_downloads, 2)}</td>
                                <td className={`text-sm px-2  font-light ${value?.net_weight > 0 ? 'text-black' : 'text-red-500 font-normal'} whitespace-no-wrap text-gray-800  tracking-normal leading-4 text-center `}>{Humanize.formatNumber(value?.usable_weight, 2)}</td>
                            </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TableSummary;
