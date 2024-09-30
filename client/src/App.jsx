
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./components/pages/Home"
import Dashboard from "./components/pages/Dashboard"
import Flights from './components/pages/Flights'


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
    path:'/flights',
    element:<Flights/>
  },
])

export default function App() {
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}
