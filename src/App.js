import React from 'react'
import { RouterComponents } from "./routers";
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <RouterComponents />
    </Provider>
  );
}

export default App;