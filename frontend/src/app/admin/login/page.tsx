'use client'

import { useState } from 'react'
import { postAdminLogin } from '@/api/postAdminLogin'

export default function Login() {
    const [username, setUsername] = useState('')

    return (
        <div className="flex items-center justify-center h-screen ">
            <form className="flex flex-col gap-4 bg-sky-500 p-4 rounded-md" action={postAdminLogin}>
                <input
                    type="text"
                    name="username"
                    placeholder="ユーザー名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input type="password" name="password" placeholder="パスワード" />
                <button type="submit" className="bg-yellow-500 text-black p-2 rounded-md">ログイン</button>
            </form>
        </div>
    );
}
