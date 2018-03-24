import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import fontIcons from './utils/fontIcon';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import { setProjectPath, setConfigInfo } from './reducers/project';
import { getRepoInfo } from './reducers/git';

document.ondragover = document.ondrop = ev => {
  ev.preventDefault();
};

const store = configureStore();

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
