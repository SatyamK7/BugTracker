import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider } from "react-router-dom";
import Registration from './Components/Registration.jsx';
import Home from './Components/Home.jsx';
import Developer from './Components/Developer.jsx';
import Tester from './Components/Tester.jsx';
import Welcome from './Components/Welcome.jsx';
import Admin from './Components/Admin.jsx';
import Login from './Components/Login.jsx';
import Manager from './Components/Manager.jsx';
import Project from './Components/Project.jsx';
import Bug from './Components/Bug.jsx';
  import BugForm from './Components/BugForm.jsx';




const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path='/' element={<Home />} />
      <Route path='/registration' element={<Registration />} /> 
      <Route path='/welcome' element={<Welcome />} />
      <Route path='/developer' element={<Developer />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/tester' element={<Tester />} />
      <Route path='/login' element={<Login />} />
      <Route path='/manager' element={<Manager />} />
      <Route path='/adminProjects' elements={<Manager/>}/>
      <Route path='/projects/:id' element={<Project />}/>
      <Route path='/projects/:id/bugs/:bugId' element={<Bug />}/>
      <Route path='/projects/:id/bugs/new' element={<BugForm />} />
    </>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>
)
