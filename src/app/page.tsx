"use client"; 

import { useAuth } from "../context/AuthContext";
import Landing from "../app/landing/page";

export default function Home() {
  const {user, logOut } = useAuth();

  if (!user) {
    return <Landing/>
  }
  
  return (
    <div>
    </div>
  );
}
