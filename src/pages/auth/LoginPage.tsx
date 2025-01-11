import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import type { Login } from '@/types/Auth'
import { useState } from 'react'
import { EyeIcon, EyeClosedIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { showToast } from '@/helpers/toastHelper'
import { loginHandle } from '@/services/AuthService'
import { HttpStatus } from '@/constants/httpStatus'
import useAuthStore from '@/store/authStore'
import useDocumentTitle from '@/hooks/useDocumentTItle'

const LoginPage = () => {
  useDocumentTitle('Đăng nhập')

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { login, setUserData } = useAuthStore()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Login>()

  const onLoginSubmit = async (payload: Login) => {
    try {
      setLoading(true)
      const response = await loginHandle(payload)

      if (response.status === HttpStatus.OK) {
        showToast(response.message, 'success')
        login({ accessToken: response.tokens.accessToken, refreshToken: response.tokens.refreshToken })
        setUserData(response.userData)
        navigate('/')
      } else {
        showToast(response.message, 'error')
      }
    } catch (error) {
      setLoading(false)
      console.error('Error logging in:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <Card className='w-full md:w-3/5 mx-10 md:mx-0 rounded-md'>
        <CardHeader>
          <h2 className='text-xl md:text-3xl text-center font-medium'>Quản trị viên</h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onLoginSubmit)}>
            <div className='form-group mb-5'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                Email
              </label>
              <Input
                id='email'
                type='email'
                placeholder='Email'
                className='w-full duration-300'
                {...register('email', {
                  required: 'Email không được để trống',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Email không hợp lệ'
                  }
                })}
              />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
            </div>
            <div className='form-group mb-5'>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                Mật khẩu
              </label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='*******'
                  className='w-full duration-300'
                  {...register('password', {
                    required: 'Mật khẩu không được để trống',
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu phải có ít nhất 6 ký tự'
                    }
                  })}
                />

                <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-2 top-2'>
                  {showPassword ? <EyeClosedIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
              {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
            </div>

            <div className='form-group mb-5'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='remember' />
                  <label
                    htmlFor='remember'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <a href='#' className='text-blue-500'>
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <div className='form-group'>
              <Button variant={'default'} className='w-full'>
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
