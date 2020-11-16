import React, { lazy, Suspense} from 'react';
import MainNavbar from './ui/Navbar/Navbar'
import Footer from 'ui/Footer';
import { Route} from 'react-router-dom';
import { IsolatedRoute, WaitingModal, MySwitch } from "utils/routing";
import AuthRoute from 'utils/routing/AuthRoute';
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

      <IsolatedRoute exact path="/">
        <Game />
      </IsolatedRoute>


      <Route path="/404">
     <PageNotFound />
      </Route>
      </MySwitch>



      <Footer />
    </>
 
  );
}

export default App;
