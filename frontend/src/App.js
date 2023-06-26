import { Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './components/login/kakao/Profile';
import AuthKakao from './components/login/kakao/AuthKakao';
import AuthNaver from './components/login/naver/AuthNaver';
import LoginPage from './components/LoginPage';
import Main from './components/Main';
import MyPage from './components/MyPage';
import ModifyPage from './components/ModifyPage';
import { useState } from 'react';
import LogOutPage from './components/LogOutPage';
import Google_Nick from './components/login/google/Google_Nick';
import Kakao_Nick from './components/login/kakao/Kakao_Nick';
import JoinPage from './components/JoinPage';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import MyPost from './components/MyPost';
import Update from './components/Update';
import Container  from '@mui/material/Container';
import MainLayout from './components/MainLayout';
import Planner from './components/Planner';



function App() {
  // 로그인 여부 확인 
  const [isLoggendIn, setIsLoggendIn] = useState(false)
  const [posts, setPosts] = useState([]); //게시물 전체
  const [like,setLike] = useState(false) //좋아요 true,fale
  const [likedPosts, setLikedPosts] = useState(['a']); //사용자가 좋아요를 누른 게시물의 comm_idx를 저장
  const [likeCount , setLikeCount] = useState([]) //좋아요 클릭 수
  const [images, setImages] = useState([]); //이미지 전체 배열
  
  // 게시물 추가
  const handleAddPost = (newPost) => {
    setPosts([newPost,...posts])
  };

  // 게시물 수정
  const handleUpdatedPost = (updatedPost,comm_idx) => {
    setPosts(posts.filter((post) => post.comm_idx !== comm_idx));
  };

   // 이미지 업로드 및 미리보기
  const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);
  const imageUrls = files.map((file) => URL.createObjectURL(file));
  setImages(imageUrls);
  console.log("imageUrls:",imageUrls);
};

  return (
    <div className='container' >
      <br/>
      {/* <Container fixed> */}
      <Routes>
        <Route element={<MainLayout isLoggendIn={isLoggendIn}/>}>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<LoginPage isLoggendIn={isLoggendIn} setIsLoggendIn={setIsLoggendIn} />} />
          <Route path='/logout' element={<LogOutPage setIsLoggendIn={setIsLoggendIn} />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/myprofile' element={<ModifyPage />} />
          <Route path='/authkakao' element={<AuthKakao isLoggendIn={isLoggendIn} setIsLoggendIn={setIsLoggendIn} />} />
          <Route path='/authnaver' element={<AuthNaver isLoggendIn={isLoggendIn} setIsLoggendIn={setIsLoggendIn} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/googlenick' element={<Google_Nick setIsLoggendIn={setIsLoggendIn} />} />
          <Route path='/kakaonick' element={<Kakao_Nick setIsLoggendIn={setIsLoggendIn} />} />
          <Route path='/join' element={<JoinPage setIsLoggendIn={setIsLoggendIn} isLoggendIn={isLoggendIn} />} />
          <Route path="/post" element={<PostList  posts={posts} setPosts={setPosts}/>}/>
          <Route path="/post/detail/:comm_idx"  element={<PostDetail posts={posts} 
            like={like}  likedPosts={likedPosts} setLikedPosts={setLikedPosts} likeCount={likeCount} setLikeCount={setLikeCount}
            setLike={setLike}/>}/>
          <Route path="/postform" element={<PostForm onAddPost={handleAddPost} setPosts={setPosts} posts={posts}/>}/>
          <Route path="/mypost" element = {<MyPost  posts={posts} onEditPost={handleUpdatedPost} 
          like={like} setLike={setLike} likedPosts={likedPosts} setLikedPosts={setLikedPosts} likeCount={likeCount} setLikeCount={setLikeCount}
          setPosts={setPosts}/>}/>
          <Route path="/postupdate/:comm_idx" element={<Update posts={posts} setPosts={setPosts} />}/>
          {/* <Route path='/slide' element={<SimpleSlider/>}/> */}
        </Route>
        <Route path='/planner' element={<Planner/>}/>
      </Routes>
      {/* </Container> */}
    </div>
  );
}

export default App;
