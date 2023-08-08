import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {map} from "lodash";
import {add_output_stock} from "../../../redux/actions/logistic";


const FormStock = ({data, lot, close}) => {

    const dispatch = useDispatch();
    /*Formik*/
    const formik = useFormik({
        initialValues: initialValues(data, lot),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form, onSubmitProps) => {
            dispatch(add_output_stock(form, lot))
            close()
        }
    })


    return (<form className="bg-white  rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center">


        <div className={` mb-4  flex w-full  items-center flex-col gap-2`}>
            <div className={"w-full "}>
                <p className={`${formik.errors.kg && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>Kg:</p>
                <input type={"text"} maxLength={8}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                       value={`${formik.values.kg}`}
                       onChange={text => formik.setFieldValue('kg', text.target.value)}/>
            </div>
            <div className={"w-full "}>
                <p className={`mb-2 ${formik.errors.lot_id && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>Lote:</p>
                <select value={formik.values.lot_id}
                        onChange={(value) => formik.setFieldValue('lot_id', value.target.value)}
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"

                        aria-label="Default select example">
                    <option value={''}>Seleccione un lote</option>
                    {lot !== null && map(lot, item => (
                        <option key={item.id} value={item.id}>{item.lot}</option>))}
                </select>
            </div>
            <div className={"w-full "}>
                <p className={`mb-2 ${formik.errors.destine && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400`}>Destino:</p>
                <select value={formik.values.destine}
                        onChange={(value) => formik.setFieldValue('destine', value.target.value)}
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50 uppercase focus:outline-none focus-visible:border-blue-500  sm:text-sm"

                        aria-label="Default select example">
                    <option value={'P'}>Producción</option>
                    <option value={'M'}>Merma</option>
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


const initialValues = (data) => {
    return {
        kg: data?.kg || 0,
        lot_id: data?.lot_id || '',
        destine: data?.destine || "P",
    }
}
const newSchema = () => {
    return {
        kg: Yup.number().min(0).positive().required(true),
        lot_id: Yup.number().required(true),
        destine: Yup.string().required(true),
    }
}


export default FormStock;
