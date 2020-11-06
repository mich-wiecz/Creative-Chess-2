import * as React from 'react';
import { Route, } from 'react-router-dom';
import ErrorBoundary from 'utils/errors/ErrorBoundary';


export function IsolatedRoute({ path, noGoBackInErrorBoundary: noGoBack, children, ...rest }) {
    return (
        <Route path={path} {...rest}>
            <ErrorBoundary noGoBackInErrorBoundary={noGoBack && noGoBack}>
                {children}
            </ErrorBoundary>
        </Route>
    );
}