import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { Segment, Grid, Header, Form } from 'semantic-ui-react'

class SignIn extends Component {
    state = {
        userSelection: '',
    }

    handleChange = (e, data) => {
        this.setState(() => ({
            userSelection: data.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { userSelection } = this.state
        const { dispatch, id } = this.props
        dispatch(setAuthedUser(userSelection))
        
        this.setState(() => ({
            userSelection: '',
            toHome: id ? false : true,
        }))
    }

    render() {
        const { users , authedUser} = this.props
        
        if ( authedUser ) {
            return <Redirect to='/' />
        }

        const usersList = Object.values(users)

        return (
            <Segment.Group>
                <Header as="h3" block textAlign="center" attached="top" >
                    <Header.Content>Welcome to the Would You Rather App!</Header.Content>
                    <Header.Subheader>Please sign in to continue</Header.Subheader>
                </Header>

                <div>
                    <Grid padded textAlign="center">
                        <Grid.Row className="signin">
                            <Grid.Column width={16}>

                            <Form onSubmit={this.handleSubmit}>
                                <Header as="h2" color="teal">
                                    Sign In
                                </Header>
                                <Form.Dropdown
                                    placeholder="Select a user from the dropdown"
                                    fluid
                                    selection
                                    options={usersList.map((user) => (
                                        {
                                            key: user.id,
                                            text: user.name,
                                            value: user.id,
                                            image: { 
                                                src: user.avatarURL,
                                                avatar: true
                                            }
                                        }
                                    ))}
                                    onChange={this.handleChange}
                                    required
                                />
                                <Form.Button content="Submit" fluid color="teal"/>
                            </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Segment.Group>
        )
    }
}

function mapStateToProps({ authedUser, users }, props){
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(SignIn)