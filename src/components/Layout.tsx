import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main className=" w-full h-50 bg-amber-200">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
