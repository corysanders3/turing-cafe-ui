import './Card.css';

function Card({ id, name, date, time, number }) {

    return (
        <section className="cards" id={id}>
            <h3>{name}</h3>
            <p>{date}</p>
            <p>{time}</p>
            <p>Number of guests: {number}</p>
        </section>
    )
}

export default Card;