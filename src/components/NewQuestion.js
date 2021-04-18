import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { Segment, Grid, Header, Form, Divider } from 'semantic-ui-react'


class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false,
    }

    handleChange = (e) => {
        const option = e.target.id

        if ( option === 'optionOne' ){
            this.setState(() => ({
                optionOneText: e.target.value
            }))
        }else if (option === 'optionTwo') {
            this.setState(() => ({
                optionTwoText: e.target.value
            }))
        }


    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOneText, optionTwoText } = this.state
        const { dispatch, id, authedUser} = this.props
        const author = authedUser
        dispatch(handleAddQuestion(author, optionOneText, optionTwoText))
        
        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: id ? false : true,
        }))
    }

    render() {
        const { optionOneText, optionTwoText, toHome } = this.state

        const { authedUser } = this.props

        if ( toHome === true || authedUser === null ) {
            return <Redirect to='/' />
        }

        return (
            <Segment.Group>
                <Header as="h3" block textAlign="center" attached="top" >
                    <Header.Content>Create New Question</Header.Content>
                </Header>

                <div>
                    <Grid padded textAlign="center">
                        <Grid.Row className="new-question">
                            <Grid.Column width={16}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <label>would you rather...</label>
                                    <input value={optionOneText} id="optionOne" onChange={this.handleChange}/>
                                    <Divider horizontal>Or</Divider>
                                    <input value={optionTwoText} id="optionTwo" onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Button 
                                    content="Submit" 
                                    fluid color="teal" 
                                    disabled={ optionOneText === '' || optionTwoText === ''} 
                                    icon='add' 
                                    labelPosition='left'
                                />
                            </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Segment.Group>
        )
    }
}

function mapStateToProps ({ authedUser }) {
  
    return {
      authedUser,
    }
  }
  
  export default connect(mapStateToProps)(NewQuestion)