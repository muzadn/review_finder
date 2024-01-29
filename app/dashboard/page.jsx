                //Dashboard page
                //user profile fetched and user details sent as props to dashboard component.
                //BaseUrl from environment variables.
import ReviewDashboard from '../../components/Dashboard';
import { redirect } from 'next/navigation';
import React from "react";
import { cookies } from 'next/headers';
import isAuthenicated from '../../utils/routeProtection';
import axios from 'axios'
export default async function Home() {

    const baseUrl = process.env.BASEURL
    const auth = await isAuthenicated();
    if (!auth) {
        redirect('/')
    }
    const cookieStore = cookies()
    const token = cookieStore.get('token');
    let user

    if (token?.value) {
        try {
            const header = `Bearer ${token.value}`
            const res = await axios.get(`${baseUrl}/auth/profile`, { headers: { Authorization: header } })
            user = res.data.data
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <ReviewDashboard baseUrl={baseUrl} user={user} />

        </div>
    );
};

