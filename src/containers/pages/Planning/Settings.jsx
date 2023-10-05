import React from 'react';
import Planning from "./Home";
import {Popover} from "@headlessui/react";
import {NavLink} from "react-router-dom";
import {ChevronRightIcon} from "@heroicons/react/24/solid";
import {Helmet} from "react-helmet";

const Settings = ({children}) => {
    return (<Planning>
        <Helmet>
            <title>Configuración</title>
        </Helmet>
        <Popover className=" w-full relative top-2  px-8 py-0 ">
            <div className="flex flex-row bg-white shadow-md rounded-r-2xl ">
                <Popover.Group
                    className="flex flex-col text-sm bg-gray-300 bg-opacity-20 w-1/2 md:w-1/6  overflow-hidden scrollbar-hide ">
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
                        Categorías
                        <ChevronRightIcon className={"md:w-4 w-2"}/>
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
