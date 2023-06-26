import React, { useEffect, useState } from "react";
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

const MyplanModal = (props) => {
  const { open, close, header, sche_idx } = props;
  console.log(sche_idx);
  useEffect(()=>{
    axios.post("/spring/road/scheduledetail",sche_idx.toString(),{headers:{"Content-Type":"text/plain"}})
    .then((res)=>{
      let list = res.data.poiList;
      list.map((item,index)=>{
        if(item.poi_info.length > 0) {
          let split = item.poi_info.split("@슬라이더@");
          let link = [];
          let img = [];
          let title = [];
          let content = [];
          console.log(split.pop());
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
      console.log(list);
      console.log(new Date(list[0].poi_dt));
    })
  },[]);
  const [info, setInfo] = useState();
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 33.452613, lng: 126.570888 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  })
  const [lineOpacity, setLineOpacity] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [pathList, setPathList] = useState([]);
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}{" "}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
          <Map // 로드뷰를 표시할 Container
                onClick={()=>{setInfo()}}
                center={state.center}
                style={{ width: "500px",height: "500px" }} 
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
                <CustomOverlayMap position={{lat: info.lat, lng: info.lng}} clickable={true} xAnchor={0.274}
                yAnchor={1.23}>
                  <div className="bubble">
                        <button className="bubble-close" type="button" onClick={()=>{setInfo()}}><img src=""/></button>
                        <strong style={{fontSize : "900"}}>{info.poi_name}</strong><br/>
                        {info.poi_category}<br/>
                        {info.poi_addr}<br/>
                        {info.poi_img && <div style={{position: "absolute", right: "15px", top: "80px"}}><img style={{width: "85px", height: "85px"}} src={info.poi_img}/></div>}
                        <div style={{position: "absolute", bottom: "25px"}}>
                        <Stack spacing={2} direction="row">
                        {info.poi_info && <Button variant="contained" >리뷰보기</Button>}
                        </Stack>
                        </div>
                      </div>
                </CustomOverlayMap>}
              </Map>
          </main>
          <footer>
            <button
              className="close"
            >
              저장하기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default MyplanModal;
