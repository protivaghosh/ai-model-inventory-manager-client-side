import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet} from 'react-router';
import Footer from '../Footer/Footer';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const Root = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <div className='flex flex-col min-h-screen  text-white' data-theme={theme}>
            <Navbar></Navbar>
             <main className="flex-grow">
            <Outlet></Outlet>
             </main>
            
            <Footer></Footer>
        </div>
    );
};

export default Root;