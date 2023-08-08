import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {add_contact} from "../../../redux/actions/management";

const FormPeople = ({dispatch, close, parent_id, model, handleRefresh}) => {
    const columns = [{name: 'first_name', title: 'Nombre', type: 'text', maxLength: 50,}, {
        name: 'last_name', title: 'Apellido', type: 'text', maxLength: 50,
    }, {name: 'position', title: 'Posición', type: 'text', maxLength: 50,}, {
        name: 'email', title: 'Email', type: 'text', maxLength: 50,
    }, {name: 'phone', title: 'Teléfono', type: 'text', maxLength: 50,}]

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            form.model = model
            form.parent_id = parent_id
            dispatch(add_contact(form), close())
            handleRefresh()
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

            <div className="w-full flex justify-center">
                <button onClick={formik.handleSubmit} type="button"
                        className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </div>


        </form>

    </div>);
};

const initialValues = () => {
    return {
        first_name: '', last_name: '', position: '', email: '', phone: '',

    }
}
const newSchema = () => {
    return {
        first_name: Yup.string().min(2).required(),
        last_name: Yup.string().min(2).required(),
        position: Yup.string().min(2).required(),
        email: Yup.string().email().required(),
        phone: Yup.number(),
    }
}

export default FormPeople;

