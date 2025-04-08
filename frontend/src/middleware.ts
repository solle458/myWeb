import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // public fileは無視
    const PUBLIC_FILES = /\.(.*)$/
    if (PUBLIC_FILES.test(pathname)) {
        return NextResponse.next()
    }

    // admin以外はそのまま
    if (!pathname.startsWith('/admin')) {
        return NextResponse.next()
    }

    // loginページは認証不要
    if (pathname.startsWith('/admin/login')) {
        return NextResponse.next()
    }

    // 認証チェック
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

export const config = {
    matcher: ['/admin/:path*'],
}
