"use server";

import axios from "axios";

export async function getSkills() {
    const url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api')+'/about/skills';
    console.log("API URL:", url);
    const res = await axios.get(url);
    if (res.status !== 200) {
        throw new Error('Failed to fetch data');
    }
    // console.log(res.data);
    return res.data;
}
