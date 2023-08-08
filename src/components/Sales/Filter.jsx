import React, {useState} from 'react';
import 'react-nice-dates/build/style.css'
import RangeDate from "../util/RangeDate";

const Filter = ({action}) => {
    const [date, setDate] = useState()
    const [client, setClient] = useState()
    return (<form className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 ">
        <input type={'text'} value={client}
               onChange={(value) => setClient(value.target.value)}
               placeholder={'Cliente'}
               className="px-4 py-3 w-full rounded-md bg-gray-100 focus:border-green-500 focus:bg-white focus:ring-2 text-sm text-black"/>
        <RangeDate value={date} onChange={setDate}/>
        <button type={'button'} onClick={() => {
          const filter = {
                'client': client,
                'start_date': date ? new Date(date?.[0]).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : '',
                'end_date': date ? new Date(date?.[1]).toLocaleDateString('es-PE', {timeZone: 'UTC'}) : '',
        }
            action(filter)
        }}
                className="px-4 lg:ml-4 py-3 w-full rounded-md bg-green-500 text-sm text-white">Filtrar
        </button>
    </form>);
};

export default Filter;
