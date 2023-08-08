import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {update_analysis} from "../../redux/actions/quality";

const FormBlueberry = ({dispatch, close, data,params}) => {
    const columns = [{name: 'average_brix', title: 'Brix promedio', type: 'text', maxLength: 4,}, {
        name: 'max_brix', title: 'Brix máximo', type: 'text', maxLength: 4,
    }, {name: 'min_brix', title: 'Brix mínimo', type: 'text', maxLength: 4,}, {
        name: 'immature_fruit', title: 'Fruta inmadura', type: 'text', maxLength: 4,
    }, {name: 'worn_pedicel', title: 'Pedicelo desgastado', type: 'text', maxLength: 4,}, {
        name: 'remains_flowers', title: 'Restos de flores', type: 'text', maxLength: 4,
    }, {name: 'soft', title: 'Fruta blanda o sobremadura', type: 'text', maxLength: 4,}, {
        name: 'scars', title: 'Cicatrices', type: 'text', maxLength: 4,
    }, {name: 'dehydrated', title: 'Deshidratada', type: 'text', maxLength: 4,},]
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_analysis('blueberry', data.id, form,params))
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
        average_brix: data?.average_brix || 0,
        max_brix: data?.max_brix || 0,
        min_brix: data?.min_brix || 0,
        immature_fruit: data?.immature_fruit || 0,
        worn_pedicel: data?.worn_pedicel || 0,
        remains_flowers: data?.remains_flowers || 0,
        soft: data?.soft || 0,
        scars: data?.scars || 0,
        dehydrated: data?.dehydrated || 0,
    }

}
const newSchema = () => {
    return {
        average_brix: Yup.number().min(0).max(100).required(),
        max_brix: Yup.number().min(0).max(100).required(),
        min_brix: Yup.number().min(0).max(100).required(),
        immature_fruit: Yup.number().min(0).max(100).required(),
        worn_pedicel: Yup.number().min(0).max(100).required(),
        remains_flowers: Yup.number().min(0).max(100).required(),
        soft: Yup.number().min(0).max(100).required(),
        scars: Yup.number().min(0).max(100).required(),
        dehydrated: Yup.number().min(0).max(100).required(),


    }
}

export default FormBlueberry;

