import { useProtectedApi } from "./axios"
import { redirect, RedirectType } from "next/navigation"

export const logout = async () => {
    const res = await useProtectedApi.get('/auth/logout')
    if (res.data?.sucess) return redirect('/auth', RedirectType.replace)

    return { error: "Couldn't sign you out, try again later" }
}