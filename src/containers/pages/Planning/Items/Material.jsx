import React, {useEffect, useRef, useState} from 'react';
import Planning from "../Home";
import NavItems from "../../../../components/Planning/Items/Nav";
import {CloudArrowDownIcon} from "@heroicons/react/24/solid";
import {useDispatch, useSelector} from "react-redux";
import {delete_material, get_materials} from "../../../../redux/actions/operations";
import Table from "../../../../components/Planning/Items/Materials/Table";
import {size} from "lodash";
import ModalHook from "../../../../components/util/hooks";
import Modal from "../../../../components/util/Modal";
import {get_categories, get_units} from "../../../../redux/actions/management";
import FormMaterial from "../../../../components/Planning/Items/Materials/Form";
import {MySwal} from "../../../../components/util/colors";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Helmet} from "react-helmet";

const Material = () => {
    const tableRef = useRef(null);
    const [formData, setFormData] = useState({sap: '', name: ''})
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();


    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const dispatch = useDispatch()
    const payload = useSelector(state => state.Operations.materials)
    const units = useSelector(state => state.Management.units)
    const groups = useSelector(state => state.Management.categories)

    useEffect(() => {
        dispatch(get_materials(formData))
    }, [formData])

    useEffect(() => {
        dispatch(get_units())
        dispatch(get_categories())
    }, [])

    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar este material?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_material(id, formData))
            }
        })
    }

    const handleUpdateForm = (data) => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormMaterial data={data} close={openModal} dispatch={dispatch} units={units} groups={groups}
                          params={formData}/>
        </div>)
    }

    const handleAddForm = () => {
        setIsOpen(true)
        setContent(<div className={"h-full md:h-screen"}>
            <FormMaterial close={openModal} dispatch={dispatch} units={units} groups={groups} params={formData}/>
        </div>)
    }

    return (<Planning>
            <Helmet>
                <title>Materiales</title>
            </Helmet>
            <NavItems/>
            <Modal isOpen={isOpen} close={openModal} children={content}/>
            <div className={'p-2 flex justify-between relative'}>
                <p><span className={"font-bold text-sm text-gray-800"}>{size(payload)} </span><span
                    className={"font-medium text-sm text-gray-800"}> Materiales</span></p>
                <p className={"absolute right-0 pr-2 flex gap-2"}>
                    <span className={"font-bold text-sm text-green-500 cursor-pointer"} onClick={() => handleAddForm()}>+ Material</span>
                    <DownloadTableExcel
                        filename={`Materiales ${new Date().toLocaleDateString()}`}
                        sheet="Data"
                        currentTableRef={tableRef.current}
                    >
                        <CloudArrowDownIcon className={"w-6 cursor-pointer text-gray-400"}/>

                    </DownloadTableExcel>
                </p>
            </div>

            <div
                className="relative overflow-x-scroll scrollbar-hide  sm:rounded-lg p-2  max-h-[450px] md:max-h-[550px]">
                <Table reference={tableRef} onDelete={handleDelete} onUpdate={handleUpdateForm} formData={formData}
                       onChange={onChange}
                       payload={payload}/>
            </div>
        </Planning>

    );
};


export default Material;
