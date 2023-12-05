import React from 'react';
import {NavLink} from "react-router-dom";
import {Popover} from "@headlessui/react";

const NavStock = () => {
    return (
        <Popover.Group as="nav" className="flex  text-sm w-full border-b-4 border-green-500 overflow-scroll scrollbar-hide relative">
            <NavLink to="/planning/inventory"
                     className={window.location.pathname === '/planning/inventory' ? 'ml-4 text-xs  font-medium text-white bg-green-400 px-6 flex flex-col justify-center items-center' : 'mt-2 text-xs px-6 font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                Stock
            </NavLink>
            <NavLink to="/planning/inventory/input"
                     className={window.location.pathname === '/planning/inventory/input' ? ' text-xs  font-medium text-white bg-green-400 px-6 flex flex-col justify-center items-center' : 'mt-2 text-xs px-6  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                Ingresos
            </NavLink>
            <NavLink to="/planning/inventory/output"
                     className={window.location.pathname === '/planning/inventory/output' ? ' text-xs  font-medium text-white bg-green-400 px-6 flex flex-col justify-center items-center' : 'mt-2 text-xs px-6  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                Salidas
            </NavLink>
            <NavLink to="/planning/inventory/reentry"
                     className={window.location.pathname === '/planning/inventory/reentry' ? ' text-xs  font-medium text-white bg-green-400 px-6 flex flex-col justify-center items-center' : 'mt-2 text-xs px-6  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                ReIngresos
            </NavLink>


        </Popover.Group>
    );
};

export default NavStock;
