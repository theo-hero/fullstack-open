/* eslint-disable react/prop-types */

import { useState } from "react"

const Anecdotes = () => {
    const getRandom = (min, max) => Math.round(Math.random() * (max - min) + min);
    const changeArray = (array, index) => {
        const copy = [...array];
        copy[index] += 1;
        return copy;
    }
    function indexOfMax(array) {
        let maxIndex = 0;
        for (let i = 1; i < array.length; i++) {
            if (array[i] > array[maxIndex]) {
                maxIndex = i;
            }
        }
        return maxIndex;
    }

    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]
    const anecdotesNumber = anecdotes.length;

    const [selected, setSelected] = useState(0);
    const [popular, setPopular] = useState(-1);
    const [votes, setVotes] = useState(new Array(anecdotesNumber).fill(0));

    const updateVotes = () => () => {
        const newVotes = changeArray(votes, selected);
        setVotes(newVotes); 
        setPopular(indexOfMax(newVotes));
    }

    return (
        <>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <button onClick={updateVotes()}>vote</button>
            <button onClick={() => setSelected(getRandom(0, anecdotesNumber))}>next anecdote</button>
            {popular != -1 && 
            <><h1>Anecdote with most votes</h1>
            <p>{anecdotes[popular]}</p>
            <p>has {votes[popular]} votes</p></>}
        </>
    )
}

export default Anecdotes;