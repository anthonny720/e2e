import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {PencilIcon} from '@heroicons/react/24/solid';
import {TrashIcon} from "@heroicons/react/24/outline";
import {size} from "lodash";
import {delete_recipe, update_recipe} from "../../../../redux/actions/operations";
import {MySwal} from "../../../util/colors";

const Recipe = ({data,id}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState([]);
    const [editingId, setEditingId] = useState('');


    useEffect(() => {
        setFormData(data);
    }, [data]);

    const onChange = (e, id) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => {
            const updatedRecipe = prevFormData.map((contact) => contact.id === id ? {
                ...contact, [name]: value
            } : contact);
            return updatedRecipe;
        });
    };

    const handleEdit = (id) => {
        setEditingId(id);
    };

    const handleSave = () => {
        const updatedRecipe = formData.find((item) => item.id === editingId);
        dispatch(update_recipe(editingId, updatedRecipe, id));
        setEditingId('');

    };

    const handleDelete = (id_item) => {
        MySwal.fire({
            title: '¿Desea eliminar este Item?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_recipe(id_item, id));
            }
        })
    };


    return (<table className="w-full text-sm text-left text-gray-500 overflow-y-auto scrollbar-hide">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
            <th scope="col" className="px-2 py-3"></th>
            <th scope="col" className="px-6 py-3">
                Material
            </th>
            <th scope="col" className="px-6 py-3">
                Cantidad
            </th>
        </tr>
        </thead>
        <tbody className=" overflow-auto scrollbar-hide">
        {size(formData) > 0 ? (formData.map((item) => (<tr className="bg-white border-b" key={item.id}>
            <td className="px-2 py-4 font-light text-gray-900 whitespace-nowrap">
                <div className={"flex gap-2"}>
                    {editingId === item.id ? (<button
                        className="edit-btn bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                        onClick={handleSave}
                    >
                        Guardar
                    </button>) : (<PencilIcon
                        className="w-4 cursor-pointer text-gray-500"
                        onClick={() => handleEdit(item.id)}
                    />)}
                    <TrashIcon className={"w-4 cursor-pointer text-red-400"} onClick={() => handleDelete(item.id)}/>
                </div>


            </td>

            <td className="px-6 py-4 font-light text-gray-900 whitespace-nowrap">
                <input
                    name="material_name"
                    id="material_name"
                    type="text"
                    className="w-full bg-transparent focus:border-none focus:outline-none"
                    value={item?.material_name}
                    disabled={true}
                    onChange={(e) => onChange(e, item?.id)}
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
                    disabled={editingId !== item?.id}
                    onChange={(e) => onChange(e, item?.id)}
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
