import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import React from 'react';

const Home: NextPage = () => {
    const router = useRouter();
    const { name, id } = router.query;
    React.useEffect(() => {
        name && fetch("/api/count", {
            method: "POST",
            body: JSON.stringify({
                event_name: name, id, ts: new Date().toLocaleString()
            })
        })
    }, [name])


    return (
        <div className='main'>
            <img src="/yellow-card.png" width={250} />
            <h1>当メールは<br /><strong>標的型訓練メール</strong>です</h1>
            <div>
                <p>ほかの方も訓練中につき<strong>他言無用</strong>でお願いいたします。</p>
            </div>
        </div>
    )

}
export default Home
