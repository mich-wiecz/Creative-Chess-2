import React, { lazy, Suspense, useState} from 'react';
import MainNavbar from './ui/MainNavbar/MainNavbar'
import Footer from 'ui/Footer';
import { IsolatedRoute, WaitingModal, MySwitch } from "utils/routing";
import AuthRoute from 'utils/routing/AuthRoute';
import PageNotFound from "utils/routing/PageNotFound";
import Options from 'Game/Options';
import Game from 'Game';


const Signup = lazy(() => import('pages/Signup'));
const Login = lazy(() => import('pages/Login'));
const About = lazy(() => import('pages/About'));






function App() {

  const [showOptions, setShowOptions] = useState(false)


  return (
    <>
  
         {/* <IsolatedRoute  
          path={'/options'}
          > */}
          <Options show={showOptions} onClose={() => setShowOptions(false)}/>
        {/* </IsolatedRoute> */}
 

      <MainNavbar/>

      <MySwitch>
      <AuthRoute  
          path={'/login'}
          >
          <Suspense fallback={<WaitingModal />}>
             <Login />
          </Suspense>
        </AuthRoute>

     
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


          <AuthRoute 
          path={'/signup'}>
          <Suspense fallback={<WaitingModal />}
          >
             <Signup />
          </Suspense>
          </AuthRoute>

     
          <IsolatedRoute  path="/">
        <Game />
      </IsolatedRoute>

      {/* <Route path="/404">
     <PageNotFound />
      </Route> */}
      </MySwitch>

  


      <Footer />
    </>
 
  );
}

export default App;
