import React from 'react';
import {NavLink} from "react-router-dom";
import {Popover} from "@headlessui/react";

const NavContacts = () => {
    return (
        <Popover.Group as="nav" className="flex  text-sm w-full border-b-4 border-green-500 overflow-scroll scrollbar-hide relative">
            <NavLink to="/planning/contacts/customers"
                     className={window.location.pathname === '/planning/contacts/customers' ? 'ml-4 text-xs  font-medium text-white bg-green-400 px-6 flex flex-col justify-center items-center' : 'mt-2 text-xs px-6 font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                Clientes
            </NavLink>
            <NavLink to="/planning/contacts/suppliers"
                     className={window.location.pathname === '/planning/contacts/suppliers' ? ' text-xs  font-medium text-white bg-green-400 px-6 flex flex-col justify-center items-center' : 'mt-2 text-xs px-6  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                Proveedores
            </NavLink>
             <NavLink to="/planning/contacts/suppliers_rw"
                     className={window.location.pathname === '/planning/contacts/suppliers_rw' ? ' text-xs  font-medium text-white bg-green-400 px-6 flex flex-col justify-center items-center' : 'mt-2 text-xs px-6  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                Proveedores MP
            </NavLink>
            <NavLink to="/planning/contacts/transport"
                     className={window.location.pathname === '/planning/contacts/transport' ? ' text-xs  font-medium text-white bg-green-400 px-6 flex flex-col justify-center items-center' : 'mt-2 text-xs px-6  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
               Transportes
            </NavLink>
            <NavLink to="/planning/contacts/outsourcing"
                     className={window.location.pathname === '/planning/contacts/outsourcing' ? ' text-xs  font-medium text-white bg-green-400 px-6 flex flex-col justify-center items-center' : 'mt-2 text-xs px-6  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                Plantas
            </NavLink>

        </Popover.Group>
    );
};

export default NavContacts;
