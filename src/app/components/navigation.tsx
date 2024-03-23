"use client";
import { useSession, signOut, signIn } from "next-auth/react"
import Image from 'next/image'

export default function Navigation() {
  const { data: session } = useSession();
  const imageUrl = session?.user?.image ? session.user.image : 'https://avatars.githubusercontent.com/u/1?v=4';

  return (
    <div className="navbar bg-base-300">
        <div className="navbar-start">
        <a className="btn btn-ghost text-xl" href="/">
          <Image src="/logo.png" width={20} height={20} alt="Logo" className="navbar-logo" priority/>
          Guito Helper</a>
        </div>
        <div className="navbar-end">
          {session ?
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                  <Image src={imageUrl} width={40} height={40} alt="User image" className="rounded-full" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => signOut()}>Logout</a></li>
              </ul>
            </div>
            :
            <>
              <button className="btn btn-outline " onClick={() => signIn('google')}>
                Sign in</button>
            </>}
        </div>
      </div>
  );
}