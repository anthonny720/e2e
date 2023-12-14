import React, {Fragment} from 'react';
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/24/solid";
import {EyeIcon, LinkIcon} from "@heroicons/react/24/outline";
import {map, size, sumBy} from "lodash";
import Skeleton from "react-loading-skeleton";
import Humanize from "humanize-plus";
import {useNavigate} from "react-router-dom";
import {ChevronUpIcon} from '@heroicons/react/20/solid'
import {useDispatch} from "react-redux";
import {get_sales_order} from "../../../redux/actions/commercial";

const Table = ({data, reference}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const getDetail = (slug) => {
        dispatch(get_sales_order(slug));
    }


    const list = ['Mes', 'Año', 'Gestión', 'Cliente', '#Orden', '# PFI', 'FCL', 'SKU', 'Kg', 'MP', 'Mercado', 'Inicio', 'Fin', 'Envío', 'ETD', 'ETA', 'Estatus']

    return (<div className="relative overflow-x-auto scrollbar-hide  sm:rounded-lg  max-h-[450px] md:max-h-[550px]">
        <table className="w-full  text-xs text-gray-500 " ref={reference}>
            <thead className="whitespace-nowrap uppercase   overflow-x-scroll scrollbar-hide ">
            <tr>
                {map(list, (item, index) => (
                    <th scope="col" className="px-4 py-3 text-center text-gray-400" key={index}>
                        {item}

                    </th>))}


            </tr>

            </thead>
            <tbody>
            {data && data !== null && data !== undefined && size(data) > 0 ? map(data, (i, index) =>

                <tr className="bg-white border-b hover:bg-green-100 " key={index}>


                    <td className="py-1 font-normal text-black whitespace-nowrap  overflow-x-scroll scrollbar-hide">
                        <div className={"flex gap-2"}>

                            <Menu as="div" className="relative inline-block text-left z-[100]">
                                <div>
                                    <Menu.Button
                                        className="w-full justify-center rounded-md  text-sm font-medium ">

                                        <EllipsisVerticalIcon
                                            className="ml-2 -mr-1 h-5 w-5 text-gray-400 hover:text-violet-100"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="absolute top-0.5  w-max flex  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-2 py-1 cursor-pointer">
                                            <Menu.Item>
                                                <EyeIcon onClick={() => navigate(`/planning/sales/${i?.slug}`)}
                                                         title={"Ver"}
                                                         className={'w-4 text-blue-400 '}/>
                                            </Menu.Item>

                                        </div>
                                        <div className="px-2 py-1 cursor-pointer">
                                            <Menu.Item>
                                                <a href={i?.drive} target='_blank' rel="noreferrer">
                                                    <LinkIcon
                                                        title={"Drive"}
                                                        className={'w-4 text-blue-400 '}/>
                                                </a>
                                            </Menu.Item>

                                        </div>


                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <p className={"px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold "}>{i?.month}</p>
                        </div>
                    </td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold ">{i?.year}</td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold  ">{i?.commercial_status} %</td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold  ">{i?.client_name} </td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold ">
                        <a href={i?.drive} target='_blank' rel="noreferrer">{i?.po_number}</a>
                    </td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold ">
                        <a href={i?.drive} target='_blank' rel="noreferrer">{i?.pfi_number}</a></td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold ">{i?.fcl_name}</td>
                    <Disclosure>
                        {({open}) => (<>
                            <Disclosure.Button
                                className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-sm font-medium ">
                                <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold  ">{i?.sku}</td>
                                <ChevronUpIcon onClick={() => getDetail(i?.slug)}
                                               className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pb-2 pt-4 text-xs text-gray-500 font-normal">
                                {map(i?.recipe, (item, index) => (
                                    <div className={"grid grid-cols-3 gap-4 mb-0.5 text-center"} key={index}>
                                        <div className={"text-left"}>•{item?.name} </div>
                                        <div>{Humanize.formatNumber(item?.quantity * i?.kg, 5)} {item?.unit}</div>
                                        <div>S/{Humanize.formatNumber(item?.quantity * item?.price, 2)}</div>
                                    </div>))}

                                <div className={"text-center"}> Total: &nbsp;
                                    S/{Humanize.formatNumber(sumBy(i?.recipe, (item, index) => (item?.quantity * item?.price * i?.kg)), 2)}
                                </div>

                            </Disclosure.Panel>
                        </>)}
                    </Disclosure>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold ">{Humanize.formatNumber(i?.kg, 2)}</td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold ">{Humanize.formatNumber(i?.mp, 2)}</td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold ">{i?.market === 'N' ? 'Nacional' : 'Internacional'}</td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold ">{i?.start_process ? new Date(i?.start_process + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    }) : 'Sin fecha'}</td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold ">{i?.end_process ? new Date(i?.end_process + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    }) : 'Sin fecha'}</td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold ">{i?.load_date ? new Date(i?.load_date + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    }) : 'Sin fecha'}</td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold ">{i?.etd ? new Date(i?.etd + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    }) : 'Sin fecha'}</td>
                    <td className="px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold ">{i?.eta ? new Date(i?.eta + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    }) : 'Sin fecha'}</td>
                    <td className={`px-6  text-xs font-normal text-gray-900 whitespace-nowrap hover:text-green-400 hover:cursor-pointer hover:font-bold `}>
                        <p className={"font-bold"}>
                            {i?.status === 'TBT' ? 'Por etiquetar' : i?.status === 'TBD' ? 'Por despachar' : i?.status === 'TBP' ? 'Por procesar' : 'Procesado'}
                        </p>
                    </td>
                </tr>) : <tr className={"gap-4"}>
                <td className={"font-normal  px-2"}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
                <td className={"font-normal px-2 "}><Skeleton count={5} height={20}/></td>
            </tr>}
            </tbody>
        </table>
    </div>);
};

export default Table;
