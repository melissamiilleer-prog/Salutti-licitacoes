import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { RoleRedirect } from '@/pages/RoleRedirect'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { ClientesPage } from '@/pages/admin/ClientesPage'
import { FuncionariosPage } from '@/pages/admin/FuncionariosPage'
import { FuncionarioDashboard } from '@/pages/funcionario/FuncionarioDashboard'
import { ClienteDashboard } from '@/pages/cliente/ClienteDashboard'
import { NotFoundPage } from '@/pages/NotFoundPage'

export default function App() {
  return (
    // basename vem de import.meta.env.BASE_URL (configurado em vite.config.ts):
    // "/" em desenvolvimento local, "/Salutti-licitacoes/" no build para o
    // GitHub Pages — sem isso, as rotas quebram assim que o app roda fora da raiz.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/redirecionando" element={<RoleRedirect />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/clientes"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ClientesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/funcionarios"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <FuncionariosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/funcionario"
            element={
              <ProtectedRoute allowedRoles={['funcionario']}>
                <FuncionarioDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cliente"
            element={
              <ProtectedRoute allowedRoles={['cliente']}>
                <ClienteDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
