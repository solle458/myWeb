import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

const PUBLIC_FILES = /\.(.*)$/

export async function middleware(req : NextRequest) {
    const { pathname } = req.nextUrl

    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const token = req.cookies.get('token')?.value
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', req.url))
        }

        try {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
            if (!payload.isAdmin) {
                return NextResponse.redirect(new URL('/admin/login', req.url))
            }

            return NextResponse.next()
        } catch (error) {
            console.error("Invalid token:", error)
            return NextResponse.redirect(new URL('/admin/login', req.url))
        }
    }

    if (PUBLIC_FILES.test(pathname)) {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/admin/login', req.url))
}

export const config = {
    matcher: ['/admin/:path*'],
};
