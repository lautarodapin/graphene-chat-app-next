import { useQuery } from '@apollo/client'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/dist/client/router'
import {createContext, useContext, useEffect} from 'react'
import { USER } from '../graphql-documents/documents'

export const UserContext = createContext({
    user: undefined
})

export const UserProvider = ({children}) => {
    const router = useRouter()
    const { data, loading, error } = useQuery(USER)
    const isLogin = router.asPath.toLowerCase().includes('users/login')

    /*
     TODO fijarse que nohace un refetc del usuario 
     cuando hago el login
    */

    useEffect(() => {
        if (!isLogin && !data?.user && !loading) {
            router.push({pathname: '/users/login'})
        }
    }, [data])

    return (
    <UserContext.Provider value={{
        user: data?.user,
    }}>
        {loading && <CircularProgress />}
        {!loading && data?.user && children}
        {!loading && !data?.user && isLogin && children}
    </UserContext.Provider>
    )
}


export const useUser = () => useContext(UserContext)