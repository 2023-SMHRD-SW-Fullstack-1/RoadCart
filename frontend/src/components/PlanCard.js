import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MyplanModal from './MyplanModal';
import { useState } from 'react';
import Button from '@mui/material/Button';



export default function BasicCard({item}) {
    
    const [myplanModalOpen, setMyplanModalOpen] = useState(false);
    const openModal = () => {
        setMyplanModalOpen(true);
      };
      const closeModal = () => {
        setMyplanModalOpen(false);
      };
  return (
        <React.Fragment>
    <Card sx={{ minWidth: 275 }}>
      <MyplanModal open={myplanModalOpen} close={closeModal} item={item} header="제목 : ">
      </MyplanModal>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="div">
          {item.sche_title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {item.sche_start_dt} ~ {item.sche_end_dt}
        </Typography>
        <Typography variant="body2">
          {item.sche_content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{openModal()}}>자세히 보기</Button>
      </CardActions>
    </Card>
    </React.Fragment>
  );
}