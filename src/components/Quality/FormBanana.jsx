import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {update_analysis} from "../../redux/actions/quality";

const FormBanana = ({dispatch, close, data, params}) => {
    const columns = [{
        name: 'maturation_1', title: 'Maduración 1 %', type: 'text', maxLength: 4,
    }, {name: 'maturation_2', title: 'Maduración 2 %', type: 'text', maxLength: 4,}, {
        name: 'maturation_3',
        title: 'Maduración 3 %',
        type: 'text',
        maxLength: 4,
    }, {name: 'maturation_4', title: 'Maduración 4 %', type: 'text', maxLength: 4,}, {
        name: 'mechanical_damages', title: 'Daños mecánicos %', type: 'text', maxLength: 4,
    }, {name: 'broken_neck', title: 'Corte de cuello %', type: 'text', maxLength: 4,}, {
        name: 'chafing', title: 'Rozadura %', type: 'text', maxLength: 4,
    }, {name: 'scar', title: 'Cicatriz %', type: 'text', maxLength: 4,}, {
        name: 'discard',
        title: 'Descarte %',
        type: 'text',
        maxLength: 4,
    }]
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_analysis('banano', data.id, form, params))
            close()
        }
    })
    return (<div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
            <div className={"grid md:grid-cols-2 gap-2"}>
                {map(columns, (column, index) => (<div key={index}>
                    <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>{column.title}</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
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

    </div>);
};

const initialValues = (data) => {
    return {
        maturation_1: data?.maturation_1 || 0,
        maturation_2: data?.maturation_2 || 0,
        maturation_3: data?.maturation_3 || 0,
        maturation_4: data?.maturation_4 || 0,
        mechanical_damages: data?.mechanical_damages || 0,
        broken_neck: data?.broken_neck || 0,
        chafing: data?.chafing || 0,
        scar: data?.scar || 0,
        discard: data?.discard || 0,
    }

}
const newSchema = () => {
    return {
        maturation_1: Yup.number().min(0).max(100).required(),
        maturation_2: Yup.number().min(0).max(100).required(),
        maturation_3: Yup.number().min(0).max(100).required(),
        maturation_4: Yup.number().min(0).max(100).required(),
        mechanical_damages: Yup.number().min(0).max(100).required(),
        broken_neck: Yup.number().min(0).max(100).required(),
        chafing: Yup.number().min(0).max(100).required(),
        scar: Yup.number().min(0).max(100).required(),
        discard: Yup.number().min(0).max(100).required(),
    }
}

export default FormBanana;

