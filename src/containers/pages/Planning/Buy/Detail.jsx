import React, {useEffect} from 'react';
import Planning from "../Home";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {delete_purchase_item, get_materials, get_purchase} from "../../../../redux/actions/operations";
import {LinkIcon, TrashIcon} from "@heroicons/react/24/outline";
import Humanize from "humanize-plus";
import {map, size, sum} from "lodash";
import Modal from "../../../../components/util/Modal";
import ModalHook from "../../../../components/util/hooks";
import FormMaterial from "../../../../components/Planning/Buy/FormMaterial";
import {PencilIcon, PlusCircleIcon} from "@heroicons/react/24/solid";
import {MySwal} from "../../../../components/util/colors";
import {Helmet} from "react-helmet";

const DetailPurchase = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const data = useSelector(state => state.Operations.purchase)
    const materials = useSelector(state => state.Operations.materials)
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    useEffect(() => {
        dispatch(get_purchase(id));
        dispatch(get_materials());
    }, []);

    const handleAddItem = () => {
        setIsOpen(true)
        setContent(<div className={"h-max"}>
            <FormMaterial close={openModal} dispatch={dispatch} materials={materials} id={id}/>
        </div>)
    }
    const handleUpdateItem = (item) => {
        setIsOpen(true)
        setContent(<div className={"h-max"}>
            <FormMaterial close={openModal} data={item} dispatch={dispatch} materials={materials} id={id}/>
        </div>)
    }

    const handleDelete = (item) => {
        MySwal.fire({
            title: '¿Desea eliminar este producto?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_purchase_item(item, id))
            }
        })
    }


    return (<Planning>
         <Helmet>
            <title>OC - {data?.order_id}</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className="w-full mx-auto p-4 text-gray-800">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="p-8 max-w-full">
                    <h1 className="md:text-3xl text-md font-bold mb-6 flex items-center gap-4">
                        <a href={data?.drive} target={'_blank'} rel="noreferrer"  ><LinkIcon
                        className={"w-5 cursor-pointer"}/> </a>
                        Orden de compra </h1>
                    <div className="md:flex md:flex-wrap md:-mx-2">
                        <div className="md:w-1/2 md:px-2 mb-4">
                            <p className="font-bold mb-2">Proveedor:</p>
                            <p className={"font-light"}>{data?.supplier_name}</p>
                        </div>
                        <div className="md:w-1/2 md:px-2 mb-4">
                            <p className="font-bold mb-2">Fecha de Pedido:</p>
                            <p className={"font-light"}>{new Date(data?.order_date + "T00:00:00").toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}</p>
                        </div>
                        <div className="md:w-1/2 md:px-2 mb-4">
                            <p className="font-  mb-2">Número de Orden:</p>
                            <p className={"font-light"}>{data?.order_id}</p>
                        </div>
                        <div className="md:w-1/2 md:px-2 mb-4">
                            <p className="font-bold mb-2">Fecha de creación:</p>
                            <p className={"font-light"}>{new Date(data?.created_at + "T00:00:00").toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}</p>
                        </div>
                        <div className="md:w-1/2 md:px-2 mb-4">
                            <p className="font-bold mb-2">Número de Factura:</p>
                            <p className={"font-light"}>{data?.invoice_id}</p>
                        </div>
                        <div className="md:w-1/2 md:px-2 mb-4">
                            <p className="font-bold mb-2">Número de Guía:</p>
                            <p className={"font-light"}>{data?.guide_number}</p>
                        </div>


                        <div className="md:w-1/2 md:px-2 mb-4">
                            <p className="font-bold mb-2">Fecha de Envío:</p>
                            <p className={"font-light"}>{data?.shipment_date && new Date(data?.shipment_date + "T00:00:00").toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}</p>
                        </div>

                        <div className="md:w-1/2 md:px-2 mb-4">
                            <p className="font-bold mb-2">Fecha de Llegada:</p>
                            <p className={"font-light"}>{data?.arrival_date && new Date(data?.arrival_date + "T00:00:00").toLocaleDateString('es-PE', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}</p>
                        </div>
                        <div className="md:px-2 md:w-full mb-4 w-full ">
                            <p className="font-bold mb-2">Comentario:</p>
                            <p className=" whitespace-pre-wrap break-all   font-light ">{data?.comment}</p>
                        </div>
                    </div>
                    <div className={"w-full overflow-scroll scrollbar-hide relative"}>
                        {data?.status!=="received"&&
                        <PlusCircleIcon onClick={handleAddItem}
                                        className={"w-8 text-green-400 bg-white rounded-full cursor-pointer -top-1 left-[45%] md:left-[50%] absolute z-[100]"}/>
                        }
                        <table className="border mb-8 w-full mt-4 ">


                            <thead className={'text-sm text-gray-700 uppercase bg-gray-50'}>
                            <tr>
                                <th className="border px-4 py-2 ">Producto</th>
                                <th className="border px-4 py-2 ">Cantidad</th>
                                <th className="border px-4 py-2 ">Precio Unitario</th>
                                <th className="border px-4 py-2 ">Subtotal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data && data?.items && size(data?.items) > 0 && map(data?.items, (product, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2 font-normal">
                                        <p className={"flex gap-2"}>
                                            {data.status!=="received"&&
                                            <TrashIcon onClick={() => handleDelete(product?.id)}
                                                                               className={"w-4 cursor-pointer text-red-400"}/>}
                                            {data.status!=="received"&&
                                            <PencilIcon onClick={() => handleUpdateItem(product)}
                                                        className={"w-4 cursor-pointer text-gray-800"}/>}
                                            {product.material_name}
                                        </p>

                                    </td>
                                    <td className="border px-4 py-2 font-normal">{product.quantity} {product?.unit}</td>
                                    <td className="border px-4 py-2 font-normal">{product?.currency_name} {Humanize.formatNumber(product.price_per_unit, 2)}</td>
                                    <td className="border px-4 py-2 font-normal">
                                        {product?.currency_name} {Humanize.formatNumber(product.price_per_unit * product?.quantity, 2)}
                                    </td>
                                </tr>))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <td className="border px-4 py-2 font-bold" colSpan="3">Subtotal</td>
                                <td className="border px-4 py-2 font-bold">
                                    {data?.currency_name} {Humanize.formatNumber(sum(map(data?.items, (product) => parseFloat(product.price_per_unit * product.quantity))), 2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold" colSpan="3">Impuesto</td>
                                <td className="border px-4 py-2 font-bold"> {data?.tax_value} %</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 font-bold" colSpan="3">Total</td>
                                <td className="border px-4 py-2 font-bold">{data?.currency_name} {Humanize.formatNumber(data?.total_price, 2)}</td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    </Planning>);
};

export default DetailPurchase;
