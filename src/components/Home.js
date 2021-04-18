import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import QuestionCard from './QuestionCard'

const panes = ({answeredList, unansweredList, users, authedUser}) => {
    return [
        { 
            menuItem: 'Unanswered', 
            render: () => 
                unansweredList.length === 0 ?
                    <Tab.Pane key={'no-unanswered'}>
                        You havent answered any questions yet
                    </Tab.Pane>
                    :
                    <Tab.Pane key={'unanswered'}>
                        {unansweredList.map((q) => 
                            <QuestionCard 
                                key={q.id} 
                                question={q} 
                                unanswered={true} 
                                author={users[q.author]} 
                                listView={true}
                                authedUser={authedUser}
                            />
                        )}
                    </Tab.Pane> 
        },
        { 
            menuItem: 'Answered', 
            render: () => 
                answeredList.length === 0 ?
                    <Tab.Pane key={'no-answered'}>
                        You have answered all questions
                    </Tab.Pane>
                    :
                    <Tab.Pane key={'answered'}>
                        {answeredList.map((q) => 
                            <QuestionCard 
                                key={q.id} 
                                question={q} 
                                unanswered={false} 
                                author={users[q.author]} 
                                listView={true}
                                authedUser={authedUser}
                            />
                        )}
                    </Tab.Pane> 
        },
    ]
}


class Home extends Component {
    render() {
        const { unansweredList, answeredList, users, authedUser } = this.props;

        return (
            <div>
                <Tab 
                    key={0}
                    menu={{
                        secondary: true, 
                        pointing: true
                    }}
                    panes={panes({answeredList, unansweredList, users, authedUser})}
                />
            </div>
        )
    }
}


function mapStateToProps({ authedUser, questions, users}){
    const answered = Object.keys(users[authedUser].answers)
    const answeredList = Object.values(questions)
        .filter((question) => answered.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    const unansweredList = Object.values(questions)
        .filter((question) => !answered.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp);
    
    return {
        answeredList,
        unansweredList,
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Home)