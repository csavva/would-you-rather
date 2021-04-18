import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addAnswerToUser, addQuestionToUser } from '../actions/users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function answerQuestion ( { authedUser, qid, answer }) {
    return {
        type : ANSWER_QUESTION,
        qid,
        authedUser,
        answer
    }
}

export function handleAddQuestion(author, optionOneText, optionTwoText) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author,
        })
            .then((question) => {
                dispatch(addQuestion(question))
                dispatch(addQuestionToUser(question))
            })
            .then(() => dispatch(hideLoading()))
    }
}

export function handleSaveQuestionAnswer ( info ) {
    return (dispatch) => {
        dispatch(answerQuestion(info))
        dispatch(addAnswerToUser(info))
        
        return saveQuestionAnswer(info)
            .catch((e) => {
                console.warn('Error in handleSaveQuestionAnswer: ', e)
                alert('There was an error voting for this question. Try again!')
            })
    }
}