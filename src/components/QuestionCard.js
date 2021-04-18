import React, { useState, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Segment, Header, Grid, Image, Button, Form, Radio, Progress , Label, Icon} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { handleSaveQuestionAnswer } from '../actions/questions'


export default function QuestionCard(props) {
    const { question, unanswered = null , author, listView, authedUser} = props
    const qid = question.id

    const [id, setId] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [answer, setAnswer] = useState('')

    const userVote = author.answers[question.id]
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes

    const dispatch = useDispatch()
    
    const handleClick = () => {
        setId(qid)
        setRedirect(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (answer) {
            dispatch(handleSaveQuestionAnswer({ authedUser, qid, answer }))
        }
    }

    const handleChange = (e, { value }) => {
        setAnswer(value)
    }

    if (redirect) {
        return <Redirect to={`/question/${id}`} />
    }

    const questionView = () => (
        <Fragment>
            {question.optionOne.text + ' or ...' }
            <br></br><br></br>
            <Button
                size='small'
                fluid
                color='blue'
                inverted={true}
                onClick={handleClick}
                content='View Poll'
            />
        </Fragment>
    )

    const answerPoll = () => (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <Radio
                        label={question.optionOne.text}
                        value='optionOne'
                        name='radioGroup'
                        checked={answer === 'optionOne'}
                        onChange={handleChange}
                    />
                    <br />
                    <Radio
                        label={question.optionTwo.text}
                        value='optionTwo'
                        name='radioGroup'
                        checked={answer === 'optionTwo'}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Button
                        size='small'
                        fluid
                        color='green'
                        positive
                        disabled={answer === ''}
                        content='Submit'
                    />
                </Form.Field>
            </Form>
        </Fragment>
    )

    const showResult = () => (
        <Fragment>
            <Segment color={userVote === 'optionOne' ? 'teal' : 'grey'}>
                {userVote === 'optionOne' && 
                    <Label color='green' corner='right'>
                        <Icon name='check circle outline' size='tiny' />
                    </Label>}
                <p>Would you rather {question.optionOne.text}</p>
                <Progress
                    percent={(( optionOneVotes / totalVotes ) * 100).toFixed(2)}
                    progress
                    color='teal'
                >
                {optionOneVotes} out of {totalVotes} votes
                </Progress>
            </Segment>
            <Segment color={userVote === 'optionTwo' ? 'teal' : 'grey'}>
                {userVote === 'optionTwo' && 
                    <Label color='green' corner='right'>
                        <Icon name='check circle outline' size='tiny' />
                    </Label>}                
                <p>Would you rather {question.optionTwo.text}</p>
                <Progress
                    percent={(( optionTwoVotes / totalVotes ) * 100).toFixed(2)}
                    progress
                    color='teal'
                >
                {optionTwoVotes} out of {totalVotes} votes
                </Progress>
            </Segment>
        </Fragment>
    )

    return (
        <Segment.Group key={question.id}>
            <Header as='h4' block textAlign='left' attached='top'>
                {(unanswered || listView) ? author.name + ' asks:' : 'Asked by ' + author.name}
            </Header>

            <Grid divided padded>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Image src={author.avatarURL} />
                    </Grid.Column>
                    <Grid.Column width={10}>                     
                        <Header as='h4' textAlign='left'>
                            {!unanswered ? 'Results:' : 'Would you rather' }
                        </Header>
                        {listView ? 
                            questionView() : 
                            unanswered ? 
                                answerPoll() : 
                                showResult()
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment.Group>
    )
}

