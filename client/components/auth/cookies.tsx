'use client';
import { getCookie, setCookie, deleteCookie } from 'cookies-next/client';
import { useEffect, useState } from 'react';

export function SetCookie(token: string) {
  setCookie('token', token);
}
export function GetCookie() {
  const token = getCookie('token') || null;
  return token;
}
export function DeleteCookie() {
  deleteCookie('token');
}