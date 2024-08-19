/* eslint-disable react/prop-types */

import { useState } from 'react'

const Button = ({ handleClick, buttonName }) => <button onClick={handleClick}>{buttonName}</button>;

const StatisticsLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>;

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  const statisticsData = [
    { text: "good", value: good },
    { text: "neutral", value: neutral },
    { text: "bad", value: bad },
    { text: "total", value: total },
    { text: "average", value: (good - bad) / total },
    { text: "positive", value: `${good / total * 100}%` }
  ];

  return (
    <table>
      <tbody>
        {statisticsData.map(statistic => (
          <StatisticsLine key={statistic.text} text={statistic.text} value={statistic.value} />
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} buttonName="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} buttonName="neutral" />
        <Button handleClick={() => setBad(bad + 1)} buttonName="bad" />
      </div>
      <h1>statistics</h1>
      {good || bad || neutral ? <Statistics good={good} bad={bad} neutral={neutral} /> : <p>No feedback given</p>}
    </>
  )
}

export default App