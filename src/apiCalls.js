function fetchResy() {
    return fetch('http://localhost:3001/api/v1/reservations')
        .then(res => {
            if(!res.ok) {
                throw new Error('Could not find any reservations.')
            }
            return res.json()
        })
}

function postResy(newResy) {
    return fetch('http://localhost:3001/api/v1/reservations', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newResy)
    })
    .then(res => {
        if(!res.ok) {
            throw new Error('Unable to add new reservation.')
        }
        return res.json()
    })
}

export { fetchResy, postResy };