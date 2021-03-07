import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Members from "./components/members/member";
import Footer from "./components/footer";
import Events from "./components/Events/Event";
import blogApp from './components/Blogs/blogApp'
import pagenotfound from './components/pagenotfound'
// import Timeline from "./components/Timeline/timeline";
class App extends React.Component {
  render() {
    return (
      <>
        <div id="wrapper" className="d-flex flex-column">
          <main className="flex-fill">
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/members" component={Members} />
                <Route exact path="/events" component={Events} />
                {/* <Route exact path="/timeline" component={Timeline} /> */}
                <Route path="/blog" component={blogApp}/>
                <Route component={pagenotfound}/>
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
