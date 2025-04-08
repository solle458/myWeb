"use server"

import axios from "axios"
import { cookies } from "next/headers"
export async function postAdminLogin(formData: FormData) {
    const username = formData.get('username')
    const password = formData.get('password')
    const form = {
        username: username,
        password: password
    }

    const res = await axios.post('http://localhost:8080/api/admin/login', form)

    if (res.status === 200) {
        const cookieStore = await cookies()
        cookieStore.set({
            name: 'token',
            value: res.data.token,
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 30
        })
    }else{
        return {
            error: res.data.error
        }
    }

    return res.data
}
