import React from 'react';
import Planning from "./Home";
import {Popover} from "@headlessui/react";
import {NavLink} from "react-router-dom";
import {ChevronRightIcon} from "@heroicons/react/24/solid";
import {Helmet} from "react-helmet";

const Settings = ({children}) => {
    return (<Planning >
        <Helmet>
            <title>Configuración</title>
        </Helmet>
        <Popover className=" w-full relative top-2  px-8 py-0 ">
            <div className="flex flex-row bg-white shadow-md rounded-r-2xl ">
                <Popover.Group className="flex flex-col text-sm bg-gray-300 bg-opacity-20 w-1/2 md:w-1/6  overflow-hidden scrollbar-hide ">
                    <NavLink
                        to="/planning/settings/storage-area"
                        className={window.location.pathname === "/planning/settings/storage-area" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Zonas
                        <ChevronRightIcon className={"md:w-4 w-2"}/>
                    </NavLink>
                    <NavLink
                        to="/planning/settings/location"
                        className={window.location.pathname === "/planning/settings/location" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Localización de envío
                        <ChevronRightIcon className={"md:w-4 w-2"}/>
                    </NavLink>
                    <NavLink
                        to="/planning/settings/cost-production"
                        className={window.location.pathname === "/planning/settings/cost-production" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Costos de producción
                        <ChevronRightIcon className={"md:w-4 w-2"}/>
                    </NavLink>
                    <NavLink
                        to="/planning/settings/unit-of-measurement"
                        className={window.location.pathname === "/planning/settings/unit-of-measurement" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Unidad de medida
                        <ChevronRightIcon className={"md:w-4 w-2"}/>
                    </NavLink>
                    <NavLink
                        to="/planning/settings/categories"
                        className={window.location.pathname === "/planning/settings/categories" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Categorias
                        <ChevronRightIcon className={"md:w-4 w-2"}/>
                    </NavLink>
                    <NavLink
                        to="/planning/settings/tax"
                        className={window.location.pathname === "/planning/settings/tax" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Impuestos
                        <ChevronRightIcon className={"md:w-4 w-2"}/>
                    </NavLink>
                    <NavLink
                        to="/planning/settings/currency"
                        className={window.location.pathname === "/planning/settings/currency" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Moneda
                        <ChevronRightIcon className={"md:w-4 w-2"}/>
                    </NavLink>
                    <NavLink
                        to="/planning/settings/condition"
                        className={window.location.pathname === "/planning/settings/condition" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Condición
                        <ChevronRightIcon className={"md:w-4 w-2"}/>
                    </NavLink>
                    <NavLink
                        to="/planning/settings/family"
                        className={window.location.pathname === "/planning/settings/family" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Familia
                        <ChevronRightIcon className={"md:w-4 w-2"}/>
                    </NavLink>
                    <NavLink
                        to="/planning/settings/subfamily"
                        className={window.location.pathname === "/planning/settings/subfamily" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Subfamilia
                        <ChevronRightIcon className={"md:w-4 w-2"}/>
                    </NavLink>
                    <NavLink
                        to="/planning/settings/cut"
                        className={window.location.pathname === "/planning/settings/cut" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Corte
                        <ChevronRightIcon className={"md:w-4 w-2"}/>
                    </NavLink>
                    <NavLink
                        to="/planning/settings/packing"
                        className={window.location.pathname === "/planning/settings/packing" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Empaques
                        <ChevronRightIcon className={"md:w-4 w-2 "}/>
                    </NavLink>
                    <NavLink
                        to="/planning/settings/container"
                        className={window.location.pathname === "/planning/settings/container" ? "text-xs font-medium p-2 text-gray-800 bg-gray-300 bg-opacity-60 p-1 flex flex-row justify-between items-center" : "mt-2 text-xs font-medium p-2 text-gray-500 hover:text-gray-800 flex flex-row justify-between items-center"}
                    >
                        Envases
                        <ChevronRightIcon className={"md:w-4 w-2 "}/>
                    </NavLink>

                </Popover.Group>
                <div className={"w-5/6  overflow-hidden relative "}>
                    {children}
                </div>
            </div>
        </Popover>


    </Planning>);
};

export default Settings;
