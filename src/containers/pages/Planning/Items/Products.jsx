import React, {useEffect, useRef, useState} from 'react';
import Planning from "../Home";
import NavItems from "../../../../components/Planning/Items/Nav";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import Table from "../../../../components/Planning/Items/Products/Table";
import ModalHook from "../../../../components/util/hooks";
import {useDispatch, useSelector} from "react-redux";
import {delete_sku, get_materials, get_skus} from "../../../../redux/actions/operations";
import {
    get_categories,
    get_conditions,
    get_containers,
    get_cuts,
    get_families,
    get_packings,
    get_subfamilies,
    get_units
} from "../../../../redux/actions/management";
import {size} from "lodash";
import {MySwal} from "../../../../components/util/colors";
import {get_products} from "../../../../redux/actions/collection";
import Modal from "../../../../components/util/Modal";
import FormProduct from "../../../../components/Planning/Items/Products/Form";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Helmet} from "react-helmet";

const Products = () => {
    const tableRef = useRef(null);
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();

    const [formData, setFormData] = useState({
        name: '', group__name: ''
    })

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const dispatch = useDispatch()
    const payload = useSelector(state => state.Operations.products)
    const units = useSelector(state => state.Management.units)
    const groups = useSelector(state => state.Management.categories)
    const products = useSelector(state => state.Collection.products)
    const conditions = useSelector(state => state.Management.conditions)
    const families = useSelector(state => state.Management.families)
    const subfamilies = useSelector(state => state.Management.subfamilies)
    const cuts = useSelector(state => state.Management.cuts)
    const packings = useSelector(state => state.Management.packings)
    const containers = useSelector(state => state.Management.containers)

    useEffect(() => {
        dispatch(get_skus(formData))
    }, [formData])


    useEffect(() => {
        dispatch(get_units())
        dispatch(get_categories())
        dispatch(get_products())
        dispatch(get_conditions())
        dispatch(get_families())
        dispatch(get_subfamilies())
        dispatch(get_cuts())
        dispatch(get_packings())
        dispatch(get_materials())
        dispatch(get_containers())
    }, [])

    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este material?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_sku(id, formData))
            }
        })
    }

    const handleUpdateForm = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormProduct data={data} close={openModal} dispatch={dispatch} units={units} groups={groups}
                         products={products}
                         conditions={conditions}
                         families={families}
                         subfamilies={subfamilies}
                         cuts={cuts}
                         packings={packings}
                         containers={containers}
                         params={formData}/>
        </div>)
    }

    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormProduct close={openModal} dispatch={dispatch} units={units} products={products}
                         conditions={conditions}
                         families={families}
                         subfamilies={subfamilies}
                         containers={containers}
                         cuts={cuts}
                         packings={packings} groups={groups} params={formData}/>
        </div>)
    }

    return (<Planning>
        <Helmet>
            <title>Sku's</title>
        </Helmet>
        <NavItems/>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <div className={'p-2 flex justify-between'}>
            <p><span className={"font-bold text-sm text-gray-800"}>{size(payload)} </span><span
                className={"font-medium text-sm text-gray-800"}> Productos</span></p>
            <p className={"absolute right-0 pr-2 flex gap-2"}>
                <span className={"font-bold text-sm text-green-500 cursor-pointer"} onClick={() => handleAddForm()}>+ Producto</span>
                <DownloadTableExcel
                    filename={`Productos ${new Date().toLocaleDateString()}`}
                    sheet="Data"
                    currentTableRef={tableRef.current}
                >
                    <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>

                </DownloadTableExcel>
            </p>
        </div>

        <div className="relative overflow-x-auto scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
            <Table reference={tableRef} payload={payload} formData={formData} onChange={onChange}
                   onUpdate={handleUpdateForm}
                   onDelete={handleDelete}/>
        </div>
    </Planning>);
};

export default Products;
