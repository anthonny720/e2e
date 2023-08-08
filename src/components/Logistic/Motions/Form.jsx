import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {map} from "lodash";
import {add_motion_boxes} from "../../../redux/actions/logistic";


const FormMotion = ({location, close}) => {

    const dispatch = useDispatch();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            dispatch(add_motion_boxes(form))
            close()
        }
    })


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center">


        <div className={` mb-4  flex w-full  items-center flex-col gap-2`}>
            <div className={"w-full "}>
                <p className={`mb-2 ${formik.errors.origin && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>Origen:</p>
                <select value={formik.values.origin}
                        onChange={(value) => formik.setFieldValue('origin', value.target.value)}
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"

                        aria-label="Default select example">
                    <option value={''}>Seleccione un origen</option>
                    {location !== null && map(location, item => (
                        <option key={item.id} value={item.id}>{item.name}</option>))}
                </select>
            </div>
            <div className={"w-full "}>
                <p className={`mb-2 ${formik.errors.destination && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>Destino:</p>
                <select value={formik.values.destination}
                        onChange={(value) => formik.setFieldValue('destination', value.target.value)}
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"

                        aria-label="Default select example">
                    <option value={''}>Seleccione un destino</option>
                    {location !== null && map(location, item => (
                        <option key={item.id} value={item.id}>{item.name}</option>))}
                </select>
            </div>
            <div className={"w-full "}>
                <p className={`${formik.errors.quantity && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>Cantidad:</p>
                <input type={"text"} maxLength={8}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                       value={`${formik.values.quantity}`}
                       onChange={text => formik.setFieldValue('quantity', text.target.value)}/>
            </div>
            <div className={"w-full "}>
                <p className={`${formik.errors.description && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>Descripción:</p>
                <textarea maxLength={100}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                          value={`${formik.values.description}`}
                          onChange={text => formik.setFieldValue('description', text.target.value)}/>
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
        origin: 0,
        destination: 0,
        description: "",
        quantity: 0,
    }
}
const newSchema = () => {
    return {
        origin: Yup.number().min(1).positive().required(true),
        destination: Yup.number().min(1).positive().required(true),
        description: Yup.string().required(true),
        quantity: Yup.number().min(1).positive().required(true),

    }
}


export default FormMotion;
