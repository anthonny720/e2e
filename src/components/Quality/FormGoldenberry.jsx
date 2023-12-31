import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {update_analysis} from "../../redux/actions/quality";

const FormGoldenberry = ({dispatch, close, data, params}) => {
    const columns = [{name: 'caliz', title: 'Caliz %', type: 'text', maxLength: 4,}, {
        name: 'maturation_1', title: 'Maduración 1 %', type: 'text', maxLength: 4,
    }, {name: 'maturation_2', title: 'Maduración 2 %', type: 'text', maxLength: 4,}, {
        name: 'maturation_3', title: 'Maduración 3 %', type: 'text', maxLength: 4,
    }, {name: 'mushroom', title: 'Hongos y fermentado', type: 'text', maxLength: 4,}, {
        name: 'green', title: 'Verde', type: 'text', maxLength: 4,
    }, {name: 'crushed', title: 'Aplastado', type: 'text', maxLength: 4,}, {
        name: 'cracked', title: 'Rajado', type: 'text', maxLength: 4,
    }, {name: 'phytosanitary', title: 'Fitosanitario', type: 'text', maxLength: 4,}, {
        name: 'watery', title: 'Consistencia aguada', type: 'text', maxLength: 4,
    }, {name: 'small', title: 'Pequeño < 17mm', type: 'text', maxLength: 4,},]
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_analysis('goldenberry', data.id, form, params))
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
        caliz: data?.caliz || 0,
        maturation_1: data?.maturation_1 || 0,
        maturation_2: data?.maturation_2 || 0,
        maturation_3: data?.maturation_3 || 0,
        mushroom: data?.mushroom || 0,
        green: data?.green || 0,
        crushed: data?.crushed || 0,
        cracked: data?.cracked || 0,
        phytosanitary: data?.phytosanitary || 0,
        watery: data?.watery || 0,
        small: data?.small || 0,
    }

}
const newSchema = () => {
    return {
        caliz: Yup.number().min(0).max(100).required(),
        maturation_1: Yup.number().min(0).max(100).required(),
        maturation_2: Yup.number().min(0).max(100).required(),
        maturation_3: Yup.number().min(0).max(100).required(),
        mushroom: Yup.number().min(0).max(100).required(),
        green: Yup.number().min(0).max(100).required(),
        crushed: Yup.number().min(0).max(100).required(),
        cracked: Yup.number().min(0).max(100).required(),
        phytosanitary: Yup.number().min(0).max(100).required(),
        watery: Yup.number().min(0).max(100).required(),
        small: Yup.number().min(0).max(100).required(),

    }
}

export default FormGoldenberry;

