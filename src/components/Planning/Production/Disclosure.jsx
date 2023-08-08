import React, {Fragment} from 'react';
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {ChevronUpIcon} from '@heroicons/react/20/solid'
import {map, size} from "lodash";
import Humanize from "humanize-plus";
import {EllipsisVerticalIcon, PencilIcon, PlusCircleIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/outline";

const DisclosurePlanning = ({
                                data, handleAdd, handleUpdate, handleDelete
                            }) => {

    const headerTitle = ['Producción', 'Envasado', 'KG MP', 'PT ESPERADO', 'INV INICIAL', 'INV FINAL', 'FALTANTE', 'SOBRANTE', 'PROCESO']

    return (<div className="w-full px-4  flex flex-col gap-2">
        ´{data && data !== undefined && data !== null && size(data) > 0 && map(data, (item, index) => (
        <Disclosure key={index}>
            {({open}) => (<>
                <Disclosure.Button
                    className={`flex w-full justify-between rounded-lg ${!open ? 'bg-gray-200' : 'bg-green-200 '} px-4 py-2 text-left text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75`}>
                    <span>{item?.customer} - {item?.full_container_load_name} - {item?.sku}</span>
                    <ChevronUpIcon
                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-white`}
                    />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 bg-white relative rounded-sm">
                    <PlusCircleIcon onClick={() => handleAdd(item)}
                                    className={"w-8 text-green-400 bg-white rounded-full cursor-pointer -top-1 -left-1   absolute z-[100]"}/>

                    <div className="relative overflow-x-auto scrollbar-hide ">

                        <table className="w-full text-sm text-left text-gray-500 ">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50  ">

                            <tr>
                                {map(headerTitle, (item, index) => (<th scope="col" className="px-2 py-3" key={index}>
                                    {item}
                                </th>))}
                            </tr>
                            </thead>
                            <tbody>
                            {map(item?.planning, (i, index) => (<tr className="bg-white border-b" key={index}>
                                <th scope="row"
                                    className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <div className={"flex gap-2"}>

                                        <Menu as="div" className="relative inline-block text-left z-[100]">
                                            <div>
                                                <Menu.Button
                                                    className="w-full justify-center rounded-md  text-sm font-medium ">

                                                    <EllipsisVerticalIcon
                                                        className="h-5 w-5 text-gray-400 hover:text-violet-100"
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
                                                    className="absolute bottom-2 mb-2 w-8  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="px-2 py-2 cursor-pointer">
                                                        <Menu.Item>
                                                            <PencilIcon onClick={() => handleUpdate(i, item?.id)}
                                                                        title={"Editar"}
                                                                        className={'w-4 text-blue-400 '}/>
                                                        </Menu.Item>

                                                    </div>
                                                    <div className="px-2 py-2  cursor-pointer">
                                                        <Menu.Item>
                                                            <TrashIcon onClick={() => handleDelete(i?.id)}
                                                                       title={"Eliminar"}
                                                                       className={'w-4 text-red-400 '}/>
                                                        </Menu.Item>

                                                    </div>

                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                        <p className={"hover:text-green-400 cursor-pointer"}>{new Date(i?.date + "T00:00:00").toLocaleDateString('es-PE', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}</p>
                                    </div>
                                </th>

                                <td className="px-2 py-4 whitespace-nowrap">
                                    {new Date(i?.date + "T24:00:00").toLocaleDateString('es-PE', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </td>
                                <td className="px-2 py-4">
                                    {Humanize.formatNumber(i?.raw_material, 2)}
                                </td>
                                <td className="px-2 py-4">
                                    {Humanize.formatNumber(i?.expected, 2)}
                                </td>
                                <td className="px-2 py-4">
                                    {Humanize.formatNumber(i?.stock_start, 2)}
                                </td>
                                <td className="px-2 py-4">
                                    {Humanize.formatNumber(i?.stock_end, 2)}
                                </td>
                                <td className="px-2 py-4">
                                    {Humanize.formatNumber(i?.missing, 2)}
                                </td>
                                <td className="px-2 py-4">
                                    {Humanize.formatNumber(i?.surplus, 2)}
                                </td>
                                <td className="px-2 py-4">
                                    {i?.process_plant_name}
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                    </div>

                </Disclosure.Panel>
            </>)}
        </Disclosure>))}

    </div>);
};

export default DisclosurePlanning;
