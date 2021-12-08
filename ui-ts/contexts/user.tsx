import { useQuery } from '@apollo/client'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/dist/client/router'
import { createContext, FC, useContext, useEffect } from 'react'
import { UserFragment, useUserQuery } from '../generated/graphql'

interface Props {
    user?: UserFragment | null
    refetch: () => void
}

export const UserContext = createContext<Props>({
    user: undefined,
    refetch: () => {},
})

export const UserProvider: FC = ({ children }) => {
    const router = useRouter()
    const { data, loading, error, refetch } = useUserQuery({ fetchPolicy: 'cache-and-network' })
    const isLogin = router.asPath.toLowerCase().includes('users/login')
    /*
     TODO fijarse que nohace un refetc del usuario 
     cuando hago el login
    */

    useEffect(() => {
        if (!isLogin && !data?.user && !loading) {
            router.push({ pathname: '/users/login' })
        }
    }, [data, isLogin, loading, router])

    return (
        <UserContext.Provider value={{
            user: data?.user,
            refetch,
        }}>
            {loading && <CircularProgress />}
            {!loading && data?.user && children}
            {!loading && !data?.user && isLogin && children}
        </UserContext.Provider>
    )
}


export const useUser = () => useContext(UserContext)