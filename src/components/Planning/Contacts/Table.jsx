import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Menu, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon, PencilIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/outline";
import {map, size} from "lodash";
import {useDispatch} from "react-redux";
import {MySwal} from "../../util/colors";

const Table = ({data, onLoad, onRemove, path,reference}) => {

    const onDelete = (slug) => {
        MySwal.fire({
            title: '¿Desea eliminar este contacto?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(onRemove(slug, formData))
            }
        })
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        display_name: '', email: '', phone: '',
    })

    const {display_name, email, phone} = formData

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        dispatch(onLoad(formData))
    }, [formData])


    return (<table className="w-full text-sm text-left text-gray-500" ref={reference}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
        <tr>
            <th scope="col" className="px-6 py-3">
                <input
                    name="display_name"
                    id="display_name"
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={display_name}
                    onChange={e => onChange(e)}
                    placeholder="Nombre"
                />

            </th>
            <th scope="col" className="px-6 py-3">
                <input
                    name={'email'}
                    id={'email'}
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={email}
                    onChange={e => onChange(e)}
                    placeholder="Email"
                />
            </th>
            <th scope="col" className="px-6 py-3">
                <input
                    name={'phone'}
                    id={'phone'}
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={phone}
                    onChange={e => onChange(e)}
                    placeholder="Telf."
                />
            </th>
        </tr>

        </thead>
        <tbody>
        {data && data !== null && data !== undefined && size(data) > 0 ? map(data, (i, index) =>
            <tr
            className="bg-white border-b" key={index}>
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
                                        <PencilIcon onClick={() => navigate(`/planning/contacts/${path}/${i?.slug}`)}
                                                    title={"Editar"} className={'w-4 text-blue-400 '}/>
                                    </Menu.Item>

                                </div>
                                <div className="px-2 py-2  cursor-pointer">
                                    <Menu.Item>
                                        <TrashIcon onClick={() => onDelete(i?.slug)} title={"Eliminar"}
                                                   className={'w-4 text-red-400 '}/>
                                    </Menu.Item>

                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <p>{i.display_name}</p>
                </div>
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {i?.email}
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {i?.phone}
            </td>

        </tr>) : <tr>
            <td colSpan={3} className={"text-center text-gray-400 py-4"}>No hay datos</td>
        </tr>

        }

        </tbody>
    </table>);
};

export default Table;
