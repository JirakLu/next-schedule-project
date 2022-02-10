import { useUser } from '@/lib/firebase/useUser';

export default function Schedule() {

    const { user } = useUser();

    if (user) {
        return <h1>Test</h1>
    } else {
        return <h1>You need to login first</h1>
    }
}