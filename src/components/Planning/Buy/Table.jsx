import React, {Fragment, useEffect, useState} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon, EllipsisVerticalIcon, PencilIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/outline";
import {map, size} from "lodash";
import {get_purchases} from "../../../redux/actions/operations";
import {useDispatch} from "react-redux";
import Skeleton from "react-loading-skeleton";
import {useNavigate} from "react-router-dom";

const Table = ({data, handleEdit, handleDelete,handleTransfer,reference,formData,setFormData,date}) => {
    const navigate = useNavigate()


    const {supplier__display_name, order_id, invoice_id, guide_number} = formData
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_purchases(formData));
    }, [date,formData]);

    return (<div className="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
        <table className="w-full  text-sm text-left text-gray-500 " ref={reference}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'supplier__display_name'}
                        id={'supplier__display_name'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={supplier__display_name}
                        onChange={e => onChange(e)}
                        placeholder="Proveedor"
                    />
                </th>

                <th scope="col" className="px-6 py-3">
                    <input
                        name={'order_id'}
                        id={'order_id'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={order_id}
                        onChange={e => onChange(e)}
                        placeholder="OC"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'order_date'}
                        id={'order_date'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        disabled
                        placeholder="Fecha OC"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'invoice_id'}
                        id={'invoice_id'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={invoice_id}
                        onChange={e => onChange(e)}
                        placeholder="Factura"
                    />
                </th>

                <th scope="col" className="px-6 py-3">
                    <input
                        name={'guide_number'}
                        id={'guide_number'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        value={guide_number}
                        onChange={e => onChange(e)}
                        placeholder="Guia"
                    />
                </th>


                <th scope="col" className="px-6 py-3">
                    <input
                        name={'shipment_date'}
                        id={'shipment_date'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        disabled
                        placeholder="Fecha de envío"
                    />
                </th>
                <th scope="col" className="px-6 py-3">
                    <input
                        name={'arrival_date'}
                        id={'arrival_date'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        disabled
                        placeholder="Fecha de llegada"
                    />
                </th>

                <th scope="col" className="px-6 py-3">
                    <input
                        name={'status'}
                        id={'status'}
                        type="text"
                        className="w-full bg-transparent focus:border-none focus:outline-none"
                        disabled
                        placeholder="Estado"
                    />
                </th>

            </tr>
            </thead>
            <tbody>
            {data && data !== null && data !== undefined && size(data) > 0 ? map(data, (i, index) => <tr
                className="bg-white border-b
                 ">

                <td className="pr-2 py-4 font-medium text-gray-900 whitespace-nowrap " key={index}>
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
                                {i?.status === 'pending' ? <Menu.Items
                                    className="absolute bottom-2 mb-2 w-8  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-2 py-2 cursor-pointer">
                                        <Menu.Item>
                                            <PencilIcon onClick={() => handleEdit(i)} title={"Editar"}
                                                        className={'w-4 text-blue-400 '}/>
                                        </Menu.Item>

                                    </div>
                                    <div className="px-2 py-2  cursor-pointer">
                                        <Menu.Item>
                                            <TrashIcon onClick={() => handleDelete(i?.id)} title={"Eliminar"}
                                                       className={'w-4 text-red-400 '}/>
                                        </Menu.Item>

                                    </div>
                                </Menu.Items> : <Menu.Items></Menu.Items>}
                            </Transition>
                        </Menu>
                        <p className={"hover:text-green-400 cursor-pointer"}>{i?.supplier_name}</p>
                    </div>


                </td>
                <td className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-green-400 cursor-pointer ">
                    <p onClick={()=>navigate(`/planning/purchases/${i?.id}`)}>{i?.order_id}</p>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  hover:text-green-400">
                    {new Date(i?.order_date + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    })}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  hover:text-green-400">
                    {i?.invoice_id}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  hover:text-green-400">
                    {i?.guide_number}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  hover:text-green-400">
                    {i?.shipment_date?new Date(i?.shipment_date + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    }):'Sin fecha'}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  hover:text-green-400">
                    {i?.arrival_date?new Date(i?.arrival_date + "T00:00:00").toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    }):'Sin fecha'}
                </td>

                <td className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap  bg-gray-400 bg-opacity-30 ${i?.status === 'pending' && 'flex items-center justify-between'}`}>
                    <p className={"font-bold"}>
                        {i?.status === 'pending' ? 'Pendiente' : 'Finalizado'}
                    </p>
                    {i?.status === 'pending' && <Menu as="div" className="relative inline-block text-left z-[100]">
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
                                        <button onClick={()=>handleTransfer(i?.id)}
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
            </tr>}


            </tbody>
        </table>
    </div>);
};

export default Table;
