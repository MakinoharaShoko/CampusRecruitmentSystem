import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Me from './pages/userHome/Me';
import UserRegister from './pages/register/userRegister';
import { Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './App.css';
import styles from './app.module.scss';
import Login from './pages/login/Login';
import CompanyHome from '@/pages/companyHome/CompanyHome';
import CompanyAllProcecss from '@/pages/process/CompanyAllProcess';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/me',
    element: <Me />,
  },
  {
    path: '/userRegister',
    element: <UserRegister />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/company',
    element: <CompanyHome />,
  },
  {
    path: '/companyAllProcess',
    element: <CompanyAllProcecss />,
  },
]);

function App() {
  return (
    <Layout style={{ height: '100%' }}>
      <Header>
        <div style={{ display: 'flex', color: 'white' }}>
          <div className={styles.title}>
            <a className={styles.menuA} href="/">
              高校校园招聘管理系统
            </a>
          </div>
          <div style={{ margin: '0 0 0 auto' }} className={styles.menuItem}>
            <a className={styles.menuA} href="/me">
              个人中心
            </a>
          </div>
          <div style={{ margin: '0 0 0 0.5em' }} className={styles.menuItem}>
            <a className={styles.menuA} href="/company">
              企业管理
            </a>
          </div>
        </div>
      </Header>
      <Content style={{ margin: '2em 2em 2em 2em', background: 'white' }}>
        <RouterProvider router={router} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>2022 CRS Team</Footer>
    </Layout>
  );
}

export default App;
