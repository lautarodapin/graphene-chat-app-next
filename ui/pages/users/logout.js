import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

export const LOGOUT = gql`
mutation Logout {
    logout {
        ok
    }
}`

const Logout = () => {
    const router = useRouter()
    const [logout, { data }] = useMutation(LOGOUT)

    useEffect(() => {
        if (logout) {
            logout()
        }
    }, [])

    useEffect(() => {
        if (data && data.ok) {
            router.push({pathname: '/users/login/'})
        }
    }, [data])

    return null
};

export default Logout;