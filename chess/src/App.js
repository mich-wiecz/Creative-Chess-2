import React, {useState, lazy, Suspense} from 'react';
import MainNavbar from './ui/Navbar/Navbar'
import Playground from './game/playground';
import Options from 'game/Options';
import GameBar from 'game/GameBar';
import Footer from 'ui/Footer';

import { Route} from 'react-router-dom';
import { IsolatedRoute, WaitingModal, MySwitch } from "utils/routing";
import PageNotFound from "utils/routing/PageNotFound";


const Signup = lazy(() => import('pages/Signup'));
const Login = lazy(() => import('pages/Login'));
const About = lazy(() => import('pages/About'));



function App() {

  const [isGameOn, setIsGameOn] = useState(true);


  return (
    <>

  {/* <Options /> */}
     <MainNavbar/>
     {
       isGameOn && 
       <GameBar />
     }
     <Footer />
      <Route path="/404">
     <PageNotFound />
      </Route>

      <MySwitch>
        <IsolatedRoute exact path="/">
        <Playground isGameOn={isGameOn}/>
        </IsolatedRoute>
    {
      [
        {path: "/about", component: <About/>},
        {path: "/signup", component: <Signup/>},
        {path: "/login", component: <Login/>},
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
      </MySwitch>
    
      
    </>
 
  );
}

export default App;
