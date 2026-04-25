import React from 'react';
import {Route, Router, Routes} from 'react-router-dom'
import Home from './home/Home';
import Courses from './courses/Courses'
import Signup from './components/Signup'
import Contact from './components/Contact';
import About from './components/About';
import AllBooks from './books/AllBooks';
import ProtectedRoute from './ProtectedRoute';
import ProtectedAdminRoute from './ProtectedAdminRoute';

import AdminDashboard from './profile/admin/AdminDashboard';
import AddBook from './profile/admin/AddBook';
import EditBook from './profile/admin/EditBook';
import AdminMessages from './profile/admin/AdminMessages';

// import Profilein from '../pages/profile/ProfileLayout';
import MyBooks from './profile/user/MyBooks';
import Wishlist from './profile/user/Wishlist'
import ProfileLayout from './profile/ProfileLayout'
import ProfileInfo from './profile/user/ProfileInfo';
import Cart from './profile/user/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/orderSuccess';
function App(){
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='courses'  element={<ProtectedRoute><Courses/></ProtectedRoute>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/contact' element={<ProtectedRoute><Contact/></ProtectedRoute>}/>
        <Route path='/about' element={<ProtectedRoute><About/></ProtectedRoute>}/>
        <Route path='/books' element={<ProtectedRoute><AllBooks/></ProtectedRoute>}/>

        <Route path="/checkout" element ={<Checkout/>}/>
        <Route path='/order-success' element={<OrderSuccess/>} />
        
        {/* Shared Profile Layout */}
        <Route path="/:role" element={<ProfileLayout />}>
          {/* Default profile page */}
          <Route index element={<ProfileInfo />} />

          {/* User routes */}
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="my-books" element={<MyBooks />} />
          

          {/* Admin routes */}
          {/* <Route path="admin-info" element={<AdminProfile />} /> */}
          <Route path="messages" element={<ProtectedAdminRoute><AdminMessages /></ProtectedAdminRoute> } />
          <Route path="admin-dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="add-book" element={<ProtectedAdminRoute><AddBook /></ProtectedAdminRoute>} />
          <Route path="edit-book/:id" element={<ProtectedAdminRoute><EditBook /></ProtectedAdminRoute>} />
        </Route>
      
      </Routes>
    </>
  );
}

export default App;