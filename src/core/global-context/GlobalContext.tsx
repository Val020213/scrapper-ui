'use client'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { GlobalContextProps, User } from './types'

export const GlobalContext = createContext<GlobalContextProps>(
  {} as GlobalContextProps
)

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const user = useState<User | undefined>()

  useEffect(() => {
    // save user in cookies
    // read user in cookies
  })

  return (
    <GlobalContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
