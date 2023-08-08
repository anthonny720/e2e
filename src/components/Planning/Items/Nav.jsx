import React from 'react';
import {NavLink} from "react-router-dom";
import {Popover} from "@headlessui/react";

const NavItems = () => {
    return (<Popover.Group as="nav"
                           className="flex  text-sm w-full border-b-4 border-green-500 overflow-scroll scrollbar-hide relative">
            <NavLink to="/planning/products"
                     className={window.location.pathname === '/planning/products' ? 'ml-4 text-xs  font-medium text-white bg-green-400 px-6 flex flex-col justify-center items-center' : 'mt-2 text-xs px-6 font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                Productos
            </NavLink>
            <NavLink to="/planning/materials"
                     className={window.location.pathname === '/planning/materials' ? ' text-xs  font-medium text-white bg-green-400 px-6 flex flex-col justify-center items-center' : 'mt-2 text-xs px-6  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                Materiales
            </NavLink>
        </Popover.Group>);
};

export default NavItems;
