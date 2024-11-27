import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './routes';
import store from './redux'; 
import { ConfigProvider } from 'antd';

const App = () => {
  return (
    <ConfigProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
