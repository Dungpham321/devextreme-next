import React from 'react'
import axios from "axios";
const apiUrl: any = process.env.NEXT_PUBLIC_URL_API;
async function getUser(url: string) {
    const response = await axios.get(apiUrl + url);
    return { Data: response.data };
}
async function Login(url:string, formdata:object) {
    const response = await axios.post(apiUrl + url, formdata);
    return { Data: response.data };
}
export { getUser, Login}