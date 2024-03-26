"use client";
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const router = useRouter();
  const { data: session } = useSession();
  const imageUrl = session?.user?.image ? session.user.image : 'https://avatars.githubusercontent.com/u/1?v=4';

  return (
    <div className="navbar bg-base-300">
        <div className="navbar-start">
          <Link href="/expenses/create" className="btn btn-ghost text-xl">
            <Image src="/logo.png" width={20} height={20} alt="Logo" className="navbar-logo" priority />
            Guito Helper
          </Link>
        </div>
        <div className="navbar-center hidden sm:flex">
          <ul className="menu menu-horizontal px-1 z-40">
            <li><Link href="/expenses/create">Create</Link></li>
            <li><Link href="/expenses/latest">Latest</Link></li>
          </ul>
        </div>
        <div className="navbar-end justify-end">
          {session ?
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-secondary ring-offset-base-300 ring-offset-2">
                  <Image src={imageUrl} width={40} height={40} alt="User image" className="rounded-full" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52">
                <li><a onClick={() => signOut({ callbackUrl: '/login' })}>Logout</a></li>
              </ul>
            </div>
            :
            <>
              <button className="btn btn-outline " onClick={() => router.push('/login')}>
                Sign in</button>
            </>}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52">
              <li>
                <a>Expenses</a>
                <ul className="p-2">
                  <li><Link href="/expenses/create">Create</Link></li>
                  <li><Link href="/expenses/latest">Latest</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
}

