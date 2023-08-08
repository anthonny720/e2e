import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {update_process} from "../../../redux/actions/production";


const FormProcessPineapple = ({close, data, category, params}) => {

    const dispatch = useDispatch()
    const columns = [
        {name: 'rejection', title: 'Rechazo (kg)', type: 'text', maxLength: 5},
        {name: 'crown', title: 'Corona (kg)', type: 'text', maxLength: 5},
        {name: 'shell_trunk', title: 'Cáscara y tronco (kg)', type: 'text', maxLength: 5},
        {name: 'pulp', title: 'Pulpa', type: 'text', maxLength: 5},
        {name: 'brix', title: 'Brix', type: 'text', maxLength: 5},
    ]


    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_process(data?.id, category, form, params))
            close()
        }
    })


    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4 ">

                <div className={"grid gap-2 grid-cols-2"}>
                    {map(columns, (column, index) => (<div key={index}>
                        <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>{column.title}:</p>
                        <input type={column.type} maxLength={column.maxLength}
                               className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                               value={`${formik.values[column.name]}`}
                               onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                    </div>))}
                </div>


                <div className="w-full flex justify-center">
                    <button onClick={formik.handleSubmit} type="button"
                            className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </form>

        </div>
    );
};
const initialValues = (data) => {
    return {
        rejection: data?.rejection || 0,
        crown: data?.crown || 0,
        shell_trunk: data?.shell_trunk || 0,
        pulp: data?.pulp || 0,
        brix: data?.brix || 0,
    }
}
const newSchema = () => {
    return {
        rejection: Yup.number().min(0).required(),
        crown: Yup.number().min(0).required(),
        shell_trunk: Yup.number().min(0).required(),
        pulp: Yup.number().min(0).required(),
        brix: Yup.number().min(0).required(),

    }
}
export default FormProcessPineapple;