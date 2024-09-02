import Events from '@/view/pages/Events'
import Rating from '@/view/pages/Rating'
import Sales from '@/view/pages/Sales'
import Signin from '@/view/pages/Signin'
import Signup from '@/view/pages/Signup'
import Tickets from '@/view/pages/Tickets'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './auth'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Events />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/rating" element={<Rating />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
