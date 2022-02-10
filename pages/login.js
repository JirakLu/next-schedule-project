import Link from 'next/link'
import FirebaseAuth from '@/components/FirebaseAuth';

export default function Login() {
    return (
        <div>
            <FirebaseAuth />
            <Link href="/" passHref>
                <button>Go back</button>
            </Link>
        </div>
    )
}