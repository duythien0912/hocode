import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CoursePage from "./components/coursePage/CoursePage";
import TaskPage from "./components/taskPage/TaskPage";
import MiniTaskPage from "./components/minitaskPage/MiniTaskPage";
import HomePage from "./components/homePage/HomePage";
import SignUpPage from "./components/signUpPage1/SignUpPage";
import ReactMde from "./components/minitaskPage/ReactMde";
import CreateMiniTask from "./components/createMinitaskPage/CreateMiniTaskPage";
import ReactAdmin from "./components/adminPage/hocode/ReactAdmin";
import ProfilePage from "./components/profilePage/ProfilePage";
import { Provider } from "react-redux";
import store from "./js/store/store.js";
import LoginPage from "./components/loginPage1/LoginPage";
import { setCurrentUser, logoutUser } from "./js/actions/authActions";
import setAuthToken from "./js/utils/setAuthToken";
import PrivateRoute from "./private-route/PrivateRoute";
import jwt_decode from "jwt-decode";

// Check for token to keep user logged in/ xet khi load lai trang
if (localStorage.AuthToken) {
  // Set auth token header auth
  const token = localStorage.AuthToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  //console.log(decoded);
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  
  return (
    <Provider
      store={store}
      >
    <Provider
      // store={store}
      store={store}

    >
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/home" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignUpPage} />
            <Route path="/reactmde" exact component={ReactMde} />
            <PrivateRoute path="/courses" exact component={CoursePage} />
            <PrivateRoute
              path="/courses/:courseId/tasks"
              component={TaskPage}
            />
            <PrivateRoute path="/tasks/:minitaskId" component={MiniTaskPage} />
            <Route path="/createminitask" exact component={CreateMiniTask} />
            <Route path="/admin" exact component={ReactAdmin} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <Route render={() => <div>404 Page Not Found</div>} />
          </Switch>
        </div>
      </Router>
    </Provider>
    </Provider>
  );
}

export default App;
