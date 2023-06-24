import React, { useState } from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import MyPost from './components/MyPost';
import Update from './components/Update';
import Main from './components/Main'
import  Container  from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import axios from 'axios'
import Delete from './components/Delete';

function App() {

  const [post , setPost] =useState([]); //게시물 한 개
  const [posts, setPosts] = useState([]); //게시물 전체
  const [like,setLike] = useState(false) //좋아요 true,fale
  const [likedPosts, setLikedPosts] = useState(['a']); //사용자가 좋아요를 누른 게시물의 comm_idx를 저장
  const [likeCount , setLikeCount] = useState([]) //좋아요 클릭 수
  const [images, setImages] = useState([]); //이미지 전체 배열
  

 

    
  // 게시물 추가
    const handleAddPost = (newPost) => {
    setPosts([newPost,...posts])
    setPost([newPost])
    // console.log(newPost); 
    };

  
  // 게시물 수정
  const handleUpdatedPost = (updatedPost,comm_idx) => {
    // setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));

    setPosts(posts.filter((post) => post.community.comm_idx !== comm_idx));
    // console.log("2" , setPosts);
  };
 

  // // 좋아요
  // const handleLike =(user_id)=>{
  //   console.log(like);
  //   if(like){
  //     setLike(user_id, false)
  //     setNum(num-1)
  //   }else{
  //     setLike(user_id, true)
  //     setNum(num)
  //   }
  //   setLike(!like)
  //   console.log("num",num);
  // }
   // 이미지 업로드 및 미리보기
 const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);
  const imageUrls = files.map((file) => URL.createObjectURL(file));
  setImages(imageUrls);
  console.log("imageUrls:",imageUrls);
};
 


  return (
    <div className="App">
  
      <Header/>
      <br/>
      <Container fixed>
      <Routes>
        <Route path='/' element={<Main posts={posts} like={like}
        />}></Route>

        <Route path="/post" element={<PostList  posts={posts} like={like} 
         setPosts={setPosts} onAddPost={handleAddPost} setLike={setLike} 
         likedPosts={likedPosts} setLikedPosts={setLikedPosts} likeCount={likeCount} setLikeCount={setLikeCount}/>}/>
        
        <Route path="/post/detail/:comm_idx"  element={<PostDetail posts={posts} 
           post={post} like={like}  likedPosts={likedPosts} setLikedPosts={setLikedPosts} likeCount={likeCount} setLikeCount={setLikeCount}
           setPost={setPost} setLike={setLike}
           />}/>
         
        <Route
          path="/postform"
          element={<PostForm onAddPost={handleAddPost} setPosts={setPosts} posts={posts}
          post={post}/>}/>
        
        <Route path="mypost" 
        element = {<MyPost  posts={posts} onEditPost={handleUpdatedPost} 
        like={like}   post={post} setLike={setLike} likedPosts={likedPosts} setLikedPosts={setLikedPosts} likeCount={likeCount} setLikeCount={setLikeCount}
        setPosts={setPosts} setPost={setPost}/>}/>

           <Route
          path="/postupdate/:comm_idx"
          element={<Update posts={posts} post={post} setPosts={setPosts} />}/>

          {/* <Route path='/postdelete/:comm_idx' 
          element={<Delete posts={posts} post={post}/>}/>
         */}
      </Routes>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;

