
import React from 'react';
import { render } from 'react-dom';
import fixPath from 'fix-path';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import { setConfigInfo, setProjectPath } from './reducers/project';
import { getRepoInfo } from './reducers/git';




// Fix path for bundle
fixPath();

document.ondragover = document.ondrop = ev => {
  ev.preventDefault();
};

const store = configureStore();

console.log('****************************');
console.log(window && window.process && window.process.type);



document.body.ondrop = ev => {
  const { path } = ev.dataTransfer.files[0];
  store.dispatch(setProjectPath(path));
  store.dispatch(getRepoInfo(path));
  store.dispatch(setConfigInfo(path));
  ev.preventDefault();
};

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
