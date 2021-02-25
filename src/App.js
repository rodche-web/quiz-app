import React, {useState, useEffect} from 'react'
import './App.css'

const App = () => {
    const [items, setItems] = useState([])
    const [count, setCount] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(()=> {
        fetch('https://opentdb.com/api.php?amount=10&category=23&type=multiple')
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            throw res
        })
        .then(data => {
            console.log(data)
            setItems(data.results)
        })
        .catch(e => console.log(e))
        .finally(() => setLoading(false))
    },[])

    const checkAnswer = e => {
        let newCount = 0
        if (e.target.value === items[count].correct_answer) {
            setScore(score => score + 1)
            newCount = count + 1
        } else {
            newCount = count + 1
        }

        if (newCount < items.length) {
            setCount(newCount)
        } else {
            setShowScore(true)
        }
    }

    return (
        <div className='quiz-container'>
            <h1>Quiz App</h1>
            {loading ? 
            (<h3>Loading...</h3>) : 
            (<div>
                <h3>{items[count].question}</h3>
                {[items[count].correct_answer, ...items[count].incorrect_answers]
                .sort((a,b) => 0.5 - Math.random())
                .map(item => <button onClick={checkAnswer} value={item} disabled={showScore}>{item}</button>)}
            </div>)}
                {showScore && <h1>Thank You! Your score: {score}</h1>}
        </div>
    )
}

export default App
