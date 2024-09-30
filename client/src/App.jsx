

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./components/pages/Home"
import Dashboard from "./components/pages/Dashboard"
import Login from './components/pages/Login'


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  },
  {
    path:'/login',
    element:<Login/>
  },
])

export default function App() {
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}
