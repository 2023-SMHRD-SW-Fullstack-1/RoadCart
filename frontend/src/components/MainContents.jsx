import React, { useEffect, useState } from 'react'
import './style/MainPageStyle.css'
import axios from 'axios'

const MainContents = () => {

    let url = 'http://localhost:3000/roadgramexample.json';

    const [list, setList] = useState([])

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setList(res.data)
            })
            .catch(() => console.error('error!'))
    }, [])
    return (
        <ul>
                {
                    list.map(item =>
                        <div className='RoadGramItem' >
                            <li>
                            <img src={item.src} id='RoadGramBoxImg' width='200px'></img>
                            <div className='RoadGramItemDetail'>
                                <span>{item.title}</span>
                                <p>{item.subtitle}</p>
                                <p>{item.writer} 님의 여행</p>
                            </div></li>
                        </div>)
            
                }
        </ul>
    )
}

export default MainContents