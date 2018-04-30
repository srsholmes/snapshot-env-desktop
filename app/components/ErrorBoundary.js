// @flow
import React from 'react';
import bugsnag from 'bugsnag';
import { setSnapshotMessage } from '../reducers/global';

bugsnag.register('aa8f89ed82f01fe73b2102b01110aecc');

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    bugsnag.notify(new Error(error));
    console.log('ERROR BOUNDARY');
    this.props.store.dispatch(setSnapshotMessage('Something went wrong', 0));
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
