import { useProtectedApi } from "@/lib/axios"

export const getSignedCover = async (path: string | null): Promise<string> => {
    if (!path) return '/'

    const { data, status } = await useProtectedApi.post(`/get-media/cover`, { path })
    if (status === 201) return data.signedUrl as string
    
    return '/'
}