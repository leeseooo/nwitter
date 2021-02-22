import React from 'react'
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({isLoggedIn, userObj}) => {
    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>} 
            {/*navigation이 존재하려면 login변수가 true여야함 */}
            <Switch>
                {isLoggedIn ? 
                (<div
                    style={{
                      maxWidth: 890,
                      width: "100%",
                      margin: "0 auto",
                      marginTop: 80,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                <Route exact path="/">
                    <Home userObj={userObj}/>
                </Route>
                <Route exact path="/profile">
                    <Profile userObj={userObj}/>
                </Route></div>
                ) : (<>
                <Route exact path="/">
                    <Auth />
                </Route>
                {/* <Redirect from="*" to="/" /> */}
                </>)}
            </Switch>
        </Router>
    )
}
export default AppRouter;

//<Redirect from="*" to="/" />
//"/" route에 있으면 상관없는데
//그 외의 route로 가면 "/"로 돌아가라는 의미

//Redirect : used for overall route protection
//useHistory : used for specific redirection ...Am I right?