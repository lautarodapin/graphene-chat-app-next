import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";


const Logout = () => {
    const router = useRouter()

    useEffect(() => {
        if (localStorage) {
            localStorage.removeItem("token")
            router.push({pathname: "/users/login"})
        }
    }, [router])

    return null
};

export default Logout;