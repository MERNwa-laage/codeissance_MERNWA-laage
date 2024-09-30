import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./components/pages/Home"
import Dashboard from "./components/pages/Dashboard"


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  },
])

export default function App() {
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}
