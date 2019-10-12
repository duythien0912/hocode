import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CoursePage from "./components/coursePage/CoursePage";
import TaskPage from "./components/taskPage/TaskPage";
import MiniTaskPage from "./components/minitaskPage/MiniTaskPage";
import HomePage from "./components/homePage/HomePage";
import LoginPage from "./components/loginPage/LoginPage";
import SignUpPage from "./components/signUpPage/SignUpPage";
import ReactMde from './components/minitaskPage/ReactMde';
import CreateMiniTask from './components/createMinitaskPage/CreateMiniTaskPage';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="/reactmde" exact component={ReactMde} />
          <Route path="/courses" exact component={CoursePage} />
          <Route path="/courses/:courseId/tasks" component={TaskPage} />
          <Route path="/tasks/:minitaskId" component={MiniTaskPage} />
          <Route path="/createminitask" exact component={CreateMiniTask} />
          <Route render={() => <div>404 Page Not Found</div>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
