import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";

import "../../src/App.css";

const PostList = ({ posts, setPosts, likeCount, likedPosts, setPost }) => {
  const id = "1111";
  const navigate = useNavigate();
  const [filteredPosts, setFilteredPosts] = useState([]); //검색된 게시물
  const [userInput, setUserInput] = useState(""); //사용자가 검색창에 입력한 값

  const config = {
    headers: {
      "Content-Type": "multipart/form-data" / "application/json;charset=UTF-8",
    },
  };

  //백엔드에서 전체 게시물 불러오기
  useEffect(() => {
    let user_id = id;

    axios
      .post(`/spring/road/post`, "1111", {
        headers: { "Content-Type": "text/plain" },
      })
      .then((res) => {
        console.log("postList",res.data);
        let result = res.data.community;
        res.data.isLike.map((item, index) => (result[index].isLike = item));
        setPosts(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  //검색 기능 구현
  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };
  const handleSearch = () => {
    const filteredPosts = posts.filter((post) => {
      // 제목 또는 내용에 검색어가 포함된 게시물 필터링
      return (
        post.comm_title.includes(userInput) ||
        post.comm_content.includes(userInput)
      );
    });
    // 검색 결과 업데이트
    setFilteredPosts(filteredPosts);
    console.log("filter",filteredPosts);
    if(filteredPosts==0){
      alert('검색된 게시물이 없습니다.')
    }
  };

  //좋아요를 누르면 likeesPosts에 배열이 있는 지 확인하고 있으며 user_id제거
  const handleLike = (post, index) => {
    let user_id = id;

    if (post.isLike) {
      axios.post("/spring/road/community/removelikes", [user_id, post.comm_idx]);
      let temp = [...posts];
      temp[index].comm_likes = temp[index].comm_likes - 1;
      temp[index].isLike = false;
      console.log(temp);
      setPosts(temp);
    } else {
      axios.post("/spring/road/community/addlikes", [user_id, post.comm_idx]);
      let temp = [...posts];
      temp[index].comm_likes = temp[index].comm_likes + 1;
      temp[index].isLike = true;
      console.log(temp);
      setPosts(temp);
    }
  };

  return (
    <div >
     
      
     
<section>
      <Box sx={{ flexGrow: 1 }}>
      <section style={{margin:'90px'}}>
      <h1 style={{fontSize:'40px'}}>길스타그램</h1>
      <p>여러분의 길바구니를 자랑해주세요😊</p>
      </section>
      <section style={{margin:'110px'}}>
      {/* <div style={{ display:'flex', flexDirection:"row"}}> */}
      <Button
          onClick={() => {
            navigate("/postform");
          }}
          variant="outlined"
          style={{float:'left',marginLeft:'50px'}}
        >
          글쓰기
        </Button>
        <div style={{float:'right',marginRight:'50px'}}>       
           <input
          type="text"
          defaultValue={filteredPosts}
          onChange={getValue}
          placeholder="검색어를 입력하세요"
          style={{width:'300px',height:'30px'}}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "black",
            color: "white",
            width:'50px',
            height:'35px'
          }}
        >
          검색
        </button>
        <br />
      </div>
      {/* <div style={{}}> */}
        <br/>
        
        {/* <button onClick={handleClickMyPosts}>내 게시물 보기</button> */}
      {/* </div> */}
      </section>
        <Grid container spacing={2}>
          {filteredPosts.length > 0
            ? filteredPosts.map((filteredPosts, index) => (
                <Grid item xs={6} key={filteredPosts.comm_idx[index]}>
                  <div className="PostListDiv">
                    {/* <h4>검색된 게시물</h4> */}

                    <Link to={`/post/detail/${filteredPosts.comm_idx}`}>
                      {/* {filteredPosts.images && filteredPosts.images.length >0 && ( */}
                      <img
                        src={"data:/image/;base64," + filteredPosts.comm_file}
                        alt="게시물 이미지"
                        style={{
                          maxWidth: "100%",
                          width: "600px",
                          height: "400px",
                        }}
                      />
                      {/* )} */}
                    </Link>
                    <br />
                    <span style={{float:'left',marginLeft:'130px' }}>
                    <Button
                        onClick={() => handleLike(filteredPosts, index)}
                        style={{
                          border: "none",
                          backgroundColor: "white",
                          width: "70px",
                        }}
                      >
                        {filteredPosts.isLike ? (
                          <span>💗{filteredPosts.comm_likes}</span>
                        ) : (
                          <span>🤍{filteredPosts.comm_likes}</span>
                        )}
                      </Button>
                    </span>
                    <br />
                    <h3>{filteredPosts.comm_title}</h3>

                    <br />
                    <br />
                  </div>
                </Grid>
              ))
            : posts.map((post, index, list) => (
              <Grid item xs={6} key={post.comm_idx[index]}>
                <div  className="PostListDiv">
                  <Link to={`/post/detail/${post.comm_idx}`} state={post}>
                    {/* {post.img_file && post.img_file.length >0 && ( */}
                    <img
                      src={"data:/image/;base64," + post.comm_file}
                      alt="게시물 이미지"
                      style={{
                        maxWidth: "100%",
                        width: "600px",
                        height: "400px",
                      }}
                    />
                    {/* )} */}
                  </Link>
                  <br />

                  <span style={{float:'left',marginLeft:'130px' }}>
                    <Button
                      onClick={() => handleLike(post, index)}
                      style={{
                        border: "none",
                        backgroundColor: "white",
                        width: "70px",
                      }}
                    >
                      {post.isLike ? (
                        <span>💗{post.comm_likes}</span>
                      ) : (
                        <span>🤍{post.comm_likes}</span>
                      )}
                    </Button>
                  </span>
                  <br />
                  <h3 style={{ whiteSpace: "pre" }}>{post.comm_title}</h3>

                  <br />
                  <br />
                </div>
              </Grid>
            ))
            }
        </Grid>
      </Box>
      </section>
    </div>
  );
};

export default PostList;
