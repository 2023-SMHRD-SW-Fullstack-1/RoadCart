import React ,{useEffect, useState}from 'react';
import {useNavigate,Link} from 'react-router-dom'
import  Button  from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';


import '../../src/App.css'


const PostList = ({like,onLike,posts,setPosts,onAddPost,setLike,likeCount,setLikeCount,likedPosts,setLikedPosts}) => {
    
    const navigate = useNavigate();
    const [filteredPosts ,setFilteredPosts] =useState([]) //검색된 게시물
    const [userInput, setUserInput] = useState(''); //사용자가 검색창에 입력한 값
    const [isLike, setIslike] = useState([]);
  

    const config = {
      headers: { 'Content-Type': 'multipart/form-data'/'application/json;charset=UTF-8'}
    }
    

    //백엔드에서 전체 게시물 불러오기
    useEffect(()=>{
      axios.post(`http://172.30.1.39:8089/road/post`,config)
      .then((res)=>{
      console.log('결과',res.data);
       setPosts(res.data)
      }
    )
    .catch(error=>console.log("error",error))
    },[])

    useEffect(()=>{
      let list =[];
      posts.forEach(post=>list.push(post.community.comm_idx));
      let isLike = {
        user_id: "1111",
        comm_idx: list
      }
      axios.post("http://172.30.1.39:8089/road/community/islikes", isLike)
    .then((res)=>{console.log("isLikes",res);
      setIslike(res.data);
  })
    },[posts])

  //검색 기능 구현
  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase())
  }
  const handleSearch = () => {
      
    const filteredPosts = posts.filter((post) => {
      // 제목 또는 내용에 검색어가 포함된 게시물 필터링
        return post.community.comm_title.includes(userInput) || post.community.comm_content.includes(userInput);
    });
      // 검색 결과 업데이트
        setFilteredPosts(filteredPosts);
        
        };

      //좋아요를 누르면 likeesPosts에 배열이 있는 지 확인하고 있으며 user_id제거
        const handleLike = (comm_idx,index) => {
          let user_id = "1111";
          // axios.post(`http://172.30.1.39:8089/road/community/likes`, config)
          // .then((res)=>{
          //   console.log('결과',res.data);
          //    setPosts(res.data)})
          // .catch(error=>console.log("error",error))
      
          // num2+=1
          // setLikeCount(num2)
          console.log(index);
          if (isLike[index] && likedPosts.includes(user_id)) {
            let temp = [...posts];
            temp[index].community.comm_likes--;
            setPosts(temp);
            // 이미 좋아요를 누른 경우,좋아요 취소
            // num2-=1
            // setLikeCount(num2)
            setLikedPosts((prevLikedPosts) =>
              prevLikedPosts.filter((comm_idx) => comm_idx !== user_id)
            )
            setLike(true)
            // console.log(like);
            // console.log("likePosts",likedPosts);
            let list = [...isLike];
            list.splice(index, 1, false);
            console.log(list);
            setIslike(list);
          } else {
            console.log("false");
            // 좋아요 누르지 않은 경우 좋아요 추가
            setLikedPosts((prevLikedPosts) => [...prevLikedPosts, user_id]);
            setLike(false)
            let temp = [...posts];
            temp[index].community.comm_likes++;
            setPosts(temp);
            let list = [...isLike];
            list.splice(index, 1, true);
            console.log(list[0]);
            setIslike(list);
          }
         
        } 
    
        


  return (
    <div style={{margin:'50px'}}>
    <h1>길스타그램</h1>
    <p>여러분의 길바구니를 자랑해주세요😊</p>
      <div style={{ float:'right'}}>
        <input
          type="text"
          defaultValue={filteredPosts}
          onChange={getValue}
          
          placeholder="검색어를 입력하세요"
        />
        <button onClick={handleSearch} style={{
          backgroundColor:'black',color:'white'
        }}>검색</button><br/>
        </div>
        <div style={{float:'left'} }>
        <Button onClick={()=>{navigate('/postform')}} variant='outlined'>글쓰기</Button>
        {/* <button onClick={handleClickMyPosts}>내 게시물 보기</button> */}

       </div>
      <br/><br/><br/><br/><br/><br/>
      
       <Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
      
      {filteredPosts.length>0 ?  filteredPosts.map((filteredPosts,i)=>(
        <Grid item xs={6}>
        <div key={filteredPosts.community.comm_idx} className='PostListDiv'>
          {/* <h4>검색된 게시물</h4> */}
          
          <Link to={`/post/detail/${filteredPosts.community.comm_idx}`}>
            {/* {filteredPosts.images && filteredPosts.images.length >0 && ( */}
                <img src={"data:/image/;base64,"+filteredPosts.community.comm_file} alt="게시물 이미지" style={{ 
                  maxWidth: '100%',width:'400px',height:'300px'}} />
              {/* )} */}
              </Link><br/> 
          <span style={{float:'left' ,marginLeft:'40px'}}>      
          <Button
                    onClick={() => handleLike(filteredPosts.community.comm_idx)}
                    style={{
                      border: 'none',
                      backgroundColor: 'white',
                      width: '70px',
                    }}
                  >
                    {likedPosts.includes(filteredPosts.community.comm_idx) ? (
                      <span>💗{likeCount}</span>
                    ) : (
                      <span>🤍{likeCount}</span>
                    )}
                    <span>{filteredPosts.community.like_count}</span>
          </Button>
              </span>
            <br/>
          <h3>{filteredPosts.community.comm_title}</h3> 
          
          <br/><br/>
        </div>
        </Grid>
      )) : 
      
      posts.map((post,index,list) => (
        <Grid item xs={6}>
        <div key={post.community.comm_idx} className='PostListDiv' >
          <Link to={`/post/detail/${post.community.comm_idx}`}>
            {/* {post.community.img_file && post.community.img_file.length >0 && ( */}
                <img src={"data:/image/;base64,"+post.community.comm_file} alt="게시물 이미지" style={{ 
                  maxWidth: '100%',width:'400px',height:'300px'}} />
              {/* )} */}
              </Link><br/>
              
             <span style={{float:'left' ,marginLeft:'40px'}}>
             <Button
                    onClick={() => handleLike(post.community.comm_idx,index)}
                    style={{
                      border: 'none',
                      backgroundColor: 'white',
                      width: '70px',
                    }}
                  >
                     {list[index] == true && post? (
                      <span>💗{post.community.comm_likes}</span>
                    ) 
                    : (
                      <span>🤍{post.community.comm_likes}</span>
                    )}
          </Button>
              </span>
              <br/>
          <h3 style={{whiteSpace:'pre'}}>{post.community.comm_title}</h3>
          
         <br/><br/>
            
        </div> 
        </Grid>
       
      )
      )
      }
     </Grid></Box>
      
    </div>
  );
};

export default PostList;
