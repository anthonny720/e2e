import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch} from "react-redux";
import {update_mod} from "../../redux/actions/production";


const FormMOD = ({close, data, params, category, typeform}) => {

    const dispatch = useDispatch()
    const columns = [
        {name: 'conditioning_people', title: 'N° personas acondicionado (día)', type: 'text', maxLength: 2},
        {name: 'conditioning_people_night', title: 'N° personas hornos (noche)', type: 'text', maxLength: 2},
        {name: 'conditioning_hours', title: 'Horas acondicionado (día)', type: 'time', maxLength: 8},
        {name: 'conditioning_hours_night', title: 'Horas noche (noche)', type: 'time', maxLength: 8},
        {name: 'conditioning_people_25', title: 'N° personas acondicionado (extras) 25%', type: 'text', maxLength: 2},
        {name: 'conditioning_hours_25', title: 'Horas acondicionado (extras) 25%', type: 'time', maxLength: 8},
        {name: 'conditioning_people_35', title: 'N° personas acondicionado (extras) 35%', type: 'text', maxLength: 2},
        {name: 'conditioning_hours_35', title: 'Horas acondicionado (extras) 35%', type: 'time', maxLength: 8},
        {name: 'supervisor_name_conditioning', title: 'Supervisor', type: 'text', maxLength: 50},
        {name: 'controller_name_conditioning', title: 'Controller', type: 'text', maxLength: 50},
    ]
    const columns_2 = [
        {name: 'packing_people_day', title: 'N° personas envasado dia', type: 'text', maxLength: 2},
        {name: 'packing_people_night', title: 'N° personas envasado noche', type: 'text', maxLength: 2},
        {name: 'packing_hours_day', title: 'Horas envasado dia', type: 'time', maxLength: 8},
        {name: 'packing_hours_night', title: 'Horas envasado noche', type: 'time', maxLength: 8},
        {name: 'packing_people_25', title: 'N° personas envasado (extras) 25%', type: 'text', maxLength: 2},
        {name: 'packing_hours_25', title: 'Horas envasado (extras) 25%', type: 'time', maxLength: 8},
        {name: 'packing_people_35', title: 'N° personas envasado (extras) 35%', type: 'text', maxLength: 2},
        {name: 'packing_hours_35', title: 'Horas envasado (extras) 35%', type: 'time', maxLength: 8},
        {name: 'supervisor_name_packing', title: 'Supervisor', type: 'text', maxLength: 50},
        {name: 'controller_name_packing', title: 'Controller', type: 'text', maxLength: 50},
    ]
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(update_mod(data?.id, category, form, params))
            close()
        }
    })


    return (
        <div className="w-full z-20">
            <form className="bg-white px-8 pt-6 pb-8 mb-4 ">
                {typeform === 'conditioning' &&
                    <div className={"grid gap-2 grid-cols-2"}>
                        {map(columns, (column, index) => (<div key={index}>
                            <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>{column.title}:</p>
                            <input type={column.type} maxLength={column.maxLength}
                                   className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                                   value={`${formik.values[column.name]}`}
                                   onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                        </div>))}
                    </div>}
                {typeform === 'packing' &&
                    <div className={"grid gap-2 grid-cols-2"}>
                        {map(columns_2, (column, index) => (<div key={index}>
                            <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>{column.title}:</p>
                            <input type={column.type} maxLength={column.maxLength}
                                   className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 "
                                   value={`${formik.values[column.name]}`}
                                   onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                        </div>))}
                    </div>}


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
        conditioning_people: data?.conditioning_people || 0,
        conditioning_people_night: data?.conditioning_people_night || 0,
        conditioning_hours: data?.conditioning_hours || '00:00:00',
        conditioning_hours_night: data?.conditioning_hours_night || '00:00:00',
        conditioning_people_25: data?.conditioning_people_25 || 0,
        conditioning_hours_25: data?.conditioning_hours_25 || '00:00:00',
        conditioning_people_35: data?.conditioning_people_35 || 0,
        conditioning_hours_35: data?.conditioning_hours_35 || '00:00:00',
        packing_people_day: data?.packing_people_day || 0,
        packing_people_night: data?.packing_people_night || 0,
        packing_hours_day: data?.packing_hours_day || '00:00:00',
        packing_hours_night: data?.packing_hours_night || '00:00:00',
        packing_people_25: data?.packing_people_25 || 0,
        packing_hours_25: data?.packing_hours_25 || '00:00:00',
        packing_people_35: data?.packing_people_35 || 0,
        packing_hours_35: data?.packing_hours_35 || '00:00:00',
        supervisor_name_conditioning: data?.supervisor_name_conditioning || '',
        controller_name_conditioning: data?.controller_name_conditioning || '',
        supervisor_name_packing: data?.supervisor_name_packing || '',
        controller_name_packing: data?.controller_name_packing || ''

    }
}
const newSchema = () => {
    return {
        conditioning_people: Yup.number().integer().min(0).required(),
        conditioning_people_night: Yup.number().integer().min(0).required(),
        conditioning_hours: Yup.string().min(0).required(),
        conditioning_hours_night: Yup.string().min(0).required(),
        conditioning_people_25: Yup.number().integer().min(0).required(),
        conditioning_hours_25: Yup.string().min(0).required(),
        conditioning_people_35: Yup.number().integer().min(0).required(),
        conditioning_hours_35: Yup.string().min(0).required(),
        packing_people_day: Yup.number().integer().min(0).required(),
        packing_people_night: Yup.number().integer().min(0).required(),
        packing_hours_day: Yup.string().min(0).required(),
        packing_hours_night: Yup.string().min(0).required(),
        packing_people_25: Yup.number().integer().min(0).required(),
        packing_hours_25: Yup.string().min(0).required(),
        packing_people_35: Yup.number().integer().min(0).required(),
        packing_hours_35: Yup.string().min(0).required(),
        supervisor_name_conditioning: Yup.string().min(1),
        controller_name_conditioning: Yup.string().min(1),
        supervisor_name_packing: Yup.string().min(1),
        controller_name_packing: Yup.string().min(1),
    }
}
export default FormMOD;