import { useForm } from 'react-hook-form'
import authenticationSchema, {
  authenticationSchemaType,
} from './authenticationSchema'
import { FormProvider } from '@/core/form/form-provider'
import AuthenticationForm from './AuthenticationForm'
import { zodResolver } from '@hookform/resolvers/zod'
import useShowHackerMessage from '@/hooks/useShowHackerMessage'
import { useContext } from 'react'
import { GlobalContext } from '@/core/global-context/GlobalContext'

const AuthenticationFormContainer = () => {
  const hackerMessage = useShowHackerMessage()
  const globalContext = useContext(GlobalContext)
  const methods = useForm<authenticationSchemaType>({
    resolver: zodResolver(authenticationSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  })

  function onSubmit(data: authenticationSchemaType) {
    hackerMessage(data.username + ' ' + data.password, 'info')
    globalContext.user[1]({
      name: data.username,
      token: '41242wr&3438wey98103ruvrj13-vm8vj',
    })
  }

  return (
    <FormProvider props={methods} onSubmit={onSubmit}>
      <AuthenticationForm />
    </FormProvider>
  )
}

export default AuthenticationFormContainer
