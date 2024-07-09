import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Events from '../view/pages/Events'
import Signin from '../view/pages/Signin'
import Signup from '../view/pages/Signup'
import PrivateRoutes from './auth'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/events" element={<Events />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
