import React, {Fragment} from 'react';
import {Menu, Popover, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon, InformationCircleIcon, PencilIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/outline";
import {map, size} from "lodash";
import Humanize from "humanize-plus";
import Skeleton from "react-loading-skeleton";
import {useNavigate} from "react-router-dom";

const Table = ({formData, onChange, payload, onDelete, onUpdate,reference}) => {
    const {name, group__name} = formData
    const navigate = useNavigate()

    return (<table className="w-full  text-sm text-left text-gray-500 " ref={reference}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
        <tr>
            <th scope="col" className="px-6 py-3">
                <input
                    name="name"
                    id="name"
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={name}
                    onChange={e => onChange(e)}
                    placeholder="Nombre"
                />

            </th>
            <th scope="col" className="px-6 py-3">
                <input
                    name={'group__name'}
                    id={'group__name'}
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={group__name}
                    onChange={e => onChange(e)}
                    placeholder="Categoría"
                />
            </th>
            <th scope="col" className="px-6 py-3">
                <input
                    name={'performance'}
                    id={'performance'}
                    type="text"
                    disabled={true}
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    placeholder="Rendimiento"
                />
            </th>
            <th scope="col" className="px-6 py-3">
                <input
                    name={'capacity'}
                    id={'capacity'}
                    type="text"
                    disabled={true}
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    placeholder="Capacidad"
                />
            </th>
            <th scope="col" className="px-6 py-3">
                <input
                    name={'um'}
                    id={'um'}
                    disabled={true}
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    placeholder="U.M."
                />
            </th>
        </tr>
        </thead>
        <tbody>
        {payload && payload !== null && payload !== undefined && size(payload) > 0 ? map(payload, (i, index) => <tr
            key={index} className="bg-white border-b ">
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
                            <Menu.Items
                                className="absolute bottom-2 mb-2 w-8  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-2 py-2 cursor-pointer">
                                    <Menu.Item>
                                        <PencilIcon title={"Editar"} onClick={() => onUpdate(i)}
                                                    className={'w-4 text-blue-400 '}/>
                                    </Menu.Item>

                                </div>
                                <div className="px-2 py-2  cursor-pointer">
                                    <Menu.Item>
                                        <TrashIcon onClick={() => onDelete(i?.id)} title={"Eliminar"}
                                                   className={'w-4 text-red-400 '}/>
                                    </Menu.Item>

                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <p className={"hover:text-green-400 hover:font-bold cursor-pointer"}
                       onClick={() => navigate(`/planning/products/${i?.slug}`,{state:i?.id})}>{i?.name}</p>
                </div>
            </td>

            <td className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {i?.group_name}
            </td>
            <td className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {Humanize.formatNumber(i?.performance, 2)}
            </td>
            <td className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {Humanize.formatNumber(i?.capacity, 2)}
            </td>
            <td className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap  flex gap-2">
                {i?.unit_of_measurement_name}
                <Popover className="relative">
                    {({open}) => (<>
                        <Popover.Button
                            className={`
                                            ${open ? '' : 'text-opacity-90'}`}
                        >
                            <InformationCircleIcon
                                className={`${open ? '' : 'text-opacity-70'}ml-2 h-5 w-5 text-blue-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}/>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute right-1/2 bottom-0  z-10 mt-3 max-w-xs  px-4 sm:px-0 lg:max-w-3xl">
                                <div
                                    className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="bg-gray-50 p-4">
                                                        <span
                                                            className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                                          <span className="flex items-center">
                                                            <span
                                                                className="text-sm font-medium text-gray-900">Información</span>
                                                          </span>
                                                            <span
                                                                className="block text-sm text-gray-500 overflow-x-auto scrollbar-hide">{i?.information}</span>
                                                        </span>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>)}
                </Popover>
            </td>


        </tr>) : <tr>
            <td><Skeleton count={5} className={'w-full '}/></td>
            <td><Skeleton count={5} className={'w-full '}/></td>
            <td><Skeleton count={5} className={'w-full '}/></td>
            <td><Skeleton count={5} className={'w-full '}/></td>
            <td><Skeleton count={5} className={'w-full '}/></td>
        </tr>}
        </tbody>
    </table>);
};

export default Table;
