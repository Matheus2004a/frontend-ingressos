import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from '../view/pages/Signin'
import Signup from '../view/pages/Signup'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}
