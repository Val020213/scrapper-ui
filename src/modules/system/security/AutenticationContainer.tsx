'use client'

import { GlobalContext } from '@/core/global-context/GlobalContext'
import { ReactNode, useContext } from 'react'
import AuthenticationModal from './modal/AutenticationModal'

const HackerProtect = ({ children }: { children: ReactNode }) => {
  const globalContext = useContext(GlobalContext)
  return (
    <>
      {!globalContext.user[0]?.token.length && <AuthenticationModal />}
      {children}
    </>
  )
}

export default HackerProtect
