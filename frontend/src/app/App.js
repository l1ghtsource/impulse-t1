import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './routes';
import store from './redux'; 
import { ConfigProvider } from 'antd';

const App = () => {
  return (
    <ConfigProvider theme={{token:{
      colorPrimary:"#00aae6"
    }}}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
