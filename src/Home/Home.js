import './Home.css';
import { useState, useEffect } from 'react';
import Card from '../Card/Card';

function Home({ resy }) {
    const resyCards = resy.map((r) => {
            return (
                <Card 
                    id={r.id}
                    name={r.name}
                    date={r.date}
                    time={r.time}
                    number={r.number}
                    key={r.id}
                />
            )
    })
    

    return (
        <>
            {resyCards}
        </>
    )
}

export default Home;