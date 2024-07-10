import { Link } from 'react-router-dom'
import { Spinner } from '../../../components/Spinner'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import useSignin from './useSignin'

export default function Signin() {
  const { register, errors, handleSubmit, isLoading } = useSignin()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 max-w-md w-full bg-white rounded-lg border border-gray-200 shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h3 className="text-center text-3xl font-extrabold text-gray-900">
            Login
          </h3>

          <p className="text-center">
            Novo por aqui?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Crie uma conta
            </Link>
          </p>

          <fieldset>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              type="email"
              className="mt-1 focus:ring-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md p-2"
              placeholder="Digite seu email"
              {...register('email')}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </fieldset>

          <fieldset>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <Input
              type="password"
              className="mt-1 focus:ring-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 border rounded-md p-2"
              placeholder="Digite sua senha"
              {...register('password')}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </fieldset>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            {!isLoading && 'Login'}
          </Button>
        </form>
      </div>
    </div>
  )
}
