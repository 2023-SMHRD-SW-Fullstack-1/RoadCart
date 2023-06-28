import React, { useEffect, useRef, useState } from "react";
import "../CSS/MyplanModal.css";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  Polyline,
} from "react-kakao-maps-sdk";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios";
import Review from './Review';
import { Link } from "react-router-dom";

const MyplanModal = (props) => {
  const [columns, setColumns] = useState();
  const { open, close, header, item } = props;
  const [lineOpacity, setLineOpacity] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [pathList, setPathList] = useState([]);
  const [info, setInfo] = useState();
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 33.452613, lng: 126.570888 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  })


  useEffect(()=>{
    
    axios.post("/spring/road/scheduledetail",item.sche_idx.toString(),{headers:{"Content-Type":"text/plain"}})
    .then((res)=>{
      let list = res.data;
      list.map((item,index)=>{
        list[index].poi_dt = item.poi_dt.replaceAll("-","");
        if(item.poi_info.length > 0) {
          let split = item.poi_info.split("@슬라이더@");
          let link = [];
          let img = [];
          let title = [];
          let content = [];
          split.forEach((element,index) => {
            if (index % 4 === 0) {
              link.push(element);
            } else if (index % 4 === 1) {
              img.push(element);
            } else if (index % 4 === 2) {
              title.push(element);
            } else {
              content.push(element);
            }
          });
          
          let newList = [];
          
          for (let i = 0; i < link.length - 1; i++){
            newList.push({
              link: link[i],
              img: img[i],
              title: title[i],
              content: content[i]
            })
          }
          list[index].poi_info = newList;

        }
        
      })
      let map = {};
      list.forEach(item => {
        map[item.poi_dt] = {
          title: item.poi_dt,
          items: []
        }
      });
      list.forEach(item => {
      map[item.poi_dt].title === item.poi_dt && map[item.poi_dt].items.push(item);
      });
      setColumns(map);
      res.data && setState({
        center: {lat: res.data[0].lat,lng:res.data[0].lng},
        isPanto: true
      })
    })
    

  },[]);

  useEffect(()=>{ // 경로 리렌더링
    let list = [];
    markers.forEach(item => list.push({lat: item.lat, lng: item.lng}));
    setPathList(list);
  },[markers])
  
  
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {   }
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div>
            <div style={{float:"left", paddingBottom:"10px"}}>
              <Map // 로드뷰를 표시할 Container
                onClick={()=>{setInfo()}}
                center={state.center}
                style={{ width: "600px",height: "600px" }} 
                isPanto={state.isPanto}
                level={3}
                onCreate={setMap}
              >
                {lineOpacity === true && 
                <Polyline
                  path={[pathList]}
                  strokeWeight={5} // 선의 두께 입니다
                  strokeColor={"#FFAE00"} // 선의 색깔입니다
                  strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                  strokeStyle={"solid"} // 선의 스타일입니다
                />}
                {markers.map((marker, idx) => (
                  <MapMarker
                    key={`marker-${marker.poi_name}-${marker.lat},${marker.lng}`}
                    position={{lat: marker.lat, lng: marker.lng}}
                    onClick={() => setInfo(marker)}
                  >
                  </MapMarker>
                ))}
                {info && 
                <CustomOverlayMap position={{lat: info.lat, lng: info.lng}} clickable={true} xAnchor={0.415}
                yAnchor={1.35}>
                  <div className="bubble" style={{width:"180px", height:"60px"}}>
                        <strong style={{fontSize : "900"}}>{info.poi_name}</strong><br/>
                        {info.poi_category}<br/>
                        {info.poi_addr}<br/>
                        
                        <div style={{position: "absolute", bottom: "25px"}}>

                        </div>
                      </div>
                </CustomOverlayMap>}
              </Map>
              </div>
              {Object.entries(columns).map((item)=>
              <div onClick={()=>{setMarkers(item[1].items); setInfo();}} style={{display:"",flexDirection:"column"}}>
                <ol>
                  <span>{parseInt(item[0].substring(4,6)).toString()}월 {parseInt(item[0].substring(6,8).toString())}일</span>
                  {item[1].items.map((item)=><li>{item.poi_name}</li>)}
                </ol>
              </div>
                
                )}
                </div>
          </main>
          <footer>
            <Link to={"/postform"} state={{columns, item}}><button className="close">글쓰기</button></Link>{" "}
            <Link to={"/planner"} state={{columns, item}}><button className="close">수정하기</button></Link>{" "}
            <button className="close">삭제하기</button>
          </footer>
        </section>
      ) : null}
    </div>

  );
};

export default MyplanModal;
