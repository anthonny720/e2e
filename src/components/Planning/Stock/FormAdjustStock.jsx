import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {TailSpin} from "react-loader-spinner";
import {adjustment_stock_output} from "../../../redux/actions/operations";

const FormAdjustStock = ({close, id}) => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.Operations.loading_stock)

    const columns = [{name: 'stock', title: 'Cantidad', type: 'number', maxLength: 6,}]

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            form.id = id
            dispatch(adjustment_stock_output(form), close())
        }
    })
    return <div className="w-full z-20">
        <form className="bg-white px-8 pt-6 pb-8 mb-4">
            {map(columns, (column, index) => <div key={index}>
                <p className={`${formik.errors[column.name] && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 mt-2`}>{column.title}</p>
                <input type={column.type} maxLength={column.maxLength}
                       className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                       value={`${formik.values[column.name]}`}
                       onChange={text => formik.setFieldValue(column.name, text.target.value)}/>
            </div>)}


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

const initialValues = () => {
    return {
        stock: '',
    }
}
const newSchema = () => {
    return {
        stock: Yup.number().positive().integer().required(),
    }
}

export default FormAdjustStock;

