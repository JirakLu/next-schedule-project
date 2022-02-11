import { useUser } from '@/lib/firebase/useUser';
import { useEffect, useState } from 'react';

export default function Schedule() {

    const { user } = useUser();

    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const getSchedule = async () => {
            const res = await fetch(`/api/getSchedules/${user?.id}`)
            return await res.json();
        }

        getSchedule().then((res) => {
            const scheduleArray = res.data
            setSchedules(scheduleArray);
        })
    }, [user])

    if (user) {
        return (
            <div>
                {schedules ?
                    schedules.map((schedule, index) => {
                        const { scheduleId, scheduleName } = schedule;
                        return <div key={index}>
                            <h1>{scheduleId}</h1>
                            <p>{scheduleName}</p>
                        </div>
                    })
                :
                    <p>Loading...</p>
                }
            </div>
        )
    } else {
        return <h1>You need to login first</h1>
    }
}