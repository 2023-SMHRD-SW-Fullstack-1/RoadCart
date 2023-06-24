import React, { useEffect, useState } from 'react'
import './style/MainPageStyle.css'
import axios from 'axios'

const MainPageBoxItem = () => {

    let url = 'http://localhost:3000/mainpagebox.json';

    const [list, setList] = useState([])

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setList(res.data)
            })
            .catch(() => console.error('error!'))
    }, [])


    return (
        <>

            {/* <div className='MainPageBox' > */}
                {list.map(item =>
                    <div key={item.title} className='MainBoxItem' >
                        <img src={item.src} id='MainPageBoxImg' width='200px'></img>
                        <div className='MainPageTxt'>
                            <span>{item.title}</span>
                            <p>{item.subtitle}</p>
                            <p id='roadCartPost'>roadCart님의 여행</p>
                        </div>

                    </div>)}
            {/* </div> */}
        </>
    )
}

export default MainPageBoxItem