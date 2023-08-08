import React from 'react';

const Filter = ({formData, onChange}) => {

    const {lot, } = formData


    return (<div className="w-full  rounded-lg bg-white text-black">
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2  gap-4 mt-4 p-2 ">
                <input
                    id={"lot"}
                    name={"lot"}
                    placeholder={"Lote"}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    value={lot}
                    onChange={e => onChange(e)}
                />
            </div>
        </div>

    );
};

export default Filter;
