import { MutableRefObject, useEffect, useState } from "react"

export const useOnScreen = (ref: MutableRefObject<HTMLDivElement | HTMLLIElement | null>) => {

    const [isIntersecting, setIntersecting] = useState(false)

    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    )

    useEffect(() => {
        if (ref.current) observer.observe(ref.current)
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect() }
    }, [ref.current])

    return isIntersecting
}