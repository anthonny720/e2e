import React from 'react';
import {size} from "lodash";

const Recipe = ({data}) => {


    return (<table className="w-full text-sm text-left text-gray-500 overflow-y-auto scrollbar-hide">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
            <th scope="col" className="px-6 py-3">
                Material
            </th>
            <th scope="col" className="px-6 py-3">
                Pallet Standar
            </th>
            <th scope="col" className="px-6 py-3">
                Pallet Euro
            </th>
            <th scope="col" className="px-6 py-3">
                Carga suelta
            </th>
        </tr>
        </thead>
        <tbody className=" overflow-auto scrollbar-hide">
        {size(data) > 0 ? (data.map((item) => (<tr className="bg-white border-b" key={item.id}>
            <td className="px-6 py-4 font-light text-gray-900 whitespace-nowrap">
                <input
                    name="material_name"
                    id="material_name"
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={item?.material_name}
                    disabled
                    placeholder="Material"
                />
            </td>
            <td className="px-6 py-4 font-light text-gray-900 whitespace-nowrap">
                <input
                    name="quantity"
                    id="quantity"
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={item?.quantity}
                    disabled
                    placeholder="Cantidad"
                />
            </td>
            <td className="px-6 py-4 font-light text-gray-900 whitespace-nowrap">
                <input
                    name="quantity"
                    id="quantity"
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={item?.quantity_euro}
                    disabled
                    placeholder="Cantidad"
                />
            </td>
            <td className="px-6 py-4 font-light text-gray-900 whitespace-nowrap">
                <input
                    name="quantity"
                    id="quantity"
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={item?.quantity_loose}
                    disabled
                    placeholder="Cantidad"
                />
            </td>

        </tr>))) : (<tr>
            <td colSpan={6} className="text-center text-gray-400 py-4">
                No hay BOM
            </td>
        </tr>)}
        </tbody>
    </table>);
}


export default Recipe;
