
import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './componemts/Navbar'
import Footer from './componemts/Footer'

function App() {
  const location = useLocation();
  const hiddenRouters =['/login','/register','/cart','/checkout','/admin/dashboard'];
  const hideNavbar = hiddenRouters.includes(location.pathname);
  const hideFooter = hiddenRouters.includes(location.pathname);

  return (
    <>
   {!hideNavbar && <Navbar />}
            <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
                <Outlet />
            </main>
            {!hideFooter && <Footer />}
    </>
  )
}

export default App
