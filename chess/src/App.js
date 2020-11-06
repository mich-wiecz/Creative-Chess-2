import React, {lazy, Suspense, useContext} from 'react';
import MainNavbar from './ui/Navbar/Navbar'
import PlaygroundBar from './game/playground/PlaygroundBar';
import { Route} from 'react-router-dom';
import { IsolatedRoute, WaitingModal, MySwitch } from "utils/routing";
import PageNotFound from "utils/routing/PageNotFound";



const Signup = lazy(() => import('pages/Signup'));
const Login = lazy(() => import('pages/Login'));
const About = lazy(() => import('pages/About'));



function App() {


  return (
    <>

     <MainNavbar/>
      <Route path="/404">
     <PageNotFound />
      </Route>

      <MySwitch>
        <IsolatedRoute exact path="/">
        <PlaygroundBar/>
        </IsolatedRoute>

    {
      [
        {path: "/about", component: <About/>},
        {path: "/signup", component: <Signup/>},
        {path: "/login", component: <Login/>},
      ].map(obj => {
          return( 
          <IsolatedRoute  
          path={obj.path}>
          <Suspense fallback={<WaitingModal />}>
             {obj.component}
          </Suspense>
            </IsolatedRoute>)
      })
    }
      </MySwitch>
    
      
    </>
 
  );
}

export default App;
