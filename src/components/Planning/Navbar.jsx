import React, {Fragment} from 'react';
import {Popover, Transition} from "@headlessui/react";
import {Link, NavLink} from "react-router-dom";
import {
    Bars3Icon,
    BuildingStorefrontIcon,
    HandRaisedIcon,
    RectangleGroupIcon,
    ShoppingBagIcon,
    StarIcon,
    UsersIcon
} from "@heroicons/react/24/solid";
import {Cog6ToothIcon} from "@heroicons/react/20/solid";


const items = [

    {
        name: 'Ventas',
        description: "Your customers' data will be safe and secure.",
        href: '#',
        icon: BuildingStorefrontIcon
    },
    {name: 'Producción', description: "Your customers' data will be safe and secure.", href: '#', icon: HandRaisedIcon},
    {name: 'Compras', description: "Your customers' data will be safe and secure.", href: '#', icon: ShoppingBagIcon},
    {name: 'Stock', description: "Your customers' data will be safe and secure.", href: '#', icon: RectangleGroupIcon},
    {name: 'Artículos', description: "Your customers' data will be safe and secure.", href: '#', icon: StarIcon},
    {name: 'Contactos', description: "Your customers' data will be safe and secure.", href: '#', icon: UsersIcon},
    {
        name: 'Configuración',
        description: "Your customers' data will be safe and secure.",
        href: '#',
        icon: Cog6ToothIcon
    },

]
const Navbar = () => {
    return (

        <>
            <Popover className="relative bg-white w-full relative -top-2 ">
                <div className="absolute inset-0 z-30 pointer-events-none" aria-hidden="true"/>
                <div className="relative z-20">
                    <div
                        className="max-w-7xl mx-auto flex justify-between items-center p-2 md:justify-start md:space-x-10">
                        <div>
                            <Link to="/planning" className="flex flex-col items-center justify-center">
                                <span className="sr-only text-red-400">S&OP</span>
                                <img
                                    className="h-12"
                                    src="https://icons.veryicon.com/png/o/business/official-icon-library-of-supply-chain/sop.png"
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            <Popover.Button
                                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                                <span className="sr-only">Open</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                            </Popover.Button>
                        </div>
                        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                            <Popover.Group as="nav" className="flex space-x-10 text-sm">

                                <NavLink to="/planning/sales"
                                         className={window.location.pathname === '/planning/sales'||window.location.pathname === '/planning/sales/done' ? ' text-xs  font-medium text-green-500 hover:text-green-400 flex flex-col justify-center items-center' : 'mt-2 text-xs  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                                    <BuildingStorefrontIcon className={"w-8"}/>
                                    VENTAS
                                </NavLink>
                                <NavLink to="/planning/manufacturing"
                                         className={window.location.pathname === '/planning/manufacturing' || window.location.pathname ==='/planning/manufacturing/calendar' ? ' text-xs  font-medium text-green-500 hover:text-green-400 flex flex-col justify-center items-center' : 'mt-2 text-xs  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                                    <HandRaisedIcon className={"w-8"}/>
                                    PRODUCCION
                                </NavLink>
                                <NavLink to="/planning/purchases"
                                         className={window.location.pathname === '/planning/purchases' || window.location.pathname === '/planning/purchases/done' ? ' text-xs  font-medium text-green-500 hover:text-green-400 flex flex-col justify-center items-center' : 'mt-2 text-xs  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                                    <ShoppingBagIcon className={"w-8"}/>
                                    COMPRAS
                                </NavLink>
                                <NavLink to="/planning/inventory"
                                         className={window.location.pathname === '/planning/inventory' ||
                                              window.location.pathname === '/planning/inventory/input' ||
                                              window.location.pathname === '/planning/inventory/output' ||
                                             window.location.pathname === '/planning/inventory/reentry'
                                             ? ' text-xs  font-medium text-green-500 hover:text-green-400 flex flex-col justify-center items-center' : 'mt-2 text-xs  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                                    <RectangleGroupIcon className={"w-8"}/>
                                    STOCK
                                </NavLink>
                                <NavLink to="/planning/products"
                                         className={window.location.pathname === '/planning/products' || window.location.pathname === '/planning/materials' ? ' text-xs  font-medium text-green-500 hover:text-green-400 flex flex-col justify-center items-center' : 'mt-2 text-xs  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                                    <StarIcon className={"w-8"}/>
                                    ARTÍCULOS
                                </NavLink>
                                <NavLink
                                    to="/planning/contacts/customers"
                                    className={
                                        window.location.pathname === '/planning/contacts/customers' ||
                                        window.location.pathname === '/planning/contacts/outsourcing' ||
                                        window.location.pathname === '/planning/contacts/transport' ||
                                        window.location.pathname === '/planning/contacts/suppliers_rw' ||
                                        window.location.pathname === '/planning/contacts/suppliers'
                                            ? 'text-xs font-medium text-green-500 hover:text-green-400 flex flex-col justify-center items-center'
                                            : 'mt-2 text-xs font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'
                                    }
                                >
                                    <UsersIcon className={"w-8"}/>
                                    CONTACTOS
                                </NavLink>
                                <NavLink to="/planning/settings"
                                         className={window.location.pathname === '/planning/settings' ? ' text-xs  font-medium text-green-500 hover:text-green-400 flex flex-col justify-center items-center' : 'mt-2 text-xs  font-medium text-gray-500 hover:text-green-400 flex flex-col justify-center items-center'}>
                                    <Cog6ToothIcon className={"w-8"}/>
                                    CONFIGURACIÓN
                                </NavLink>

                            </Popover.Group>
                        </div>
                    </div>
                </div>

                <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        focus
                        className="absolute z-[200] top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden bg-white"
                    >
                        <div
                            className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                            <div className="pt-5 pb-6 px-5 sm:pb-8">
                                <div className="flex items-center justify-end">
                                    <div className="-mr-2">
                                        <Popover.Button
                                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                                            <span className="sr-only">Close</span>
                                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="mt-6 sm:mt-8">
                                    <nav>
                                        <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                                            {items.map((item) => (<a
                                                key={item.name}
                                                href={item.href}
                                                className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                                            >
                                                <div
                                                    className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-green-500 text-white sm:h-12 sm:w-12">
                                                    <item.icon className="h-6 w-6" aria-hidden="true"/>
                                                </div>
                                                <div
                                                    className="ml-4 text-base font-medium text-green-700">{item.name}</div>
                                            </a>))}
                                        </div>
                                    </nav>
                                </div>
                            </div>

                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </>

    )

};

export default Navbar;
