  
import * as React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { IsolatedRoute } from 'utils/routing/index'



export function MySwitch({ children }) {
    return (
        <Switch>
            {children}
            <IsolatedRoute>
                <Redirect to="/404" />
            </IsolatedRoute>
        </Switch>
    );
}