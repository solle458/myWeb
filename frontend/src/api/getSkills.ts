"use server";

import axios from "axios";

export async function getSkills() {
    const res = await axios.get('https://myweb-3jbr.onrender.com/api/about/skills');
    if (res.status !== 200) {
        throw new Error('Failed to fetch data');
    }
    return res.data;
}
