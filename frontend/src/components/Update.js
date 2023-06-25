import React, { useState } from 'react';
import {Link, useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import axios from 'axios';



function Update({posts,post,setPosts}) {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [myPosts,setMyposts] =useState()
  const navigate = useNavigate();

  //url에 담긴 id값 가져오기
  console.log();
let {comm_idx} = useParams();
//  console.log(comm_idx);
let findPost = posts.find((post) => {
    return post.comm_idx == comm_idx
})
// let findPost = posts.filter((post)=>{
//   console.log("ggg",post.comm_idx);
//   return post.comm_idx !== comm_idx
  
// })
//  console.log("수정findPost",findPost);
  // 이미지 업로드 및 미리보기
  // const handleImageUpload = (event) => {
  //   const files = Array.from(event.target.files);
  //   const imageUrls = files.map((file) => URL.createObjectURL(file));
  //   setImages(imageUrls);
  // };
  const handleImageUpload = (event) => {
    const fileList = event.target.files;
    if (fileList !== null) {
      setImages(fileList);
      console.log("fileList",fileList);
    }
  };
  // 게시물 수정
  const handleSubmit = (event,index) => {
  event.preventDefault();

  // 게시물 수정 로직 작성
  // if (title.trim() !== '' && content.trim() !== '' && images !== null) {
    const updatedPost = {
      comm_idx:'',
      comm_title:'',
      comm_content:'',
      comm_file:[],
      comm_dt:'',
      user_id:''
    };
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    const data={
        comm_title: title,
        comm_content: content,
        user_id: "1111" ,
        comm_idx:comm_idx 
    }
    const formData = new FormData()
    console.log("update",event.target.imageInput);
    let files = event.target.imageInput.files
    console.log(files);
    formData.append("file",files[0])
    formData.append("data",new Blob([JSON.stringify(data)],{type:'application/json'}))
    //  console.log("updatepormData: ",formData);
    axios.post(`http://172.30.1.39:8089/road/postupdate`,formData, config)
  
      .then((res)=>{
        alert('수정완료')
        console.log("결과",res.data);
   
        const newPosts = [...posts,updatedPost]
        console.log("newPost",newPosts);
     for(let i = 0; i<newPosts.length; i++){
      console.log("post[i]",posts[i]);
        if(posts[i] === findPost){
          posts.splice(i,1)
        console.log(post[i]);  
          setPosts([...posts,updatedPost])
        }
      }
         setPosts(res.data);
         setMyposts(res.data)
        })
      .catch(error=>console.log("error",error))
       for (let key of formData.keys()) {
          console.log(key);
        }
        // FormData의 value 확인
        for (let value of formData.values()) {
          console.log(value);
        }
        //  post.splice(0,1)
        //  onDeletePost(findPost.id)
        //  setPosts(newPosts)
        // onDeletePost(postId)
       
        navigate(`/mypost`);
    // }  
  };

  return (
    <form encType='multipart/form-data' onSubmit={(e)=>{handleSubmit(e)}}>
      <TextField style={{width:'1000px'}}
          id="outlined-multiline-flexible"
          label="제목"
          multiline
          maxRows={4}
          defaultValue={findPost.comm_title}
          onChange={(e) => setTitle(e.target.value)}
          name='title'
        />
        <br/><br/><br/>
     <TextField style={{width:'1000px'}}
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={4}
          defaultValue={findPost.comm_content}
          onChange={(e) => setContent(e.target.value)}
          name="content"
        />
  
      
      <br/><br/>
      <input type="file" multiple onChange={handleImageUpload} 
       name='imageInput'accept="image/*" />
       <Stack sx={{width:'100%'}} spacing={2}>
        <Alert severity="warning">수정하고 싶은 사진을 다시 넣어주세요</Alert>
       </Stack>
      {/* {findPost.comm_file.map(() => ( */}
        {/* <img key={findPost.comm_idx} src={"data:/image/;base64,"+post.comm_file} alt="게시물 사진" 
        style={{maxWidth : '20%'}}/> */}
      {/* ) */}
      {/* )} */}

      <br /><br /><br /><br />
      
      <button type="submit">수정완료</button>
      
    </form>
  );
}

export default Update;
