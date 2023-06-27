import '../App.css'
import React from 'react'

const MainGuide = () => {
    return (
        <div className='MainGuideContainer'>
            <div className='MainGuideTitle'>
                <p>여행지를 검색하고 마음에 드는 장소를 길바구니에 담아서 나만의 일정을 만드는 여행 일정 플래너</p>
            </div>
            <div className='MainGuidStep'>
                <p>STEP 1</p>
                <p>여행지 검색</p>
            </div>
            <div className='MainGuidStep'>
                <p>STEP 2</p>
                <p>길바구니에 장소 담기</p>
            </div>
            <div className='MainGuidStep'>
                <p>STEP 3</p>
                <p>일정 만들기</p>
            </div>
        </div>
    )
}

export default MainGuide