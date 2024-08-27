/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import noteService from "./services/contact";
import "./global.css";

const Popup = ({ message }) => {
    if (message === null) { return null }

    return (
        <div className={`message ${message.error ? "message_error" : ""}`}>
            {message.text}
        </div>
    )
}

const Filter = ({ changeFilter }) => {
    return (
        <>
            <p>filter shown with</p><input onChange={(event) => changeFilter(event.target.value.toLowerCase())} />
        </>)
}

const PersonForm = ({ people, setPeople, setMessage }) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newName || !newNumber) return;

        const newContact = { name: newName, number: newNumber };
        const repeating = people.findIndex((person) => person.name === newName);
        if (repeating != -1) {
            if (!window.confirm(`${newName} is already in the phonebook. Do you want to change the number?`)) { return };
            noteService
                .update(people[repeating].id, newContact)
                .then((res) => setPeople([...people.slice(0, repeating), res, ...people.slice(repeating + 1)]))
                .catch((error) => {
                    console.log(error);
                    setMessage({error: true, text: "There was a mistake, try reloading the page"});
                    setTimeout(() => setMessage(null), 5000);
                });
        } else {
            noteService
                .create(newContact)
                .then((res) => setPeople(people.concat(res)))
                .then(() => {
                    setMessage({error: false, text: "The contact is added to the phonebook"});
                    setTimeout(() => setMessage(null), 5000);
                });
        }

        setNewName('');
        setNewNumber('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input name="name" value={newName} onChange={(event) => setNewName(event.target.value)} />
            </div>
            <div>number: <input name="number" value={newNumber} onChange={(event) => setNewNumber(event.target.value)} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const People = ({ people, searchName, setPeople, setMessage}) => {

    const handleDelete = (personID, index) => {
        if (!window.confirm(`Are you sure you want to delete the number of ${people[index].name}?`)) { return }
        noteService
            .deleteEntry(personID)
            .then(() => {
                setMessage({error: false, text: "The number has been deleted"});
                setTimeout(() => setMessage(null), 5000);
            })
            .catch(error => {
                console.log(error);
                setMessage({error: true, text: "The number has already been deleted"});
                setTimeout(() => setMessage(null), 5000);
            });
        setPeople([...people.slice(0, index), ...people.slice(index + 1)]);
    }

    return (
        <table>
            <tbody>
                {people && people.filter(person => person.name.toLowerCase().includes(searchName)).map((person, index) => (
                    <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                        <td><button onClick={() => handleDelete(person.id, index)}>delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const App = () => {
    const [people, setPeople] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        noteService.getAll().then((data) => setPeople(data));
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter changeFilter={setSearchName} />
            <h2>add a new</h2>
            <PersonForm people={people} setPeople={setPeople} setMessage={setMessage} />
            <Popup message={message} />
            <h2>Numbers</h2>
            <People people={people} searchName={searchName} setPeople={setPeople} setMessage={setMessage} />
        </div>
    );
};

export default App;