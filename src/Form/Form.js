import './Form.css';
import { useState } from 'react';
import { postResy } from '../apiCalls';

function Form({ addResy }) {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [number, setNumber] = useState('');
    const [apiError, setApiError] = useState('');
    const [formError, setFormError] = useState('');

    function handleClick(e) {
        e.preventDefault();
        setApiError('');
        setFormError('');

        if(!name || !date || !time || !number) {
            return setFormError('Please fill in all fields.')
        } else {
            const newResy = {
                name: name,
                date: date,
                time: time,
                number: parseInt(number)
            }
            postResy(newResy)
                .then(data => addResy(data))
                .catch(err => setApiError(err))
        }
        clearInputs();
    }

    function clearInputs() {
        setName('');
        setDate('');
        setTime('');
        setNumber('');
    }

    return (
        <>
            { apiError && <h2 className="error">{apiError}</h2> }
            { formError && <h2 className="error">{formError}</h2> }
            <div className='resy-form'>
                <form className="resy-form">
                    <input 
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type='text'
                        placeholder='Date (mm/dd)'
                        name='date'
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                    <input 
                        type='text'
                        placeholder='Time'
                        name='time'
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />
                    <input 
                        type='number'
                        placeholder='Number of guests'
                        name='number'
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                        min='1'
                    />
                    <button className="btn" onClick={e => handleClick(e)}>
                        Make Reservation
                    </button>
                </form>
            </div>
        </>
    )
}

export default Form;