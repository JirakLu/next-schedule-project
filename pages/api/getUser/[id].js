import { db } from '@/lib/firebase/initFirebase'
import { doc, getDoc } from 'firebase/firestore'

export default function handler(req, res) {
    const { id } = req.query;

    const readData = async () => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        }
        return {err: "user has no data"};
    }

    readData().then((data) => {
        res.status(200).json(data)
    })

}