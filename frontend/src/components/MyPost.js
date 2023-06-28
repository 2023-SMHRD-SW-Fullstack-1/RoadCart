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
  const userId = sessionStorage.getItem('user_id')
  const id = userId;
  const [myPosts, setMyposts] = useState();
  const navigate = useNavigate();
  const [idx,setIdx] = useState()
  let {comm_idx} = useParams();
  // 게시물 삭제
  // const handleDeletePost = (comm_idx) => {
  //   let deletePost= (posts.filter((post) => comm_idx == post.comm_idx));
  //   console.log("deletedPost",deletePost);
  
   
  //  posts.map((post)=>{
  //   let deletePost=post.comm_idx
    
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
 
  //삭제하기
  const getDeletePost = async()=>{
    await axios.delete(`spring/road/postdelete/${comm_idx}`,config)
    .then((res)=>{
      console.log('삭제mypost',res.data);
      alert("정말 삭제하시겠습니까?")
      //  setPosts(res.data)
      // setMyposts(res.data)
    })

    .catch(error=>console.log("error",error))
  }



//내가 작성한 게시물 가져오기
  const getMyPost = async()=>{
    await axios.post(`spring/road/mypost`,userId,config)
  .then((res)=>{
    setMyposts(res.data);
     setPosts(res.data)})
  .catch(error=>console.log("error",error))
  }

  useEffect(()=>{
    getMyPost();
  },[])
  const handleLike = (post, index) => {
    let user_id = userId;

    if (post.isLike) {
      axios.post("spring/road/community/removelikes", [user_id, post.comm_idx]);
      let temp = [...posts];
      temp[index].comm_likes = temp[index].comm_likes - 1;
      temp[index].isLike = false;
      console.log(temp);
      setPosts(temp);
    } else {
      axios.post("spring/road/community/addlikes", [user_id, post.comm_idx]);
      let temp = [...posts];
      temp[index].comm_likes = temp[index].comm_likes + 1;
      temp[index].isLike = true;
      console.log(temp);
      setPosts(temp);
    }
  };

console.log("myposts",post);


  return (
    <div style={{margin:'100px'}}>
      <form>
      <h2>나의 게시물</h2>
      <br/><br/>
      
    
<div>
<Box sx={{flexGrow:1}}>
      <Grid container spacing={2}>
      {myPosts !== undefined ? 
       myPosts.map((post,index)=>(
        <Grid item xs={6}>
        <div key={post.comm_idx[index]}>
        <Link to={`/post/detail/${post.comm_idx}`} state={post}>
            {/* {post.img_file && post.img_file.length >0 && ( */}
                <img src={"data:/image/;base64,"+post.comm_file} alt="게시물 이미지" style={{ 
                  maxWidth: '100%',width:'600px',height:'400px'}} />
              {/* )} */}
              </Link><br/>
        
              
          <h3 style={{whiteSpace:'pre'}}>{post.comm_title}</h3> 
          <br/>
            <ButtonGroup variant='text' aria-label='text button group'>
                 <Button onClick={() => getDeletePost(post.comm_idx)}>삭제하기</Button>
              <Link to={`/postupdate/${post.comm_idx}`}>
                 <Button onClick={onEditPost}>수정하기</Button>
              </Link>
            </ButtonGroup>
          
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

