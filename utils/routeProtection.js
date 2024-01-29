import { cookies } from 'next/headers'
import axios from 'axios'
async function isAuthenticated() {
    let auth = false;
    const cookieStore = cookies()
    const token = cookieStore.get('token') || "";
    try {
        const res = await axios.post(`${process.env.BASEURL}/auth/routes`, token)
        if (res.status == 201) {
            auth = true;
            return auth;
        }
        return auth
    }
    catch (error) {
        console.log(error)
    }
}

export default isAuthenticated