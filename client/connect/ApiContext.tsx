import React from 'react'
import axios from "axios";
const apiUrl: any = process.env.NEXT_PUBLIC_URL_API;
async function getUser(url:string) {
    const response = await axios.get(apiUrl+url);
    return { props: { users: response.data } };
}
export {getUser}