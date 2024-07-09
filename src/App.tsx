import { AuthProvider } from './app/contexts/AuthContext'
import { Router } from './routes'

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
