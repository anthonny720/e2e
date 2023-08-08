import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map, size} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {TailSpin} from "react-loader-spinner";
import {add_purchase_item, update_purchase_item} from "../../../redux/actions/operations";

const FormMaterial = ({close, data, materials, id}) => {

    const dispatch = useDispatch();
    const loading = useSelector(state => state.Operations.loading_purchase)
    const columns = [{name: 'quantity', title: 'Cantidad ', type: 'text', maxLength: 5}, {
        name: 'price_per_unit', title: 'Precio unitario', type: 'text', maxLength: 8
    }]

    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            form.purchase= id
            data ? dispatch(update_purchase_item(form, data?.id, id)) : dispatch(add_purchase_item(form, id))
            close()
        }
    })
    return <div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
            {materials && size(materials) > 0 && <div>
                <p className={`${formik.errors.material && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Materiales</p>
                <select onChange={(value) => formik.setFieldValue('material', value.target.value)}
                        defaultValue={formik.values.material}
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                        aria-label="Default select example">
                    <option value={undefined}>Seleccione un producto</option>
                    {map(materials, (item, index) => <option key={index}
                                                             value={item.id}>{item?.name}</option>)}
                </select>
            </div>}
            <div className={"grid grid-cols-2 gap-2 justify-center"}>

                {map(columns, (column, index) => <div key={index}>
                    <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>{column.title}</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>)}


            </div>


            <div className="w-full flex justify-center">
                {loading ? <button onClick={formik.handleSubmit} type="button"
                                   className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <TailSpin
                        className="mx-2" color="white" height={20} width={20} visible={loading}/>
                </button> : <button onClick={formik.handleSubmit} type="button"
                                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>}

            </div>


        </form>

    </div>;
};

const initialValues = (data, id) => {
    return {
        purchase: data?.purchase || id,
        material: data?.material || '',
        quantity: data?.quantity || '',
        price_per_unit: data?.price_per_unit || '',
    }
}

const newSchema = () => {
    return {
        material: Yup.number().min(1).required(),
        quantity: Yup.number().integer().positive().required(),
        price_per_unit: Yup.number().min(0.01).required(),
    }
}

export default FormMaterial;

