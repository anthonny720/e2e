import React, {useEffect} from 'react';
import Planning from "../Home";
import NavManufacturing from "../../../../components/Planning/Production/Nav";
import DisclosurePlanning from "../../../../components/Planning/Production/Disclosure";
import {useDispatch, useSelector} from "react-redux";
import {delete_schedule_manufacturing, get_sales_pending} from "../../../../redux/actions/operations";
import {MySwal} from "../../../../components/util/colors";
import ModalHook from "../../../../components/util/hooks";
import Modal from "../../../../components/util/Modal";
import FormSchedule from "../../../../components/Planning/Production/FormSchedule";
import {get_outsourcings} from "../../../../redux/actions/management";
import {Helmet} from "react-helmet";

const Production = () => {
    const dispatch = useDispatch();
    const payload = useSelector(state => state.Operations.sales_pending);
    const {content, setContent, isOpen, setIsOpen, openModal} = ModalHook();
    useEffect(() => {
        dispatch(get_sales_pending())
        dispatch(get_outsourcings())
    }, []);

    const handleAddForm = (info) => {
        setIsOpen(true)
        setContent(<FormSchedule close={openModal} info={info} sale_id={info?.id}/>)
    }

    const handleUpdateForm = (item,id) => {
        setIsOpen(true)
        setContent(<FormSchedule close={openModal} data={item} sale_id={id}/>)
    }

    const handleDelete = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar esta Orden de compra?', icon: 'warning', showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_schedule_manufacturing(id))
            }
        })
    }

    return (<Planning>
        <Helmet>
            <title>MPS</title>
        </Helmet>
        <Modal isOpen={isOpen} close={openModal} children={content}/>
        <NavManufacturing/>
        <div>
            <DisclosurePlanning handleAdd={handleAddForm} handleUpdate={handleUpdateForm} handleDelete={handleDelete}
                                data={payload ? payload : []}/>
        </div>
    </Planning>);
};

export default Production;
