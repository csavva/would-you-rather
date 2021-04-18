import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Label, Grid, Image, Header } from 'semantic-ui-react'

class Leaderboard extends Component {
    
    render() {
        const { users } = this.props;

        const trophyColors = [ 'yellow', 'green', 'grey']

        const data = Object.values(users).map((user) => {
            return {
                id: user.id,
                name: user.name,
                avatar: user.avatarURL,
                answersCount: Object.values(user.answers).length,
                questionsCount: user.questions.length,
                totalCount: Object.values(user.answers).length + user.questions.length
            }
        }).sort((a,b) => b.totalCount - a.totalCount)

        return (
            <div>
                {data.map((user, i) =>(                       
                    <Segment.Group key={user.id} >
                        <Label corner='left' icon='trophy' color={i <= 2 ? trophyColors[i]: ''} />
                        <Grid divided padded>
                            <Grid.Row>
                                <Grid.Column width={4} verticalAlign='middle'>
                                    <Image
                                        src={user.avatar}
                                    />
                                </Grid.Column>
                                <Grid.Column width={8} verticalAlign='middle'>
                                    <Header as='h3'>
                                        {user.name}
                                    </Header>
                                    <Grid>
                                        <Grid.Column width={12}>Answered questions</Grid.Column>
                                        <Grid.Column width={4}>{user.answersCount}</Grid.Column>
                                    </Grid>
                                    <Grid>
                                        <Grid.Column width={12}>Unanswered questions</Grid.Column>
                                        <Grid.Column width={4}>{user.questionsCount}</Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={4} textAlign='center'>
                                    <Segment.Group>
                                        <Header as='h3' block attached='top'>
                                            Score
                                        </Header>
                                        <Segment>
                                            <Label circular color='teal' size='big'>
                                                {user.totalCount}
                                            </Label>
                                        </Segment>
                                    </Segment.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment.Group>                 
                ))}
            </div>
        )
    }
}

function mapStateToProps({ users }, props){
    return {
        users,
    }
}

export default connect(mapStateToProps)(Leaderboard)