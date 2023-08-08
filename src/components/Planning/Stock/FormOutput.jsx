import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {TailSpin} from "react-loader-spinner";
import {add_stock_output} from "../../../redux/actions/operations";

const FormOutput = ({close, data}) => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.Operations.loading_stock)

    const columns = [{name: 'quantity', title: 'Cantidad', type: 'text', maxLength: 6,}, {
        name: 'guide_number', title: '# Guía', type: 'text', maxLength: 50,
    }, {name: 'vale_number', title: '# Vale', type: 'text', maxLength: 50,}, {
        name: 'lot_id', title: '# Lote', type: 'text', maxLength: 50,
    },]

    const formik = useFormik({
        initialValues: initialValues(data),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(add_stock_output(form), close())
        }
    })
    return <div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
            <div className={"grid grid-cols-1 gap-2"}>
                <div >
                    <p className={`${formik.errors.stock_entry && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Items</p>
                    <select onChange={(value) => formik.setFieldValue('stock_entry', value.target.value)}
                            defaultValue={formik.values.stock_entry}
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                            aria-label="Default select example">
                        <option value={""}>Selecciona un item</option>
                        {map(data, (item, index) => <option key={index} value={item.id}>{item?.material +" "+ item?.order_id + " ("+ item?.stock+" und)"}</option>)}
                    </select>
                </div>
                {map(columns, (column, index) => <div key={index}>
                    <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>{column.title}</p>
                    <input type={column.type} maxLength={column.maxLength}
                           className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                           value={`${formik.values[column.name]}`}
                           onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
                </div>)}
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

const initialValues = (data) => {
    return {
        stock_entry: '', quantity: '', guide_number: '', vale_number: '', lot_id: '',


    }
}
const newSchema = () => {
    return {
        stock_entry: Yup.number().min(1).required(),
        quantity: Yup.number().positive().integer().required(),
        guide_number: Yup.string().min(1),
        vale_number: Yup.string().min(1),
        lot_id: Yup.string().min(1).required(),

    }
}

export default FormOutput;

