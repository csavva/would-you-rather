import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { Menu, Image, Container, Button } from 'semantic-ui-react'

class Nav extends Component {

  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(null))
  }

  render () {
    const { authedUser, users } = this.props
    return (
      <Container>
          <Menu
            size='huge'
            color='teal'
            tabular
          >
            <Menu.Item
              as={NavLink} to="/"
              name='home'
              exact
            />
            <Menu.Item
              as={NavLink} to="/add"
              name='new question'
            />
            <Menu.Item
              as={NavLink} to="/leaderboard"
              name='leaderboard'
            /> 
            {authedUser !== null ? 
              <Menu.Menu position='right' inverted="true">
                <Menu.Item>
                  <span>
                    <Image
                      src={users[authedUser].avatarURL}
                      avatar
                      spaced='right'
                      verticalAlign='bottom'
                    />
                    Hello, { users[authedUser].name }
                  </span>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    content='Logout'
                    labelPosition='right'
                    basic
                    size='mini'
                    icon='log out'
                    onClick={this.handleLogout}
                  />
                  </Menu.Item>
                </Menu.Menu>
                : ''
              }
          </Menu>
      </Container>
    )
  }

}

function mapStateToProps ({ authedUser , users }) {

  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Nav)