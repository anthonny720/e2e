import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {map} from "lodash";
import {add_output_items} from "../../../redux/actions/logistic";


const FormOutput = ({close, items,lot}) => {
    const columns = [
        {name: 'kg', title: 'Kg', type: 'number', maxLength: 7},
    ]
    const dispatch = useDispatch();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            dispatch(add_output_items(form,lot))
            close()
        }
    })


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center">

        <div className={`grid grid-cols-2 gap-2`}>
            {
                map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>{column.title}:</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>))
            }
            <div className={"w-full"}>
                <p className={`${formik.errors.item && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>Pallet:</p>
                <select value={formik.values.item}
                        onChange={(value) => formik.setFieldValue('item', value.target.value)}
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm">
                    <option value={''}>Pallet</option>
                    {items !== null && map(items, item => (
                        <option key={item.id} value={item.id}>{item.number}</option>))}
                </select>
            </div>
        </div>


        <div className="w-full flex justify-center">
            <button onClick={formik.handleSubmit} type="button"
                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </div>

    </form>)

};


const initialValues = () => {
    return {
        kg: 0,
        item: null
    }
}
const newSchema = () => {
    return {
        kg: Yup.number().min(1).positive().required(true),
        item: Yup.number().min(1).positive().required(true),
    }
}


export default FormOutput;
