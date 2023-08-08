import React, {useEffect} from 'react';
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {get_analysis} from "../../redux/actions/quality";
import Humanize from "humanize-plus";

const TablePineapple = ({update, reference,params}) => {
    const data = useSelector(state => state.Quality.analysis)


    const dispatch = useDispatch();

    useEffect(() => {
        const data={
            'start_date' : params ? new Date(params?.[0]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : '',
            'end_date' : params ? new Date(params?.[1]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : ''
        }
        dispatch(get_analysis('pineapple',data))
    }, [params]);

    const RandomColoredText = ({text}) => {
        return <p className={'bg-green-400 bg-opacity-20 p-2 text-md  rounded-md'}>{text}</p>;
    };


    const columns = [' ', 'Semana', 'Fecha de Ingreso', 'Lote', 'Maduración 0 %', 'Maduración 1 %', 'Maduración 2 %', 'Maduración 3 %', 'Maduración 4 %', 'Maduración 5 %', 'Maduración total %', 'Calibre 6 %', 'Calibre 8 %', 'Calibre 10 %', 'Calibre 12 %', 'Calibre 14 %']

    return (<div className="w-full">

        <div className="mx-auto container bg-white ">
            <div className="w-full overflow-x-scroll scrollbar-hide max-h-96">
                <table className="min-w-full bg-white " ref={reference}>
                    <thead className="sticky top-0 bg-white  ">
                    <tr className="w-full h-16">
                        {map(columns, (value, index) => {
                            return (<th key={index}
                                        className=" text-gray-400  font-light  px-4 text-left text-sm tracking-normal leading-4 text-center whitespace-nowrap">
                                {value}
                            </th>);
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.map((item, index) => {
                        return (<tr className="h-16 border-gray-300  border-b " key={index}>
                            <td className="  text-left whitespace-nowrap px-4 text-sm text-blue-400  tracking-normal leading-4 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => update(item)}
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
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light   leading-4 text-center ">{item?.week}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light   leading-4 text-center ">{new Date(item?.entry_date).toLocaleDateString('es-PE', {
                                year: "numeric", month: "numeric", day: "numeric", timeZone: "America/Lima"
                            })}</td>

                            <td className="text-sm  whitespace-no-wrap text-gray-800 font-bold   leading-4 text-center ">
                                <RandomColoredText text={item?.lot_name}/>
                            </td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light  text-center">{item?.maturation_0_plant}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light  text-center">{item?.maturation_1_plant}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light  text-center">{item?.maturation_2_plant}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light  text-center">{item?.maturation_3_plant}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light  text-center">{item?.maturation_4_plant}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light  text-center">{item?.maturation_5_plant}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light  text-center">{item?.maturation_total}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light  text-center">{Humanize.formatNumber(item?.calibers?.c6, 2)}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light  text-center">{Humanize.formatNumber(item?.calibers?.c8, 2)}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light  text-center">{Humanize.formatNumber(item?.calibers?.c10, 2)}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light  text-center">{Humanize.formatNumber(item?.calibers?.c12, 2)}</td>
                            <td className="text-sm px-6 whitespace-no-wrap text-gray-800 font-light  text-center">{Humanize.formatNumber(item?.calibers?.c14, 2)}</td>


                        </tr>)

                    })}


                    </tbody>
                </table>
            </div>
        </div>
    </div>);
};

export default TablePineapple;
