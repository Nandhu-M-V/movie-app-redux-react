import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main className=" w-full overflow-hidden  text-white bg-black/80 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
