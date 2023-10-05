import React from 'react';
import {size} from "lodash";

const PeopleForm = ({data}) => {


    return (<table className="w-full text-sm text-left text-gray-500 overflow-y-auto scrollbar-hide">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
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
        {size(data) > 0 ? (data .map((contact) => (<tr className="bg-white border-b" key={contact.id}>
            <td className="px-6 py-4 font-light text-gray-900 whitespace-nowrap">
                <input
                    name="first_name"
                    id="first_name"
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={contact.first_name}
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
