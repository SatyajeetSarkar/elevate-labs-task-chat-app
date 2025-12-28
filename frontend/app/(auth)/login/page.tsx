"use client"

import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import React from 'react'
import { useAuth } from '@/stores/auth';

type infoType = {
    username: string;
    password: string;
}

const page = () => {
    const [info, setInfo] = React.useState<infoType>({
        username: '', password: ''
    });

    const login = useAuth(state => state.login);
    const handleSubmit = async () => {
        // try {
        //     const res = await axios.post(
        //         "http://localhost:3001/api/auth/login",
        //         {
        //             username: info.username,
        //             password: info.password,
        //         }
        //     );

        //     if (res.data) {
        //         localStorage.setItem("token", res.data.token);
        //         console.log("Login successful");
        //     }

        //     console.log(res.data);
        // } catch (error) {
        //     console.error(error);
        // }
        await login(info.username, info.password);
        console.log("Logged in successfully");
        window.location.href = "/chats";

    };

    return (
        <div>
            <Input className="border-b-black" value={info.username} onChange={(e) => setInfo({ ...info, username: e.target.value })} />
            <Input className="border-b-black" value={info.password} onChange={(e) => setInfo({ ...info, password: e.target.value })} />
            <Button onClick={handleSubmit}>Login</Button>
        </div>
    )
}

export default page
