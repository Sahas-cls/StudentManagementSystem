import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Sidebar from './components/common/Sidebar';
import Header from './components/Header';
import PageDashboard from './components/pages/PageDashboard';
import PageAddStudent from './components/pages/PageAddStudent';
import ViewStudents from './components/ViewStudents';
import PageViewStudent from './components/pages/PageViewStudent';
import PageCourses from './components/pages/PageCourses';
import PageManageUsers from './components/pages/PageManageUsers';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/test' element={<Header />} />
        <Route path='/dashboard' element={<PageDashboard />} />
        <Route path='/student/add' element={<PageAddStudent />} />
        <Route path='/student/view' element={<PageViewStudent />} />
        <Route path='/courses' element={<PageCourses />} />
        <Route path='/users' element={<PageManageUsers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
