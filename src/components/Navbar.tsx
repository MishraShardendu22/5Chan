"use client";
import { Link } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      <div>5Chan</div>
      {session ? (
        <>
          <div>Welcome {user?.name || user?.email}</div>
          <div>
            <button onClick={handleSignOut}>Sign out</button>
          </div>
        </>
      ) : (
        <div>
          <Link href="/api/auth/signin">Sign in</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
