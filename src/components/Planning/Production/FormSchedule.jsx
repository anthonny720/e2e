import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map, size} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {TailSpin} from "react-loader-spinner";
import {
    add_sales_order,
    add_schedule_manufacturing,
    update_sales_order,
    update_schedule_manufacturing
} from "../../../redux/actions/operations";

const FormSchedule = ({
                          close, data, info,sale_id
                      }) => {

    const dispatch = useDispatch();
    const loading = useSelector(state => state.Operations.loading_schedule)
    const outsourcings = useSelector(state => state.Management.outsourcings)
    const columns = [
        {name: 'date', title: 'Fecha', type: 'date', maxLength: 4,}, {
            name: 'raw_material', title: 'Materia Prima ', type: 'text', maxLength: 6,
        }, {name: 'performance', title: 'Rendimiento', type: 'text', maxLength: 4,}, {
            name: 'capacity', title: 'Capacidad', type: 'text', maxLength: 6,
        }, {name: 'stock_start', title: 'Stock inicial', type: 'text', maxLength: 8,},]

    const formik = useFormik({
        initialValues: initialValues(data ? data : info),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            form.sale = sale_id
            data ? dispatch(update_schedule_manufacturing(form, data?.id)) : dispatch(add_schedule_manufacturing(form))
            close()
        }
    })
    return <div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
            <div className={"grid grid-cols-2 gap-2"}>

                {map(columns, (column, index) => <div key={index}>
                    <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>{column.title}</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>)}

                {outsourcings && outsourcings !== null && outsourcings !== undefined && size(outsourcings) > 0 && <div>
                    <p className={`${formik.errors.process_plant && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Planta
                        de proceso</p>
                    <select onChange={(value) => formik.setFieldValue('process_plant', value.target.value)}
                            defaultValue={formik.values.process_plant}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                    >
                        <option value={''}>Seleccione una planta de proceso</option>
                        {map(outsourcings, (item, index) => <option key={index}
                                                                    value={item.id}>{item?.display_name}</option>)}
                    </select>
                </div>}


            </div>


            <div className="w-full flex justify-center">
                {loading ? <button onClick={formik.handleSubmit} type="button"
                                   className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <TailSpin
                        className="mx-2" color="white" height={20} width={20} visible={loading}/>
                </button> : <button onClick={formik.handleSubmit} type="button"
                                    className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>}

            </div>


        </form>

    </div>;
};

const initialValues = (data, info) => {
    return {
        date: data?.date || '',
        raw_material: data?.raw_material || '',
        performance: data?.performance || '',
        capacity: data?.capacity || '',
        stock_start: data?.stock_start || 0,
        process_plant: data?.process_plant || '',


    }
}
const newSchema = () => {
    return {
        date: Yup.date().required(),
        raw_material: Yup.number().min(1).required(),
        performance: Yup.number().min(1).required(),
        capacity: Yup.number().required(),
        stock_start: Yup.number().min(0).required(),
        process_plant: Yup.number().min(1).required(),

    }
}

export default FormSchedule;

