import React, {useState} from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const Filter = ({dispatch, action, dateField}) => {
    const [formData, setFormData] = useState({name: '', start_date: '', end_date: ''})
    const [date, setDate] = useState();

    const searchFilter = () => {
        dispatch(action(formData))
    }
    const onDateChange = (e) => {
        setDate(e)
        setFormData({
            ...formData,
            start_date: e?.[0] ? new Date(e?.[0]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : '',
            end_date: e?.[1] ? new Date(e?.[1]).toLocaleDateString('es-PE', {timeZone: 'America/Lima'}) : ''
        })
    }

    return (<div className={"sm:flex hidden gap-2 bg-white rounded-full"}>
        {dateField && <DateRangePicker
            className={`z-[100] rounded-2xl bg-white w-max text-gray-400 text-xs h-10 px-10 pr-10 rounded-full text-sm focus:outline-none   `}
            calendarClassName={"border-1"} onChange={onDateChange}
            value={date}/>}

        <div className="relative text-gray-600">
            <input
                type="search"
                name="search"
                placeholder="Buscar"
                value={formData?.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
            />
            <button onClick={() => searchFilter()} type="button" className="absolute right-0 top-0 mt-3 mr-4">
                <svg
                    className="h-4 w-4 fill-current"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 56.966 56.966"
                    width="420px"
                    height="420px"
                >
                    <path
                        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                </svg>
            </button>
        </div>


    </div>);
};

export default Filter;
