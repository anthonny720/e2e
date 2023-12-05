import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map, size} from "lodash";
import {useSelector} from "react-redux";
import {add_recipe, update_recipe} from "../../../../redux/actions/operations";

const FormRecipe = ({dispatch, close, parent_id, data}) => {

    const materials = useSelector(state => state.Operations.materials)
    const columns = [{name: 'quantity', title: 'Cantidad', type: 'text', maxLength: 11,}]

    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            form.product = parent_id
            data ? dispatch(update_recipe(data?.id, form,parent_id)) : dispatch(add_recipe(form,parent_id))
            close()
        }
    })
    return (<div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">

            {map(columns, (column, index) => (<div key={index}>
                <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>{column.title}</p>
                <input type={column.type} maxLength={column.maxLength}
                       className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                       value={`${formik.values[column.name]}`}
                       onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
            </div>))}

            {materials && materials !== null && materials !== undefined && size(materials) > 0 ? <div>
                <p className={`${formik.errors.material && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Material</p>
                <select onChange={(value) => formik.setFieldValue('material', value.target.value)}
                        defaultValue={formik.values.material}
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                        aria-label="Default select example">
                    <option value={null}>Seleccione un material</option>
                    {map(materials, i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
            </div> : null}


            <div className="w-full flex justify-center">
                <button onClick={formik.handleSubmit} type="button"
                        className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </div>


        </form>

    </div>);
};

const initialValues = (data) => {
    return {
        quantity: data?.quantity || '', material: data?.material || '',
    }
}
const newSchema = () => {
    return {
        quantity: Yup.number().min(0).required(), material: Yup.number().min(1).required(),

    }
}

export default FormRecipe;

