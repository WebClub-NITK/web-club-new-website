import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Members from "./components/members/member";
import Footer from "./components/footer";
import Events from "./components/Events/Event";
import Timeline from "./components/Timeline/timeline";
import Editor from "./components/Blogs/editor";
import BlogsHome from "./components/Blogs/blogsHome";
import Blog from "./components/Blogs/blogDisplay";
// import Myproject from "./components/mystuff/project";
import { AuthContextProvider } from './_services/AuthContext'
import pagenotfound from './components/pagenotfound'
import authApi from './_services/authApi'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logedIn: false
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
    var privateUrl;
    if (this.state.logedIn) {
      privateUrl = [<Route exact path="/editor" component={Editor} key="1" />, <Route exact path="/editor/editblog/:id" component={Editor} key="2" />];
    } else {
      privateUrl = <Route component={pagenotfound} />;
    }
    return (
      <>
        <div id="wrapper" className="d-flex flex-column">
          <main className="flex-fill">
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/members" component={Members} />
                <Route exact path="/events" component={Events} />
                <Route exact path="/timeline" component={Timeline} />
                <AuthContextProvider value={{ isLogedIn: this.state.logedIn, login: this.login, logout: this.logout }} >
                  <Switch>
                    <Route exact path="/blogs" component={BlogsHome} />
                    <Route exact path="/blogs/:heading" component={Blog} />
                    {privateUrl}
                    <Route component={pagenotfound} />
                  </Switch>
                </AuthContextProvider>
                
              </Switch>
            </Router>
          </main>
          <Footer />
        </div>
      </>
    );
  }
}

export default App;
