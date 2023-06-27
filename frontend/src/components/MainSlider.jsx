import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwipeCore, { Navigation, Pagination, Autoplay } from 'swiper';
import mainslider1 from './img/MainSlider/mainslider1.jpg'
import mainslider2 from './img/MainSlider/mainslider2.jpg'
import mainslider3 from './img/MainSlider/mainslider3.jpg'
import mainslider4 from './img/MainSlider/mainslider4.jpg'
import mainslider5 from './img/MainSlider/mainslider5.jpg'
import mainslider6 from './img/MainSlider/mainslider6.jpg'
import mainslider7 from './img/MainSlider/mainslider7.jpg'

import 'swiper/css';
import 'swiper/css/autoplay'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import zIndex from '@mui/material/styles/zIndex';


SwipeCore.use([Navigation, Pagination, Autoplay])

export default function MainSlider() {



    return (
        <div className='SwiperContainer' style={{ fontSize: '32pxs' }}>
            <div>
                <Swiper style={{width:'100vw', height:'500px', '--swiper-navigation-color' : 'white', zIndex:"1"}}
                    className="home-banner"
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    roundLengths={true}
                    autoplay={{ delay: 3000 }}>
                
                    <SwiperSlide>
                        <img className="SwiperSliderImg" src={mainslider1}></img>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='SwiperSliderImg' src={mainslider2}></img>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='SwiperSliderImg' src={mainslider3}></img>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='SwiperSliderImg' src={mainslider4}></img>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='SwiperSliderImg' src={mainslider5}></img>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='SwiperSliderImg' src={mainslider6}></img>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='SwiperSliderImg' src={mainslider7}></img>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>

    )
}