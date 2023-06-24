import React, { useState } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import '../../src/App.css';
import { useEffect } from 'react';
import axios from 'axios';
// import Link from '@mui/material/Link'

function MyPost({ post, posts, onDeletePost, onEditPost, like,num,onLike,setPosts,setPost,
  setLike,likedPosts,likeCount,setLikeCount,setLikedPosts }) {
  const [myPosts, setMyposts] = useState();
  const navigate = useNavigate();
  const [idx,setIdx] = useState()
  let {comm_idx} = useParams();
  // 게시물 삭제
  // const handleDeletePost = (comm_idx) => {
  //   let deletePost= (posts.filter((post) => comm_idx == post.community.comm_idx));
  //   console.log("deletedPost",deletePost);
  
   
  //  posts.map((post)=>{
  //   let deletePost=post.community.comm_idx
    
  //   console.log(deletePost);
  //   console.log("1",myPosts);
  // })
  // };
 
  // for(let i = 0; i<newPosts.length; i++){
  //   console.log("post[i]",posts[i]);
  //     if(posts[i] === findPost){
  //       posts.splice(i,1)
  //     console.log(post[i]);  
  //       setPosts([...posts,updatedPost])
  //     }
  //   }
 

//   const requestData ={
//     comm_idx: idx
//   }

//  console.log("requestData",idx);
  const config = {
    headers: { 'Content-Type': 'application/json; charset=UTF-8'
    // /'application/json;charset=UTF-8' 
  }
  }
  const deleteData={
    comm_idx : comm_idx
  }
  //삭제하기
  const getDeletePost = async()=>{
    await axios.delete(`http://172.30.1.39:8089/road/postdelete`,deleteData,config)
    .then((res)=>{
      console.log('삭제mypost',res.data);
      alert("정말 삭제하시겠습니까?")
      //  setPosts(res.data)
      // setMyposts(res.data)
    })

    .catch(error=>console.log("error",error))
  }
  useEffect(()=>{
    getDeletePost()
  },[])


//내가 작성한 게시물 가져오기
  const getMyPost = async()=>{
    await axios.post(`http://172.30.1.39:8089/road/mypost`,config)
  .then((res)=>{
    setMyposts(res.data);
     setPosts(res.data)})
  .catch(error=>console.log("error",error))
  }

  useEffect(()=>{
    getMyPost();
  },[])
  let num2 = 0
  //좋아요를 누르면 likeesPosts에 배열이 있는 지 확인하고 있으며 user_id제거
    const handleLike = (user_id,like_sum) => {
      console.log("like",like_sum);
      axios.post(`http://172.30.1.39:8089/road/post`,config)
      .then((res)=>{
        // console.log('결과',res.data);
         setPosts(res.data)})
      .catch(error=>console.log("error",error))
      num2+=1
      setLikeCount(num2)
      if (likedPosts.includes(user_id)) {
        // 이미 좋아요를 누른 경우,좋아요 취소
        num2-=1
        setLikeCount(num2)
        setLikedPosts((prevLikedPosts) =>
          prevLikedPosts.filter((comm_idx) => comm_idx !== user_id)
        )
        setLike(false)
        
      } else {
        // 좋아요 누르지 않은 경우 좋아요 추가
        setLikedPosts((prevLikedPosts) => [...prevLikedPosts, user_id]);
        setLike(true)
        setLikeCount(num2)
       
        
      }
     

console.log("num",num2);};


  return (
    <div >
      <form>
      <h2>나의 게시물</h2>
      <br/><br/>
      {/* <Link underline="hover" color="inherit" href="/postform">
        작성하기
      </Link>
      <Link underline="hover" color="inherit" href="/post">
        
      </Link> */}
    
<div>
<Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
      {myPosts !== undefined ? 
       myPosts.map((post)=>(
        <Grid item xs={6}>
        <div key={post.community.comm_idx}>
        <Link to={`/post/detail/${post.community.comm_idx}`}>
            {/* {post.community.img_file && post.community.img_file.length >0 && ( */}
                <img src={"data:/image/;base64,"+post.community.comm_file} alt="게시물 이미지" style={{ 
                  maxWidth: '100%',width:'400px',height:'300px'}} />
              {/* )} */}
              </Link><br/>
          <span style={{float:'left' ,marginLeft:'60px'}}>
          <Button
                    onClick={() => handleLike(post.community.comm_idx)}
                    style={{
                      border: 'none',
                      backgroundColor: 'white',
                      width: '70px',
                    }}
                  >
                    {likedPosts.includes(post.community.comm_idx) ? (
                      <span>💗{likeCount}</span>
                    ) : (
                      <span>🤍{likeCount}</span>
                    )}
                    <span>{post.community.like_count}</span>
          </Button>
           </span>
              <br/><br/>
          <h3 style={{whiteSpace:'pre'}}>{post.community.comm_title}</h3> 
         
            <ButtonGroup variant='text' aria-label='text button group'>
                 <Button onClick={() => getDeletePost(post.community.comm_idx)}>삭제하기</Button>
              <Link to={`/postupdate/${post.community.comm_idx}`}>
                 <Button onClick={onEditPost}>수정하기</Button>
              </Link>
            </ButtonGroup>
          
            {/* <Link to={`/post/detail/${post.community.comm_idx}`}><button>게시물 보기</button></Link> */}
        </div>
        </Grid>
        
      ))
      : ( 
        <p>작성한 게시물이 없습니다.</p>
      )}
      </Grid></Box>
      </div>
      </form>
    </div>
  );
}

export default MyPost;

