import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Leaderboard from './Leaderboard'
import Home from './Home'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import NewQuestion from './NewQuestion'
import Question from './Question'
import SignIn from './SignIn'
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Segment } from 'semantic-ui-react'

class App extends Component {
  componentDidMount(){
    this.props.handleInitialData()
  }

  render() {
    const { authedUser } = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <Container>
            <Segment basic style={{ minHeight: 100 }} floated='left'>
              <Nav />
            </Segment>
            <Grid padded='vertically' centered columns={1}>
              <Grid.Row>
                <Grid.Column style={{ maxWidth: 500 }}>
                  <Switch>
                  <PrivateRoute path='/' exact component={Home} authedUser={authedUser} />
                  <PrivateRoute path='/leaderboard' component={Leaderboard} authedUser={authedUser} />
                  <PrivateRoute path='/add' component={NewQuestion} authedUser={authedUser} />
                  <PrivateRoute path='/question/:id' component={Question} authedUser={authedUser} />
                  <Route exact path="/signin" component={SignIn} />
                </Switch>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps, { handleInitialData })(App)