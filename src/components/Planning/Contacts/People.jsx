import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {PencilIcon} from '@heroicons/react/24/solid';
import {delete_contact, update_contact} from "../../../redux/actions/management";
import {MySwal} from "../../util/colors";
import {TrashIcon} from "@heroicons/react/24/outline";
import {size} from "lodash";

const PeopleForm = ({data, handleRefresh}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState([]);
    const [editingId, setEditingId] = useState('');

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const onChange = (e, id) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => {
            const updatedContacts = prevFormData.map((contact) => contact.id === id ? {
                ...contact, [name]: value
            } : contact);
            return updatedContacts;
        });
    };

    const handleEdit = (id) => {
        setEditingId(id);
    };

    const handleSave = () => {
        const updatedContact = formData.find((contact) => contact.id === editingId);
        dispatch(update_contact(editingId, updatedContact));
        handleRefresh();
        setEditingId('');

    };

    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este contacto?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_contact(id));
            }
        }).finally(() => handleRefresh());
    };


    return (<table className="w-full text-sm text-left text-gray-500 overflow-y-auto scrollbar-hide">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
                Nombre
            </th>
            <th scope="col" className="px-6 py-3">
                Apellidos
            </th>
            <th scope="col" className="px-6 py-3">
                Posición
            </th>
            <th scope="col" className="px-6 py-3">
                Email
            </th>
            <th scope="col" className="px-6 py-3">
                Telf
            </th>
        </tr>
        </thead>
        <tbody className="max-h-12 overflow-auto scrollbar-hide">
        {size(formData) > 0 ? (formData.map((contact) => (<tr className="bg-white border-b" key={contact.id}>
            <td className="px-6 py-4 font-light text-gray-900 whitespace-nowrap">
                <div className={"flex gap-2"}>
                    {editingId === contact.id ? (<button
                        className=" bg-blue-500 hover:bg-gray-700 text-white py-1 px-2 rounded"
                        onClick={handleSave}
                    >
                        Guardar
                    </button>) : (<PencilIcon
                        className="w-4 cursor-pointer text-gray-500"
                        onClick={() => handleEdit(contact.id)}
                    />)}
                    <TrashIcon className={"w-4 cursor-pointer text-red-400"} onClick={() => handleDelete(contact.id)}/>
                </div>


            </td>
            <td className="px-6 py-4 font-light text-gray-900 whitespace-nowrap">
                <input
                    name="first_name"
                    id="first_name"
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={contact.first_name}
                    disabled={editingId !== contact.id}
                    onChange={(e) => onChange(e, contact.id)}
                    placeholder="Nombre"
                />
            </td>
            <td className="px-6 py-4 font-light text-gray-900 whitespace-nowrap">
                <input
                    name="last_name"
                    id="last_name"
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={contact.last_name}
                    disabled={editingId !== contact.id}
                    onChange={(e) => onChange(e, contact.id)}
                    placeholder="Apellido"
                />
            </td>
            <td className="px-6 py-4 font-light text-gray-900 whitespace-nowrap">
                <input
                    name="position"
                    id="position"
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={contact.position}
                    disabled={editingId !== contact.id}
                    onChange={(e) => onChange(e, contact.id)}
                    placeholder="Posición"
                />
            </td>
            <td className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                <input
                    name="email"
                    id="email"
                    type="email"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={contact.email}
                    disabled={editingId !== contact.id}
                    onChange={(e) => onChange(e, contact.id)}
                    placeholder="Email"
                />
            </td>
            <td className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                <input
                    name="phone"
                    id="phone"
                    type="tel"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={contact.phone}
                    disabled={editingId !== contact.id}
                    onChange={(e) => onChange(e, contact.id)}
                    placeholder="Telf"
                />
            </td>
        </tr>))) : (<tr>
            <td colSpan={6} className="text-center text-gray-400 py-4">
                No hay contactos
            </td>
        </tr>)}
        </tbody>
    </table>);
}


export default PeopleForm;
