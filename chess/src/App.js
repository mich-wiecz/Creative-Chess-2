import React, {useState, lazy, Suspense} from 'react';
import MainNavbar from './ui/Navbar/Navbar'
import Footer from 'ui/Footer';
import { Route} from 'react-router-dom';
import { IsolatedRoute, WaitingModal, MySwitch } from "utils/routing";
import PageNotFound from "utils/routing/PageNotFound";
import Game from 'Game';


const Signup = lazy(() => import('pages/Signup'));
const Login = lazy(() => import('pages/Login'));
const About = lazy(() => import('pages/About'));


function App() {

  return (
    <>
  {/* <Options /> */}
     <MainNavbar/>
      <Route path="/404">
     <PageNotFound />
      </Route>

      <MySwitch>
   
    {
      [
        {path: "/about", component: <About/>},
        {path: "/signup", component: <Signup/>},
      ].map(obj => {
          return( 
          <IsolatedRoute  
          key={obj.path}
          path={obj.path}>
          <Suspense fallback={<WaitingModal />}>
             {obj.component}
          </Suspense>
            </IsolatedRoute>)
      })
    }
          <IsolatedRoute  
          path={'/login'}
          >
          <Suspense fallback={<WaitingModal />}>
             <Login />
          </Suspense>
            </IsolatedRoute>
         <IsolatedRoute  path="/">
        <Game />
        </IsolatedRoute>
      </MySwitch>
      <Footer />
    </>
 
  );
}

export default App;
