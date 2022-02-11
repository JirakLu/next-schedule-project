import { db } from '@/lib/firebase/initFirebase'
import { doc, getDoc } from 'firebase/firestore'

export default async function handler(req, res) {
    const { id } = req.query;

    const schedulesIds = await getSchedulesForUser(id);

    if (schedulesIds) {
        const scheduleArray = await Promise.all(schedulesIds.map(async (scheduleId) => {
            const docRef = doc(db, 'schedules-info', scheduleId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    scheduleId,
                    scheduleName: docSnap.data().name
                }
            }
        }));

        if (scheduleArray) {
            return res.status(200).json({data: scheduleArray})
        }
        return res.status(200).json({data: []})
    }

    return res.status(200).json({err: "něco se nepovedlo"});
}

async function getSchedulesForUser(userId) {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    let schedules = [];

    if (docSnap.exists()) {
        schedules = docSnap.data()?.schedules;
    }

    return schedules;
}