import {IsolatedRoute} from '../IsolatedRoute';
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectAuthenticated} from 'redux/userSlice';

import React from 'react'

export default function AuthRoute({path, children}) {

    const isAuthenticated = useSelector(selectAuthenticated)
    return (
       <IsolatedRoute path={path}>
         {
             isAuthenticated
             ? 
             <Redirect to="/" />
             :
             children

         }  
       </IsolatedRoute>
    )
}
