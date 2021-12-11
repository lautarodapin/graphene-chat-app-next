import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { NextPage } from "next";
import { useLogoutMutation } from "../../generated/graphql";


const Logout: NextPage = () => {
    const router = useRouter()

    const [logout] = useLogoutMutation()

    useEffect(() => {
        if (localStorage) {
            localStorage.removeItem("token")
            router.push({ pathname: "/users/login" })
        }
        logout()
    }, [logout, router])

    return null
};

export default Logout;