import React, { Component } from 'react'
import './App.css'

function fetchFailed () {
  console.error('Could not get json data from backend')
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      error: null,
      isLoaded: false,
      answers: [],
      questions: []
    }
  }

  componentDidMount () {
    var answers = []

    fetch('http://localhost:9090/api/get-questions')
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          for (var i = 0; i < result.length; i++) {
            answers.push([result[i].correct_answer])
          }
          for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < result[i].incorrect_answers.length; j++) {
              answers[i].push(result[i].incorrect_answers[j])
            }

            // shuffle answers[i]
          }
          this.setState({
            isLoaded: true,
            questions: result,
            answers: answers
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
      .catch(fetchFailed)
  }

  handleSubmit (event) {
    const val = event.target.value
    console.log('checked', val)
  }

  render () {
    const ChangeFn = this.handleSubmit.bind(this)
    const { error, isLoaded, questions } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          {questions.map((q) => (
            <div key={q.question}>
              <div>
                <h2>{q.category}</h2>
              </div>
              <div>
                <p dangerouslySetInnerHTML={{__html: q.question}} />
              </div>
              <div>
                <label>
                  {q.correct_answer}
                  <input
                    name='answer'
                    type='checkbox'
                    onChange={ChangeFn}
                    value={q.correct_answer} />
                </label>
              </div>
              <div>
                <label>
                  {q.incorrect_answers[0]}
                  <input
                    name='incorrect_answer1'
                    type='checkbox'
                    onChange={ChangeFn}
                    value={q.incorrect_answers[0]} />
                </label>
              </div>
              <div>
                <label>
                  {q.incorrect_answers[1]}
                  <input
                    name='incorrect_answer2'
                    type='checkbox'
                    onChange={ChangeFn}
                    value={q.incorrect_answers[1]} />
                </label>
              </div>
              <div>
                <label>
                  {q.incorrect_answers[2]}
                  <input
                    name='incorrect_answer3'
                    type='checkbox'
                    onChange={ChangeFn}
                    value={q.incorrect_answers[2]} />
                </label>
              </div>
            </div>
          ))}
        </div>
      )
    }
  }
}

export default App
