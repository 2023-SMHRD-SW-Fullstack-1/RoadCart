import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PlanCard from './PlanCard'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const Myplan = () => {
    const [scheduleList, setScheduleList] = useState([]);
    const sessionStorage = window.sessionStorage
    const user_id = sessionStorage.getItem("user_id");
    console.log(user_id);
    useEffect(()=>{
        axios.post('/spring/road/schedulelist',user_id,{headers: { "Content-Type": "text/plain" }})
        .then((res)=>{setScheduleList(res.data);})
    },[]);

    
  return (
    <div style={{paddingLeft:"15%", paddingRight:"15%", backgroundColor:"whitesmoke", height:"100vh"}}>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {scheduleList !== undefined && scheduleList.map((item, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item><PlanCard item={item}></PlanCard></Item>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
    
  )
}

export default Myplan