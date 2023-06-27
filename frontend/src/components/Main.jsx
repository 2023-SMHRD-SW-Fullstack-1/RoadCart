import React, { useEffect } from 'react'
import MainPageBoxItem from './MainPageBoxItem';
import Grid from '@mui/material/Grid';
import ImageSlider from "react-simple-image-slider";
import mainLogo from './img/roadLogo.png'
import { borderRadius, boxSizing, height, margin, width } from '@mui/system';
import MainContents from './MainContents';
import MainGuide from './MainGuide';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MainSlider from './MainSlider';
import '../Main.css'

const Main = ({posts,setPosts}) => {
   
    const imgList = [
        "https://www.lottehotelmagazine.com/resources/d434c17f-5ac2-4b98-8021-f3bdd5cc26f4_img_TRAVEL_busan_detail01.jpg",
        "https://a.cdn-hotels.com/gdcs/production37/d1169/1dcbfef5-2070-48ce-8d62-3e0fffa21797.jpg"]
    const images = () => {
        let imgUrl = imgList.map((item) => {
            console.log(item);
        }) }
      
   
    return (

        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div id='mainPage-roadCartTxt'>
                    <h6>나만의 여행지를 담다🛒</h6>
                    {/* <img src={mainLogo} height='80px' width='100%'/> */}
                    <h1>길바구니</h1>
                </div>
                <MainSlider/>
                {/* <section  > */}
                    {/* <ImageSlider id='ImageSlider' images={imgList} width={'100%'} objectFit={imgList} height={'700px'}
    showBullets={true} showNavs={true} autoPlay={false} />*/}
                {/* </section> */}
                <section style={{ backgroundColor: 'f6f6f6' }}>
                    <MainGuide/>
                </section>
                <div style={{ width: '100vw', paddingBottom: '40px', paddingTop: '20px' }}>
                    <div id='MonthContainer'>
                        <h1 id='MonthTitle'> 7월 국내 축제 🎈</h1>
                    </div>
                    <Grid container spacing={2}  >
                        <Grid item xs={6} >
                               
                            <div className='TextOnImg' >
                                <Link to={`/post/detail/102`}>
                                <div className='BackgroundWrap'>
                                    <div className='Content' >
                                         <span style={{color:'white'}}>청도 프로방스 빛축제</span>
                                         <p id='ContentP' style={{color:'white'}}>프로방스 마을로의 로맨틱한 여행과 빛축제를 즐길 수 있는 곳 </p>
                                    </div> 
                                </div>
                                </Link>
                            </div>
                         
                        </Grid>
                        <Grid item xs={6}><MainPageBoxItem />
                        </Grid>
                    </Grid>
                </div>
                <div className='MainSection'>
                    {/* <h1>요즘, 어디 가?👀</h1> */}
                    {/* <MainContents /> */}
                </div>
            </div>
        </>
    )
}

export default Main