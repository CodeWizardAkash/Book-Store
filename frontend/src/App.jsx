import React from 'react';
import Home from './home/Home';
import {Route, Router, Routes} from 'react-router-dom'
import Courses from './courses/Courses'
import Signup from './components/Signup'
import Contact from './components/Contact';
import About from './components/About';
import AllBooks from './books/AllBooks';
import ProtectedRoute from './ProtectedRoute';
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
      </Routes>
    </>
  );
}

export default App;