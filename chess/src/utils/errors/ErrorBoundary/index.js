import * as React from 'react';
import ErrorModal from '../ErrorModal';




class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        // Of course it should go to the server or to some error-catching-service 
        // in real application
        console.group();
        console.log(error.toString());
        console.log(errorInfo.componentStack);
        console.groupEnd();
    }

    render() {
        if (this.state.hasError) return <ErrorModal {...this.props} />;

        return this.props.children;
    }
}

export default ErrorBoundary;