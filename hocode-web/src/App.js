import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import CoursePage from "./components/coursePage/CoursePage";
import TaskPage from "./components/taskPage/TaskPage";
import MiniTaskPage from "./components/minitaskPage/MiniTaskPage";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/" exact component={() => <div>trang chu</div>} />
        <Route path="/courses" exact component={CoursePage} />
        <Route path="/courses/:courseId/tasks" component={TaskPage} />
        <Route path="/tasks/:taskId" component={MiniTaskPage} />
        <Route render={() => <div>404 Page Not Found</div>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
