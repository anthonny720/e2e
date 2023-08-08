import React, {Fragment, useEffect} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon, EllipsisVerticalIcon, PencilIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/outline";
import {map, size} from "lodash";
import {useDispatch} from "react-redux";
import {get_sales_orders, update_sales_order} from "../../../redux/actions/operations";
import Skeleton from "react-loading-skeleton";
import Humanize from "humanize-plus";
import {useNavigate} from "react-router-dom";

const Table = ({data, handleEdit, handleDelete, reference, formData, setFormData,date}) => {

    const navigate = useNavigate();


    const {sku__name, customer__display_name, process_plant__display_name, order_id, quote_id, management} = formData

    const list = [{name: 'month', placeholder: 'Mes', disabled: true}, {
        name: 'year', placeholder: 'Año', disabled: true
    }, {
        name: 'management', placeholder: 'Gestión', onChange: e => onChange(e), value: management, disabled: false
    }, {
        name: 'customer__display_name',
        value: customer__display_name,
        placeholder: 'Cliente',
        disabled: false,
        onChange: e => onChange(e)
    }, {name: 'order_id', value: order_id, placeholder: '#Orden', onChange: e => onChange(e), disabled: false}, {
        name: 'quote_id', value: quote_id, placeholder: '# PFI', onChange: e => onChange(e), disabled: false
    }, {
        name: 'Full Container Load', placeholder: 'FCL', disabled: true
    }, {
        name: 'process_plant__display_name',
        value: process_plant__display_name,
        placeholder: 'Planta',
        onChange: e => onChange(e),
        disabled: false
    }, {name: 'sku__name', value: sku__name, placeholder: 'SKU', onChange: e => onChange(e), disabled: false}, {
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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_sales_orders(formData));
    }, [date,formData]);

    return (<div className="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400" ref={reference}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {map(list, (item, index) => (<th scope="col" className="px-6 py-3" key={index}>
                    <input
                        name={item.name}
                        id={item.name}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={item.value}
                        disabled={item.disabled}
                        onChange={item.onChange}
                        placeholder={item.placeholder}
                    />
                </th>))}


            </tr>

            </thead>
            <tbody>
            {data && data !== null && data !== undefined && size(data) > 0 ? map(data, (i, index) => <tr
                className="bg-white border-b
                 " key={index}>

                <td className="pr-2 py-4 font-medium text-gray-900 whitespace-nowrap ">
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
                                {i?.delivery !== 'delivered' ? <Menu.Items
                                    className="absolute bottom-2 mb-2 w-8  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-2 py-2 cursor-pointer">
                                        <Menu.Item>
                                            <PencilIcon onClick={() => handleEdit(i)} title={"Editar"}
                                                        className={'w-4 text-blue-400 '}/>
                                        </Menu.Item>

                                    </div>
                                    <div className="px-2 py-2  cursor-pointer">
                                        <Menu.Item>
                                            <TrashIcon onClick={() => handleDelete(i?.slug)} title={"Eliminar"}
                                                       className={'w-4 text-red-400 '}/>
                                        </Menu.Item>

                                    </div>

                                </Menu.Items> : <Menu.Items></Menu.Items>}
                            </Transition>
                        </Menu>
                        <p className={"hover:text-green-400 cursor-pointer"}>{i?.month_name}</p>
                    </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">{i?.year}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer  ">{i?.management} %</td>
                <td className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">{i?.customer_name} </td>
                <td className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">
                    <a href={i?.drive} target='_blank' rel="noreferrer">{i?.order_id}</a>
                </td>
                <td className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">
                    <a href={i?.drive} target='_blank' rel="noreferrer">{i?.quote_id}</a></td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">{i?.full_container_load_name}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">{i?.process_plant_name}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer"
                    onClick={() => navigate(`/planning/sales/${i?.slug}`)}>{i?.sku_name}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">{Humanize.formatNumber(i?.quantity, 2)}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">{Humanize.formatNumber(i?.raw_material, 2)}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">{i?.market === 'national' ? 'Nacional' : 'Internacional'}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">{i?.start_date ? new Date(i?.start_date + "T00:00:00").toLocaleDateString('es-PE', {
                    year: 'numeric', month: 'numeric', day: 'numeric'
                }) : 'Sin fecha'}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">{i?.finish_date ? new Date(i?.finish_date + "T00:00:00").toLocaleDateString('es-PE', {
                    year: 'numeric', month: 'numeric', day: 'numeric'
                }) : 'Sin fecha'}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">{i?.shipping_date ? new Date(i?.shipping_date + "T00:00:00").toLocaleDateString('es-PE', {
                    year: 'numeric', month: 'numeric', day: 'numeric'
                }) : 'Sin fecha'}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">{i?.etd ? new Date(i?.etd + "T00:00:00").toLocaleDateString('es-PE', {
                    year: 'numeric', month: 'numeric', day: 'numeric'
                }) : 'Sin fecha'}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">{i?.eta ? new Date(i?.eta + "T00:00:00").toLocaleDateString('es-PE', {
                    year: 'numeric', month: 'numeric', day: 'numeric'
                }) : 'Sin fecha'}</td>
                <td className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap  bg-gray-400 bg-opacity-30 ${i?.delivery !== 'delivered' && 'flex items-center justify-between'}`}>
                    <p className={"font-bold"}>
                        {i?.delivery === 'pending' ? 'Pendiente' : 'Finalizado'}
                    </p>
                    {i?.delivery !== 'delivered' && <Menu as="div" className="relative inline-block text-left z-[100]">
                        <div>
                            <Menu.Button
                                className="w-full justify-center rounded-md  text-sm font-medium ">
                                <ChevronDownIcon
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
                                className="absolute bottom-0 right-0  w-max  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-2   cursor-pointer hover:bg-green-100 hover:text-green-600">
                                    <Menu.Item>
                                        <button
                                            className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            <ChevronDownIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            Pendiente
                                        </button>

                                    </Menu.Item>

                                </div>
                                <div className="px-2   cursor-pointer hover:bg-green-100 hover:text-green-600">
                                    <Menu.Item>
                                        <button
                                            onClick={() => dispatch(update_sales_order({
                                                ...i,
                                                delivery: 'delivered'
                                            }, i?.slug))}
                                            className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            <ChevronDownIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            Finalizado
                                        </button>

                                    </Menu.Item>

                                </div>

                            </Menu.Items>
                        </Transition>
                    </Menu>}

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
