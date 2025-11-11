import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet} from 'react-router';
import Footer from '../Footer/Footer';

const Root = () => {
    
    return (
        <div className='flex flex-col min-h-screen bg-[#0b011a08] text-white'>
            <Navbar></Navbar>
             <main className="flex-grow">
            <Outlet></Outlet>
             </main>
            
            <Footer></Footer>
        </div>
    );
};

export default Root;