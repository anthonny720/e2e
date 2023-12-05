import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {update_analysis} from "../../redux/actions/quality";

const FormMango = ({close, data, dispatch,params}) => {

    const columns = [{name: 'color_1', title: 'Color 1 %', type: 'text', maxLength: 4,}, {
        name: 'color_1_5', title: 'Color 1,5  %', type: 'text', maxLength: 4,
    }, {name: 'color_2', title: 'Color 2 %', type: 'text', maxLength: 4,}, {
        name: 'color_2_5', title: 'Color 2,5 %', type: 'text', maxLength: 4,
    }, {name: 'color_3', title: 'Color 3 %', type: 'text', maxLength: 4,}, {
        name: 'color_3_5', title: 'Color 3.5 %', type: 'text', maxLength: 4,
    }, {name: 'brix_7', title: 'Brix > 7 %', type: 'text', maxLength: 4,}, {
        name: 'brix_7_8', title: 'Brix 7-8 %', type: 'text', maxLength: 4,
    }, {name: 'brix_8_9', title: 'Brix 8-9 %', type: 'text', maxLength: 4,}, {
        name: 'brix_9', title: 'Brix 9 %', type: 'text', maxLength: 4,
    }, {name: 'weight_280', title: 'Peso <280 gr %', type: 'text', maxLength: 4,}, {
        name: 'weight_280_300', title: 'Peso 280-300 gr %', type: 'text', maxLength: 4,
    }, {name: 'weight_300', title: 'Peso >300 gr %', type: 'text', maxLength: 4,}, {
        name: 'mechanical_damage', title: 'Daños mecanicos %', type: 'text', maxLength: 4,
    }, {name: 'cracked', title: 'Rajado %', type: 'text', maxLength: 4,}, {
        name: 'sun_damage', title: 'Daños de sol %', type: 'text', maxLength: 4,
    }, {
        name: 'anthracnose', title: 'Antracnosis %', type: 'text', maxLength: 4,
    }, {name: 'rot', title: 'Pudrido %', type: 'text', maxLength: 4,}, {
        name: 'latex', title: 'Latex %', type: 'text', maxLength: 4,
    }, {name: 'queresa', title: 'Queresa %', type: 'text', maxLength: 4,}, {
        name: 'insect_bite', title: 'Insectos %', type: 'text', maxLength: 4,
    }, {name: 'mature', title: 'Maduro %', type: 'text', maxLength: 4,}, {
        name: 'overripe', title: 'Sobre maduro %', type: 'text', maxLength: 4,
    },]
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_analysis('mango', data?.id, form,params))
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
        color_1: data?.color_1 || 0,
        color_1_5: data?.color_1_5 || 0,
        color_2: data?.color_2 || 0,
        color_2_5: data?.color_2_5 || 0,
        color_3: data?.color_3 || 0,
        color_3_5: data?.color_3_5 || 0,
        brix_7: data?.brix_7 || 0,
        brix_7_8: data?.brix_7_8 || 0,
        brix_8_9: data?.brix_8_9 || 0,
        brix_9: data?.brix_9 || 0,
        weight_280: data?.weight_280 || 0,
        weight_280_300: data?.weight_280_300 || 0,
        weight_300: data?.weight_300 || 0,
        mechanical_damage: data?.mechanical_damage || 0,
        cracked: data?.cracked || 0,
        sun_damage: data?.sun_damage || 0,
        anthracnose: data?.anthracnose || 0,
        rot: data?.rot || 0,
        mature: data?.mature || 0,
        latex: data?.latex || 0,
        queresa: data?.queresa || 0,
        insect_bite: data?.insect_bite || 0,
        overripe: data?.overripe || 0,

    }

}
const newSchema = () => {
    return {
        color_1: Yup.number().min(0).max(100).required(),
        color_1_5: Yup.number().min(0).max(100).required(),
        color_2: Yup.number().min(0).max(100).required(),
        color_2_5: Yup.number().min(0).max(100).required(),
        color_3: Yup.number().min(0).max(100).required(),
        color_3_5: Yup.number().min(0).max(100).required(),
        brix_7: Yup.number().min(0).max(100).required(),
        brix_7_8: Yup.number().min(0).max(100).required(),
        brix_8_9: Yup.number().min(0).max(100).required(),
        brix_9: Yup.number().min(0).max(100).required(),
        weight_280: Yup.number().min(0).max(100).required(),
        weight_280_300: Yup.number().min(0).max(100).required(),
        weight_300: Yup.number().min(0).max(100).required(),
        mechanical_damage: Yup.number().min(0).max(100).required(),
        cracked: Yup.number().min(0).max(100).required(),
        sun_damage: Yup.number().min(0).max(100).required(),
        anthracnose: Yup.number().min(0).max(100).required(),
        rot: Yup.number().min(0).max(100).required(),
        mature: Yup.number().min(0).max(100).required(),
        latex: Yup.number().min(0).max(100).required(),
        queresa: Yup.number().min(0).max(100).required(),
        insect_bite: Yup.number().min(0).max(100).required(),
        overripe: Yup.number().min(0).max(100).required(),


    }
}

export default FormMango;

