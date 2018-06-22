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

  generateChoices (choices) {
    var renderedChoices = choices.map((choice) => {
      return (
        <option
          key={choice}
          name='choice'
          value={choice}
          dangerouslySetInnerHTML={{__html: choice}} />
      )
    })
    return renderedChoices
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(event.target.choices.value)
  }

  render () {
    // const ChangeFn = this.handleSubmit.bind(this)
    const { error, isLoaded, questions } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <div>
            {questions.map((q, idx) => (
              <div key={q.question}>
                <div>
                  <h2>{q.category}</h2>
                </div>
                <div>
                  <p dangerouslySetInnerHTML={{__html: q.question}} />
                </div>
                <form onSubmit={this.handleSubmit}>
                  <select name='choices'>
                    <option>--Please choose an option--</option>
                    {
                      this.generateChoices(this.state.answers[idx])
                    }
                  </select>
                  <button type='submit'>Submit</button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
}

export default App
