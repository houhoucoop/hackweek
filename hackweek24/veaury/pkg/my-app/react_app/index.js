import React, {createContext} from 'react';
import { reactContext } from '../pages/Provider'
import Dashboard from './longhorn-ui/src/routes/dashboard';
import { Provider } from 'react-redux';

function App() {
  return (
    <div>
      <reactContext.Consumer>
      {({store: proxyStore}) => {
        const store = Object.assign({}, proxyStore)

        return (
          <Provider store={store}>
            <Dashboard />
          </Provider>
        );
      }}
      </reactContext.Consumer>
    </div>
  );
}

export default App
