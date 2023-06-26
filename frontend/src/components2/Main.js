import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ImageSlider from "react-simple-image-slider";

const Main = ({posts,like,num,onLike}) => {
  
  const imgList =[
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpjgE_Mg0bMdb4seJPrMGpSxkKWQOuTf77kA&usqp=CAU",
      "https://cdn.travie.com/news/photo/first/201705/img_19694_5.jpg"  ]    
  const images=()=>{
   let imgUrl = imgList.map((item)=>{
    console.log(item);
  })
}
  
  
    
 
    
    // for(let i  = 0; i=8; i++){
    //     posts.sort((a,b)=>a-b)
    //     console.log("main",posts);
    // }
  return (
    <div >
    
    <br/><br/>
    <ImageSlider images={imgList} width={1200} objectFit={'container'} height={500}
        showBullets={true} showNavs={true} style={{
          maxWidth: '100%' }}/>
   
<div>
<Box sx={{flexGrow:1}}>
    <Grid container spacing={2}>
    {posts.map((post)=>(
      <Grid item xs={6}>
      <div key={post.title} >
      <Link to={`/post/detail/${post.id}`}>
          {post.community.comm_file && post.community.comm_file.length >0 && 
              <img src={post.community.comm_file[0]} alt="게시물 이미지" style={{ 
                maxWidth: '100%',width:'400px',height:'300px'}} />
            }</Link><br/>
        
        <span style={{float:'left' ,marginLeft:'60px'}}>{like ? 
            <Button onClick={onLike} 
            style={{border:"none", backgroundColor:'white',width:'70px' }}>💗<span>{num+1}</span></Button> 
          : <Button onClick={onLike} 
            style={{border:"none", backgroundColor:'white',width:'70px'}}>🤍</Button>}</span>
            <br/><br/>
        <h3 style={{whiteSpace:'pre'}}>{post.community.comm_title}</h3> 
     
      </div>
      </Grid>
      
    )) }
    </Grid></Box>
   
    </div>
  </div>
  )
}

export default Main