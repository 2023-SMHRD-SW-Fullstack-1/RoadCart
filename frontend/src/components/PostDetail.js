import React,{useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import '../../src/App.css';
import ImageSlider from "react-simple-image-slider";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


const PostDetail = ({ like,num,onLike ,posts,likedPosts,likeCount,setLikeCount,setLikedPosts,setLike }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(location.state);
  const {comm_idx} = useParams();
  const [comment, setComment] = useState(); //댓글 한 개
  const [isLike, setIslike] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const id = "1111";
  const nick = "2222";


const config = {
  headers: { 'Content-Type': 'multipart/form-data'/'application/json;charset=UTF-8'}
}


  const getComments = async()=>{
    await axios.post(`/spring/road/comment/${comm_idx}`)
  .then((res)=>{
    let list = res.data.commentList;
    list.map((item,index)=>{list[index].user_nick = res.data.user_nick[index];})
    setCommentList(list);
  })
  .catch((e)=>{console.log(e)})
  }
  useEffect(()=>{
    // axios.post(`/spring/road/postdetail/${comm_idx}`)
    // .then((res)=>{setPost(res.data);})
    getComments();
  },[])
  

  const handleGoBack = () => {
    navigate(-1);
  };
 
  

  const handleCommentSubmit = (e) => {
    if (!comment) return;
      const commentData={
        comm_idx: comm_idx,
        user_id: id,
        cmt_content: comment
      }    
      axios.post(`/spring/road/comment`,commentData,{headers: {'Content-Type': 'application/json'}})
      .then((res)=>{
        let list = res.data.commentList;
        list.map((item,index)=>{list[index].user_nick = res.data.user_nick[index];})
        console.log(list);
        setCommentList(list);
      })
      setComment("");
  };

  const handleLike = () => {
    let user_id = id;

    if (isLike) {
      axios.post("/spring/road/community/removelikes", [user_id, post.comm_idx]);
      let temp = post;
      temp.comm_likes = temp.comm_likes - 1;
      setIslike(false);
      setPost(temp);
      
    } else {
      axios.post("/spring/road/community/addlikes", [user_id, post.comm_idx]);
      let temp = post;
      temp.comm_likes = temp.comm_likes + 1;
      setIslike(true);
      setPost(temp);
    }
  };

     const removeComment = async(comment)=>{
      await axios.post(`/spring/road/comment/delete/${comment.cmt_idx}`);
      getComments();
     }

  return (
    <div className='postDetailContainer'>
      <form>
        {/* <ImageSlider images={"data:image/;base64,"+file} width={700} 
        height={700} showBullets={true} showNavs={true} style={{marginLeft:'220px'}}/>  */}
      {/* {post.comm_file.map((post, index) => ( */}
      <img src={"data:/image/;base64,"+post.comm_file} alt="게시물 이미지" style={{ 
                  maxWidth: '100%',width:'400px',height:'300px'}} />
      {/* ))}<br/><br/><br/> */}
      <span style={{float:'left' ,marginLeft:'200px'}}>
      <Button
                    onClick={()=>{handleLike()}}
                    style={{
                      border: 'none',
                      backgroundColor: 'white',
                      width: '70px',
                    }}
                  >
                    {isLike ? (
                      <span>💗{post.comm_likes}</span>
                    ) : (
                      <span>🤍{post.comm_likes}</span>
                    )}
                    <span>{post.like_count}</span>
          </Button>
        </span>
       <br/><br/>
      <h3 style={{whiteSpace: 'pre-wrap'}}>{post.comm_title}</h3>
      <br/><br/><br/>
      <p style={{whiteSpace: 'pre-wrap'}} >{post.comm_content}</p>

      <br/><br/><br/><br/><br/><br/>
      <div>
       
        <Box style={{backgroundSize:'cover',position:'relative'}}>
        <TextField id="standard-basic" label="댓글" name="comment" variant="standard" onChange={(e)=>{setComment(e.target.value)}} value={comment}
         style={{width:"630px",height:'40px'}} />
        
       
        <Button onClick={handleCommentSubmit} style={{float:'right',marginRight:'0px'
      ,position:'absolute',top:'50%',left:'50%',transform:'translate(430%,-50%)'}}>작성</Button><br/><br/>
       
        </Box>
        {commentList.map((comment, index) => (
          <div style={{display:"flex", flexDirection:"row", alignItems: "center", textAlign: "center"}}>
            <strong>{comment.user_nick}</strong>
            <p key={index} >{comment.cmt_content}</p>
            <p>{comment.cmt_dt}</p>
            {comment.user_id === id && <button type='button' onClick={()=>{removeComment(comment)}}>삭제</button>}
          </div>
        ))}
        
      </div>
      <br/><br/><br/><br/><br/><br/>
      <Button onClick={handleGoBack}>뒤로가기</Button>
      </form>
    </div>
  );
};

export default PostDetail;

