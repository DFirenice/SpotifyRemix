import { NextRequest, NextResponse } from "next/server"
import { jwtDecode } from 'jwt-decode'

export async function middleware (req: NextRequest, res: NextResponse) {
    const handleRedirect = () => {
        return NextResponse.redirect(new URL('/auth', req.url))
    }
    
    type JwtPayload = { exp: number }
    
    const token = req.cookies.get('access_token')?.value as string | undefined
    if (token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token)
            if (!decoded.exp) return handleRedirect()

            const current = Date.now() / 1000
            if (decoded.exp < current) return handleRedirect()
        }
        catch (err) { return handleRedirect() }
    } else { return handleRedirect() }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!auth|_next/static|_next/image|favicon.ico).*)']
}