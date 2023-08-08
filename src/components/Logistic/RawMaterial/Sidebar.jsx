import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBus,
    faCalendar,
    faGlobeAmericas,
    faInfo,
    faLock,
    faLockOpen,
    faMinimize,
    faPersonChalkboard,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {map, size} from "lodash";
import Humanize from "humanize-plus";
import {Cog6ToothIcon} from "@heroicons/react/20/solid";


const Information = ({data, handleReport, handleUpdate}) => {
    const output_items = useSelector(state => state.Logistic.summary_items)


    return (<div className=" w-full    px-4 overflow-x-hidden p-6">
            <div className="border rounded-lg shadow-lg pb-6 border-gray-200  bg-white ">
                <div
                    className="flex items-center border-b border-gray-200   justify-between px-6 py-3">
                    {data?.closed ? <FontAwesomeIcon className={"text-black"} icon={faLock}/> :
                        <FontAwesomeIcon className={"text-black"} icon={faLockOpen}/>}
                    <a href={data?.drive} target={'_blank'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={"w-6 cursor-pointer"}>
                            <path
                                d="M339 314.9L175.4 32h161.2l163.6 282.9H339zm-137.5 23.6L120.9 480h310.5L512 338.5H201.5zM154.1 67.4L0 338.5 80.6 480 237 208.8 154.1 67.4z"/>
                        </svg>
                    </a>


                    <p tabIndex="0"
                       className="focus:outline-none text-sm lg:text-xl font-semibold leading-tight text-gray-800  ">DETALLES</p>
                    <Cog6ToothIcon onClick={() => handleUpdate(data)} className={"text-black w-6 cursor-pointer"}/>
                </div>
                <div className="px-4 pt-6 h-max  ">
                    <table className="w-full whitespace-nowrap">
                        <tbody>
                        <tr className="flex flex-col">
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-gray-300 text-white   rounded-full  p-2.5">
                                        <FontAwesomeIcon icon={faInfo} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800  ">Lote</p>
                                        </div>
                                        <p className="text-sm text-gray-400">{data?.lot}</p>
                                        <div
                                            className="flex items-center animate-pulse justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-orange-400 text-white rounded-full p-2.5">
                                        <FontAwesomeIcon icon={faCalendar} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800  ">Fecha de
                                                ingreso-descarga: </p>
                                        </div>
                                        <p className="text-sm text-gray-400">{new Date(data?.entry_date).toLocaleDateString('es-PE', {
                                            timeZone: 'UTC',
                                        })}
                                            - {new Date(data?.download_date).toLocaleDateString('es-PE', {
                                                timeZone: 'UTC',
                                            })}</p>

                                        <div
                                            className="flex animate-pulse items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-purple-500 text-white  rounded-full p-2.5">
                                        <FontAwesomeIcon icon={faGlobeAmericas} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800  ">Parcela</p>
                                        </div>
                                        <p className="text-sm text-gray-400  whitespace-normal">{data?.parcels_name}</p>

                                        <div
                                            className="flex animate-pulse items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-amber-400 text-white   rounded-full p-2.5">
                                        <FontAwesomeIcon icon={faUsers} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800  ">Guia del
                                                proveedor</p>
                                        </div>
                                        <p className=" text-sm text-gray-400">{data?.provider_guide} - {data?.departure_date && new Date(data?.departure_date).toLocaleDateString('es-PE', {
                                            timeZone: 'UTC',
                                        })}</p>

                                        <div
                                            className="flex animate-pulse items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-sky-600 text-white rounded-full p-2.5">
                                        <FontAwesomeIcon icon={faBus} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800  ">Guia de
                                                transportista</p>

                                        </div>
                                        <p className="text-sm text-gray-400">{data?.carrier_guide}</p>

                                        <div
                                            className="flex animate-pulse items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-yellow-800 text-white  rounded-full p-2.5">
                                        <FontAwesomeIcon icon={faPersonChalkboard} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800  ">Proveedor</p>
                                        </div>
                                        <span
                                            className="text-sm text-gray-400 whitespace-normal">{data?.provider_name}</span>
                                        <div
                                            className="flex animate-pulse items-center justify-center px-1 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex items-center mt-2">
                                    <div className="bg-red-600 bg-opacity-80 text-white  rounded-full p-2.5">
                                        <FontAwesomeIcon icon={faMinimize} width="20"/>
                                    </div>
                                    <div className="pl-3">
                                        <div className="flex items-center text-sm leading-none">
                                            <p className="font-semibold text-gray-800  ">Salida a
                                                producción</p>
                                        </div>

                                        {size(output_items) > 0 && map(output_items, (item, index) => (
                                            <p key={index} onClick={() => handleReport(item?.date)}
                                               className="cursor-pointer hover:text-green-400 hover:font-bold text-xs text-gray-400 whitespace-normal ">{item.date} - {Humanize.formatNumber(item?.output, 2)} kg</p>
                                        ))}

                                        <div
                                            className="flex animate-pulse items-center justify-center px-1 py-1 mt-2 bg-green-100 rounded-full">
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default Information;
