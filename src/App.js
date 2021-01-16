import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Members from "./components/members/member";
import Footer from "./components/footer";
import Events from "./components/Events/Event";
import Timeline from "./components/Timeline/timeline";
import Editor from "./components/Blogs/editor";
import Blogs from "./components/Blogs/blogsHome";
import Blog from "./components/Blogs/blogDisplay";
// import Myproject from "./components/mystuff/project";

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
                <Route exact path="/timeline" component={Timeline} />
                <Route exact path="/blogs" component={Blogs} />
                <Route exact path="/editor" component={Editor} />
                <Route exact path="/editor/editblog/:id" 
                render={(props) => (
                  <Editor {...props} newVar={props} isAuthed={true} />
                )} />
                <Route exact path="/blogs/:heading" component={Blog} />
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
