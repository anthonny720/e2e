import React, {Fragment} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/24/solid";
import {EyeIcon, LinkIcon} from "@heroicons/react/24/outline";
import {map, size} from "lodash";
import Skeleton from "react-loading-skeleton";
import Humanize from "humanize-plus";
import {useNavigate} from "react-router-dom";

const Table = ({data, reference, formData, setFormData, date}) => {

    const navigate = useNavigate();


    const {sku, client_name, fcl_name, po_number, pfi_number, commercial_status} = formData

    const list = [{name: 'month', placeholder: 'Mes', disabled: true}, {
        name: 'year', placeholder: 'Año', disabled: true
    }, {
        name: 'commercial_status', placeholder: 'Gestión', onChange: e => onChange(e), value: commercial_status, disabled: false
    }, {
        name: 'client_name',
        value: client_name,
        placeholder: 'Cliente',
        disabled: false,
        onChange: e => onChange(e)
    }, {name: 'po_number', value: po_number, placeholder: '#Orden', onChange: e => onChange(e), disabled: false}, {
        name: 'pfi_number', value: pfi_number, placeholder: '# PFI', onChange: e => onChange(e), disabled: false
    }, {
        name: 'fcl_name',value:fcl_name, placeholder: 'FCL', onChange: e => onChange(e), disabled: false
    }, {name: 'sku', value: sku, placeholder: 'SKU', onChange: e => onChange(e), disabled: false}, {
        name: 'quantity', placeholder: 'Kg', disabled: true
    }, {name: 'raw_material', placeholder: 'MP', disabled: true}, {
        name: 'market', placeholder: 'Mercado', disabled: true
    },

        {name: 'start_date', placeholder: 'Inicio', disabled: true}, {
            name: 'finish_date', placeholder: 'Fin', disabled: true
        }, {
            name: 'shipping_date', placeholder: 'Envío', disabled: true
        }, {name: 'etd', placeholder: 'ETD', disabled: true}, {
            name: 'eta', placeholder: 'ETA', disabled: true
        }, {name: 'delivery', placeholder: 'Estatus', disabled: true},]
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    console.log(data)

        return (<div className="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
            <table className="w-full  text-sm text-left text-gray-500 " ref={reference}>
                <thead className="text-xs text-gray-700 whitespace-nowrap uppercase   overflow-x-scroll scrollbar-hide ">
                <tr>
                    {map(list, (item, index) => (<th scope="col" key={index}>
                        <input
                            name={item.name}
                            id={item.name}
                            type="text"
                            className="hover:text-green-400  text-center outline-none bg-transparent w-full"
                            value={item.value}
                            disabled={item.disabled}
                            onChange={item.onChange}
                            placeholder={item.placeholder}
                        />
                    </th>))}


                </tr>

                </thead>
                <tbody>
                {data && data !== null && data !== undefined && size(data) > 0 ? map(data, (i, index) =>
                    <tr className="bg-white border-b" key={index}>

                        <td className="pr-2 py-4 font-medium text-gray-900 whitespace-nowrap  overflow-x-scroll scrollbar-hide">
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
                                        className="absolute -bottom-6 mb-2 w-8  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                             <p className={"hover:text-green-400 cursor-pointer px-6 whitespace-nowrap"}>{i?.month}</p>
                        </div>
                    </td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap">{i?.year}</td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap ">{i?.commercial_status} %</td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap ">{i?.client_name} </td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap">
                        <a href={i?.drive} target='_blank' rel="noreferrer">{i?.po_number}</a>
                    </td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap">
                        <a href={i?.drive} target='_blank' rel="noreferrer">{i?.pfi_number}</a></td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap">{i?.fcl_name}</td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap ">{i?.sku}</td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap">{Humanize.formatNumber(i?.kg, 2)}</td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap">{Humanize.formatNumber(i?.mp, 2)}</td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap">{i?.market === 'N' ? 'Nacional' : 'Internacional'}</td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap">{i?.start_process ? new Date(i?.start_process + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    }) : 'Sin fecha'}</td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap">{i?.end_process ? new Date(i?.end_process + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    }) : 'Sin fecha'}</td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap">{i?.load_date ? new Date(i?.load_date + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    }) : 'Sin fecha'}</td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap">{i?.etd ? new Date(i?.etd + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    }) : 'Sin fecha'}</td>
                    <td className="hover:text-green-400 cursor-pointer px-6 whitespace-nowrap">{i?.eta ? new Date(i?.eta + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    }) : 'Sin fecha'}</td>
                    <td className={`hover:text-green-400 cursor-pointer px-6 whitespace-nowrap`}>
                        <p className={"font-bold"}>
                            {i?.status === 'TBT' ? 'Por etiquetar' : i?.status === 'TBD' ? 'Por despachar' : i?.status === 'TBP' ? 'Por procesar' : 'Procesado'}
                        </p>
                    </td>
                </tr>) : <tr className={"gap-4"}>
                <td className={"text-center py-4 px-2"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
                <td className={"text-center px-2 py-4"}><Skeleton count={5} height={20}/></td>
            </tr>}
            </tbody>
        </table>
    </div>);
};

export default Table;
