import { useCallback, useEffect, useState } from "react"

export const useAsync = (callback, deps = []) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

    const refetch = useCallback(() => {
        setLoading(true)
        callback().then(setData).finally(() => setLoading(false))
    }, deps)

    useEffect(() => {
        refetch()
    }, [refetch])

    return { data, loading, refetch }
}