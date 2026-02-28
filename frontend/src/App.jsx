import React from 'react';
import Home from './home/Home';
import {Route, Routes} from 'react-router-dom'
// import Course from './components/Course';
import Courses from './courses/Courses'
import Signup from './components/Signup'
import Contact from './components/Contact';
import About from './components/About';
import AllBooks from './books/AllBooks';

// import Login from './components/Login'
function App(){
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/course' element={<Courses/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/books' element={<AllBooks/>}/>
        {/* <Route path='/login' element={<Login/>}/> */}
      </Routes>
    </>
  );
}

export default App;