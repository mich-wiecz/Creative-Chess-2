import React, { lazy, Suspense} from 'react';
import MainNavbar from './ui/MainNavbar/MainNavbar'
import Footer from 'ui/Footer';
import { IsolatedRoute, WaitingModal, MySwitch } from "utils/routing";
import AuthRoute from 'utils/routing/AuthRoute';
import Options from 'Game/Options';

const Game = lazy(() => import('Game'));
const Signup = lazy(() => import('pages/Signup'));
const Login = lazy(() => import('pages/Login'));
const About = lazy(() => import('pages/About'));






function App() {



  return (
    <>
      <MainNavbar/>

      <MySwitch>
      <AuthRoute  
          path={'/login'}
          >
          <Suspense fallback={<WaitingModal />}>
             <Login />
          </Suspense>
        </AuthRoute>


        <IsolatedRoute  
          path={'/options'}
          >
          <Options/>
        </IsolatedRoute>
 
     
    {
      [
        {path: "/about", component: <About/>}
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
          path={'/signup'}>
          <Suspense fallback={<WaitingModal />}
          >
             <Signup />
          </Suspense>
          </IsolatedRoute>

     
          <IsolatedRoute  path="/">
          <Suspense fallback={<WaitingModal />}>
        <Game />
        </Suspense>
      </IsolatedRoute>

      </MySwitch>

      <Footer />
    </>
 
  );
}

export default App;
