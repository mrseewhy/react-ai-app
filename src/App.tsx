import React, { useState } from 'react'
import Layout from './components/Layout'
import Hero from './components/Hero'

interface FormData {
  id: number,
  name: string,
  email: string,
  password: string,
}

interface FormErrors {
  name?: string,
  email?: string,
  password?: string,
}



const App = () => {
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    name: '',
    email: '',
    password: ''

  });
  const [errors, setErrors] = useState<FormErrors>({})


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(pre => ({
      ...pre,
      [name]: value
    }))

    setErrors(pre => ({
      ...pre,
      [name]: undefined
    }))

  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const time = Date.now()
    setFormData({ ...formData, id: time })
    if (formData.name.length <= 3) {
      setErrors(pre => ({ ...pre, name: 'Error! Name too short' }))
      return;
    }
    if (formData.email.length <= 3) {
      setErrors(pre => ({ ...pre, email: 'Error! Email too short' }))
      return;
    }
    if (!formData.email.includes('@')) {
      setErrors(pre => ({ ...pre, email: 'Error! invalid Email Address' }))
      return;
    }
    if (formData.password.length <= 6) {
      setErrors(pre => ({ ...pre, password: 'Error! Password too short' }))
      return;
    }

    const payload = { ...formData, id: Date.now() }
    console.log(payload)
  }
  return (
    <div>
      <Layout>
        <p>Hello from app</p>
        <Hero />
        <div className='p-4'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex gap-2 items-center'>
              <label htmlFor='name'> Name:</label>
              <div className='flex flex-col'>
                <input id='name' name="name" value={formData.name} onChange={handleChange} type="text" className='outline-o border border-gray-400 w-64 h-8 rounded-lg p-2 focus:border-2 focus:shadow-2xl' aria-describedby='name-error' aria-invalid={!!errors.name} />
                {errors.name && <span id='name-error' className='text-sm text-red-700'> {errors.name}</span>
                }              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <label htmlFor='email'> Email:</label>
              <div className='flex flex-col'>
                <input id='email' name="email" type='email' value={formData.email} onChange={handleChange} className='outline-o border border-gray-400 w-64 h-8 rounded-lg p-2 focus:border-2 focus:shadow-2xl' aria-describedby='email-error' aria-invalid={!!errors.email} />
                {errors.email && <span id='email-error' className='text-sm text-red-700'> {errors.email}</span>}
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <label htmlFor='password'> Password:</label>
              <div className='flex flex-col'>
                <input id='password' name="password" type='password' value={formData.password} onChange={handleChange} className='outline-o border border-gray-400 w-64 h-8 rounded-lg p-2 focus:border-2 focus:shadow-2xl' aria-describedby='password-error' aria-invalid={!!errors.password} />
                {errors.password && <span id='password-error' className='text-sm text-red-700'> {errors.password}</span>}
              </div>

            </div>
            <div>
              <button type="submit" className='bg-green-800 text-white w-64 h-8 ml-16 focus:border-2 border-green-800 focus:drop-shadow-2xl'>Submit</button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  )
}

export default App