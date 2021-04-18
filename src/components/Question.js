import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/questions'
import { withRouter } from 'react-router-dom'
import QuestionCard from './QuestionCard'

class Question extends Component {

    render() {
        const { authedUser, questions ,users } = this.props
        const user = authedUser ? users[authedUser].name : ''
        const qid = this.props.match.params.id
        const question = questions[qid]
        const unanswered = !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser) 

        if( question === undefined ) {
            return <p> This question doesn't exist</p>
        }

        return (
            <QuestionCard 
                question={question} 
                unanswered={unanswered} 
                author={users[question.author]} 
                listView={false}
                authedUser={authedUser}
                />
        )
    }
}


function mapStateToProps({ authedUser, questions, users }, props ){
    
    return {
        authedUser, 
        questions, 
        users
    }
}

export default withRouter(connect(mapStateToProps)(Question))