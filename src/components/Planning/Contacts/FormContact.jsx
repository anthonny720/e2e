import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {map} from "lodash";
import {useDispatch} from "react-redux";

const FormPeople = ({close, add_model, products}) => {
    const dispatch = useDispatch();
    const columns = [{
        name: 'business_name', title: 'Razón social', type: 'text', maxLength: 255,
    }, {name: 'display_name', title: 'Nombre', type: 'text', maxLength: 255,}, {
        name: 'ruc', title: 'RUC', type: 'text', maxLength: 15,
    }, {name: 'address', title: 'Dirección', type: 'text', maxLength: 255,}, {
        name: 'email', title: 'Email', type: 'email', maxLength: 255,
    }, {name: 'phone', title: 'Teléfono', type: 'text', maxLength: 20,}]

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: true,
        onSubmit: (form) => {
            dispatch(add_model(form), close())
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
            {products && <div>
                <p className={`${formik.errors.product && "text-red-500"} text-[10px]  font-extralight leading-none text-blue-400 my-1`}>Producto:</p>
                <select onChange={(value) => formik.setFieldValue('product', value.target.value)}
                        defaultValue={formik.values.product}
                        className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50  focus:outline-none focus-visible:border-blue-500  sm:text-sm"
                        aria-label="Default select example">
                    <option value={null}>Seleccione un producto</option>
                    {map(products, i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
            </div>}

            <div className="w-full flex justify-center">
                <button onClick={formik.handleSubmit} type="button"
                        className="max-w-xl mx-2 my-2 bg-green-300 transition duration-150 ease-in-out focus:outline-none hover:bg-green-100 rounded-full text-white font-bold px-6 py-2 text-xs">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </div>


        </form>

    </div>;
};

const initialValues = () => {
    return {
        business_name: '', display_name: '', ruc: '', address: '', email: '', phone: '', product: ''
    }
}
const newSchema = () => {
    return {
        business_name: Yup.string().min(2).required(),
        display_name: Yup.string().min(2).required(),
        ruc: Yup.string().min(10),
        address: Yup.string().min(4),
        email: Yup.string().email(),
        phone: Yup.number(),
        product: Yup.number()
    }
}

export default FormPeople;

