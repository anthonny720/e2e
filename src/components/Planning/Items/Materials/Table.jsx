import React, {Fragment} from 'react';
import {map, size} from "lodash";
import {Popover, Transition} from "@headlessui/react";
import {InformationCircleIcon} from "@heroicons/react/24/solid";
import Humanize from "humanize-plus";
import Skeleton from "react-loading-skeleton";

const Table = ({payload, reference}) => {

    return (<table className="w-full  text-sm text-left text-gray-500 " ref={reference}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
        <tr>
            <th scope="col" className="px-6 py-3  text-center text-gray-400">
                SAP
            </th>
            <th scope="col" className="px-6 py-3  text-center text-gray-400">
                Nombre
            </th>
            <th scope="col" className="px-6 py-3  text-center text-gray-400">
                Grupo
            </th>

            <th scope="col" className="px-6 py-3  text-center text-gray-400">
                Precio
            </th>

            <th scope="col" className="px-6 py-3  text-center text-gray-400">
                U.M.
            </th>
        </tr>

        </thead>
        <tbody>
        {payload && payload !== null && payload !== undefined && size(payload) > 0 ? map(payload, (i, index) => <tr
            key={index} className="bg-white border-b ">
            <td className="text-center text-xs py-4  text-gray-900 whitespace-nowrap ">
                    {i?.sap}
            </td>
            <td className="text-start text-xs py-4  text-gray-900 whitespace-nowrap md:whitespace-wrap ">
                {i?.name}
            </td>
            <td className="text-center text-xs py-4  text-gray-900 whitespace-nowrap ">
                {i?.group_name}
            </td>
            <td className="text-center text-xs py-4  text-gray-900 whitespace-nowrap ">
                {Humanize.formatNumber(i?.price, 2)}
            </td>
            <td className="text-center text-xs py-4  text-gray-900 whitespace-nowrap  flex gap-2">
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
                                                                className="text-sm  text-gray-900">Información</span>
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
