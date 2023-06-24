import React from 'react'
import MainPageBoxItem from './MainPageBoxItem';
import Grid from '@mui/material/Grid';
import ImageSlider from "react-simple-image-slider";
import mainLogo from './img/roadLogo.png'
import { borderRadius, boxSizing, height, margin, width } from '@mui/system';
import MainContents from './MainContents';
import MainGuide from './MainGuide';

const Main = () => {
    const imgList = [
        "https://www.lottehotelmagazine.com/resources/d434c17f-5ac2-4b98-8021-f3bdd5cc26f4_img_TRAVEL_busan_detail01.jpg",
        "https://a.cdn-hotels.com/gdcs/production37/d1169/1dcbfef5-2070-48ce-8d62-3e0fffa21797.jpg"]
    const images = () => {
        let imgUrl = imgList.map((item) => {
            console.log(item);
        })
    }
    return (

        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div id='mainPage-roadCartTxt'>
                    <h6>나만의 여행지를 담다🛒</h6>
                    {/* <img src={mainLogo} height='80px' width='100%'/> */}
                    <h1>길바구니</h1>
                </div>
                <section style={{ height: '400px', width: '100%', minWidth: '28rem' }} >
                    {/* <ImageSlider id='ImageSlider' images={imgList} width={'100%'} objectFit={imgList} height={'700px'}
    showBullets={true} showNavs={true} autoPlay={false} />*/}
                </section>
                <section style={{ backgroundColor: 'lightgray', width: '100%', height: '200px' }}>
                    <MainGuide/>
                </section>
                <div style={{ backgroundColor: '#f6f6f6', width: '100%', paddingBottom: '40px', paddingTop: '20px' }}>
                    <div id='MonthContainer'>
                        <h1 id='MonthTitle'> 7월 국내 축제 🎈</h1>
                    </div>
                    <Grid container spacing={2}  >
                        <Grid item xs={6}>
                            <div className='TextOnImg'>
                                <div className='BackgroundWrap'>
                                    <div className='Content'>
                                        <span>은하수를 여행하는 몽골 여행자를 위한 안내서</span>
                                        <p id='ContentP'>보성차의 역사·문화·경관자원을 활용해 몸과 마음을 힐링하는 문화관광축제</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6}><MainPageBoxItem />
                        </Grid>
                    </Grid>
                </div>
                <div className='MainSection'>
                    <h1>요즘, 어디 가?👀</h1>
                    <MainContents />
                </div>
            </div>
        </>
    )
}

export default Main