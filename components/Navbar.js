import Link from 'next/link';
import { useUser } from '@/lib/firebase/useUser';

export default function Navbar() {

    const { user, logout } = useUser();

    return (
        <nav className="h-16 w-screen bg-blue-500 text-white">
            <div className="max-w-6xl w-screen h-16 mx-auto flex flex-row items-center justify-between">
                <Link href="/" passHref>
                    <h1 className="tracking-wider font-semibold text-3xl cursor-pointer">SOPOŠOE</h1>
                </Link>
                {!user ?
                <ul className="h-full flex flex-row items-center gap-20">
                    <li>
                        <Link href="/login" passHref>
                            <button className="text-1xl tracking-wider font-normal">Login</button>
                        </Link>
                    </li>
                </ul>
                :
                <ul className="h-full flex flex-row items-center gap-20">
                    <li>
                        <Link href="/test" passHref>
                            <button className="text-1xl tracking-wider font-normal">Test</button>
                        </Link>
                    </li>
                    <li>
                        <Link href="/schedule" passHref>
                            <button className="text-1xl tracking-wider font-normal">Schedule</button>
                        </Link>
                    </li>
                    <li>
                        <button onClick={logout} className="text-1xl tracking-wider font-normal">Logout</button>
                    </li>
                </ul>
                }
            </div>
        </nav>
    );
}