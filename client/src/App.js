import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import Page404 from './pages/404';
import EditPostPage from './pages/EditPostPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyPostsPage from './pages/MyPostsPage';
import PostImagePage from './pages/PostImagePage';
import RegisterPage from './pages/RegisterPage';
import PostContextProvider from './contexts/PostContext'
import MyPostContextProvider from './contexts/MyPostContext';
import logout from './utils/logout';
import Authenticated from './components/Authenticated';
import LogoutPage from './pages/LogoutPage';



const App = () => {

  useEffect(()=>{
    const userData = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData'))
    if(userData ){
      const {expires} = userData
      const now = new Date()
      if(now > new Date(Date.parse(expires))){
        logout()
      }
    }
  },[])
  return (
    <Router>
    <PostContextProvider>
    <MyPostContextProvider>
          <main>
            <Switch>
              <Route exact path="/">
                  <HomePage/>
              </Route>
              <Route path="/post-image">
                  <Authenticated Component={PostImagePage}/>
              </Route>
              <Route path="/my-posts">
                  <Authenticated Component={MyPostsPage}/>
              </Route>
              <Route path="/edit-posts/:id">
                  <Authenticated Component={EditPostPage}/>
              </Route>
              <Route path="/login">
                <LoginPage/>
              </Route>
              <Route path="/register">
                <RegisterPage/>
              </Route>
              <Route path="/logout">
                <LogoutPage/>
              </Route>
              <Route path="/error">
                  <Page404/>
              </Route>
              <Route>
                <Redirect to="/error"/>
              </Route>
            </Switch>

          </main>
      </MyPostContextProvider>
      </PostContextProvider>
    </Router>
  );
};

export default App;
