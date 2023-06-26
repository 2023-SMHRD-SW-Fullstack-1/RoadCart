import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import axios from 'axios'


function PostForm({onAddPost,setPosts,posts,post}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState();
  const navigate = useNavigate();
  const [alignment, setAlignment] = useState()

 
  //이미지 업로드 및 미리보기
  const handleImageUpload = (event) => {
    const fileList = event.target.files;
    if (fileList !== null) {
      setImages(fileList);
    }
   
  };
  // 게시물 작성
  const handleSubmit = (event) => {
   event.preventDefault();
    console.log("작성");
    // 게시물 작성 로직 작성
      if (true) {
      const newPost = {
        comm_idx:'',
        comm_title:'',
        comm_content:'',
        comm_file:[],
        comm_dt:'',
        user_id:''
      };
       const config = {
        headers: { 'Content-Type': 'multipart/form-data'}
      }
      const data={
          comm_title: title,
          comm_content: content,
          user_id: "1111" 
      }
      const formData = new FormData()
      let files = event.target.imageInput.files
      console.log(files);

      formData.append("file",files[0])
    
      formData.append("data",new Blob([JSON.stringify(data)],{type:'application/json'}))
    
        axios.post(`spring/road/postform`,formData, config)
        .then((res)=>{
          // console.log('결과postform',res.data);
           setPosts(res.data);
           console.log("후 posts",posts);
           onAddPost(newPost);
           navigate('/mypost');
          })
        .catch(error=>console.log("error",error))
  };
  }

  return (
    <div className='postFormContainer' style={{marginLeft:'250px',textAlign:'center',display:"flex", flexDirection:"row", alignItems: "center", }}>
      <form encType='multipart/form-data' onSubmit={(e)=>{handleSubmit(e)}}>
       <TextField style={{width:'70vw'}}
          id="outlined-multiline-flexible"
          label="제목"
          multiline
          maxRows={4}
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
       
      <br/><br/><br/>
      <TextField style={{width:'70vw'}}
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={4}
          value={content}
          name='content'
          onChange={(e) => setContent(e.target.value)}
        />
     
      <br/><br/>
        <input type="file" multiple onChange={handleImageUpload} accept="image/*" name="imageInput" />
      <Stack sx={{width:'100%'}} spacing={2}>
        <Alert severity="warning">정방형 사진만 넣어주세요.</Alert>
       </Stack>
      {images > 0 && 
       post.comm_file.map((post) =>(
        <img 
        key={post.comm_idx}src={post.community.comm_idx} alt="미리보기 이미지" name="images" style={{ maxWidth: '20%' }} 
        />
       ))
        } 
      <br /><br /><br /><br />
      <button type="submit">작성하기</button>
      </form>
    </div>
  );
}

export default PostForm
