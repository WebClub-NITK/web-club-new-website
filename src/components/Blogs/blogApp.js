import React, { Component } from 'react'
import { Route, Switch, matchPath } from 'react-router-dom'
import BlogHome from './BlogsHome'
import authApi from './../../_services/authApi'
import BlogDisplay from './BlogDisplay'
import Editor from './editor'
// import pagenotfound from './../pagenotfound'
class blogApp extends Component {
    constructor(props) {
        super(props)
        this.path = matchPath()
        this.state = {
            logedIn: true,
        }
    }
    componentDidMount = async () => {
        let loged_in = await authApi.validateToken();
        if (loged_in === true) {
            this.setState({
                logedIn: true
            })
        }
    }
    login = () => {
        this.setState({
            logedIn: true
        })
    }
    logout = () => {
        this.setState({
            logedIn: false
        })
    }


    render() {
        return (
            <Switch>
                <Route exact path={`/blog`}>
                    <BlogHome isLogedIn={this.state.logedIn} login={this.login} logout={this.logout} {...this.props} />
                </Route>
                <Route exact path="/blog/editor" >
                    <Editor isLogedIn={this.state.logedIn} login={this.login} logout={this.logout} {...this.props} />
                </Route>
                <Route exact path="/blog/editor/editblog" >
                    <Editor isLogedIn={this.state.logedIn} login={this.login} logout={this.logout} {...this.props} />
                </Route>
                <Route exact path={`/blog/:slug`} component={BlogDisplay} />
            </Switch>
        )
    }
}

export default blogApp
