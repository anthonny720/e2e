import React from 'react';
import {Tab} from "@headlessui/react";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Tabs = ({table1, table2}) => {
    return (<Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-green-400 bg-opacity-40 p-1">
            <Tab
                className={({selected}) => classNames('w-full overflow-hidden rounded-lg py-2.5 text-sm font-medium leading-5 text-green-700', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2', selected ? 'bg-white shadow' : 'text-green-100 hover:bg-white/[0.12] hover:text-white')}>
                Acondicionado
            </Tab>
            <Tab
                className={({selected}) => classNames('w-full overflow-hidden rounded-lg py-2.5 text-sm font-medium leading-5 text-green-700', 'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2', selected ? 'bg-white shadow' : 'text-green-100 hover:bg-white/[0.12] hover:text-white')}>
                Envasado
            </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
            <Tab.Panel>
                {table1}
            </Tab.Panel>
            <Tab.Panel>
                {table2}
            </Tab.Panel>
        </Tab.Panels>
    </Tab.Group>);
};

export default Tabs;
