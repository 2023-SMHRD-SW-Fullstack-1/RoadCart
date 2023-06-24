import React,{useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import '../../src/App.css';
import ImageSlider from "react-simple-image-slider";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


const PostDetail = ({ like,num,onLike ,posts,post,likedPosts,likeCount,setLikeCount,setLikedPosts 
  ,setPost,setLike }) => {
const navigate = useNavigate();
const [comment, setComment] = useState(''); //댓글 한 개
  const [comments, setComments] = useState([]); //댓글 전체

// console.log(posts[0].community.comm_idx);
let {comm_idx} = useParams();
let findPost = posts.find((post) => {
    return post.community.comm_idx == comm_idx
})

const config = {
  headers: { 'Content-Type': 'multipart/form-data'/'application/json;charset=UTF-8'}
}
const requestData={
   comm_idx: comm_idx,
   like_yn : like,
   user_id: "1111",
   cmt_content:comments
}

const file=()=>{
  let img = findPost.community.comm_file.map((item)=>{
    console.log(item);
    console.log("img",img);
  })
}
  useEffect(()=>{
    axios.post(`http://172.30.1.39:8089/road/postdetail/${comm_idx}`,config,requestData)
  .then((res)=>{
    console.log('결과',res.data);
    setPost(res.data.community)
    console.log("gggg",post);
    })
  .catch(error=>console.log("error",error))
  let list = [];
  posts.forEach(post => {
    list.push(post.community.comm_idx);
  });
   const commentData = {
    user_id:"1111",
    comm_idx:list
   }
   axios.post(`http://172.30.1.39:8089/road/postdetail/${comm_idx}`,commentData,config,)
  .then((res)=>{console.log(res.data)})
  .catch((e)=>{console.log(e)})

  },[])

  const handleGoBack = () => {
    navigate(-1);
  };
 
  // 댓글
  const handleCommentChange = (e) => {
    setComment(e.target.value);  
  };

  const handleCommentSubmit = (e) => {
    if (comment.trim() !== '') { 
      const commentData={
        comm_idx:comm_idx,
        user_id:"1111",
        comm_content: comment
      }    
      console.log("commentData",commentData);
      axios.post(`http://172.30.1.39:8089/road/comment`,commentData,config)
      .then((res)=>{
        setComments((prevComments) => [comment,...prevComments]);
        console.log("setComments",comments);})
      .catch((e)=>{console.log(e)})
        setComment('')
    
    }
  };

  let num2 = 0
  //좋아요를 누르면 likeesPosts에 배열이 있는 지 확인하고 있으며 user_id제거
    const handleLike = (user_id,like_sum) => {
      console.log("like",like_sum);
      axios.post(`http://172.30.1.39:8089/road/post`,config)
      .then((res)=>{
        // console.log('결과',res.data);
         setPost(res.data)})
      .catch(error=>console.log("error",error))
  
      num2+=1
      setLikeCount(num2)
      console.log(likeCount);
      if (likedPosts.includes(user_id)) {
        // 이미 좋아요를 누른 경우,좋아요 취소
        num2-=1
        setLikeCount(num2)
        setLikedPosts((prevLikedPosts) =>
          prevLikedPosts.filter((comm_idx) => comm_idx !== user_id)
        )
        setLike(false)
        console.log(like);
        console.log("likePosts",likedPosts);
      } else {
        // 좋아요 누르지 않은 경우 좋아요 추가
        setLikedPosts((prevLikedPosts) => [...prevLikedPosts, user_id]);
        setLike(true)
       
        
      }
     

console.log("num",num2);};
// console.log(findPost);
 
  return (
    <div className='postDetailContainer'>
      <form>
        {/* <ImageSlider images={"data:image/;base64,"+file} width={700} 
        height={700} showBullets={true} showNavs={true} style={{marginLeft:'220px'}}/>  */}
      {/* {findPost.community.comm_file.map((findPost, index) => ( */}
      <img src={"data:/image/;base64,"+findPost.community.comm_file} alt="게시물 이미지" style={{ 
                  maxWidth: '100%',width:'400px',height:'300px'}} />
      {/* ))}<br/><br/><br/> */}
      <span style={{float:'left' ,marginLeft:'200px'}}>
      <Button
                    onClick={() => handleLike(findPost.community.comm_idx)}
                    style={{
                      border: 'none',
                      backgroundColor: 'white',
                      width: '70px',
                    }}
                  >
                    {likedPosts.includes(findPost.community.comm_idx) ? (
                      <span>💗{likeCount}</span>
                    ) : (
                      <span>🤍{likeCount}</span>
                    )}
                    <span>{findPost.community.like_count}</span>
          </Button>
        </span>
       <br/><br/>
      <h3 style={{whiteSpace: 'pre-wrap'}}>{findPost.community.comm_title}</h3>
      <br/><br/><br/>
      <p style={{whiteSpace: 'pre-wrap'}} >{findPost.community.comm_content}</p>

      <br/><br/><br/><br/><br/><br/>
      <div>
       
        <Box style={{backgroundSize:'cover',position:'relative'}}>
        <TextField id="standard-basic" label="댓글" name="comment" variant="standard" onChange={handleCommentChange} value={comment}
         style={{width:"630px",height:'40px'}} />
        
       
        <Button onClick={handleCommentSubmit} style={{float:'right',marginRight:'0px'
      ,position:'absolute',top:'50%',left:'50%',transform:'translate(430%,-50%)'}}>작성</Button><br/><br/>
       
        </Box>
        {comments.map((comment, index) => (
          <p key={index} >{comment}</p>
        ))}
        
      </div>
      <br/><br/><br/><br/><br/><br/>
      <Button onClick={handleGoBack}>뒤로가기</Button>
      </form>
    </div>
  );
};

export default PostDetail;

