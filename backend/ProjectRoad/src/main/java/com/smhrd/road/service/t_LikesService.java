package com.smhrd.road.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.road.domain.t_likes;
import com.smhrd.road.mapper.t_LikesMapper;



@Service
public class t_LikesService {
	
	@Autowired
	private t_LikesMapper likesMapper;
	
	//좋아요 생성
	public void addLikes(int comm_idx, String user_id) {
		likesMapper.addLikes(comm_idx, user_id);
	}
	
	//좋아요 증가(n->y)
	public void likesUp(int comm_idx, String user_id) {
		likesMapper.likesUp(comm_idx, user_id);
	}	
	
	//좋아요 감소(y->n)
	public void likesDown(int comm_idx, String user_id) {
		likesMapper.likesDown(comm_idx, user_id);
	}
	
	//좋아요 개수
	public int likeSum(int comm_idx) {
		return likesMapper.likeSum(comm_idx) ;
	}
	
	// isLikes
	public int isLikes(String user_id, int comm_idx){
		return likesMapper.isLikes(user_id, comm_idx);
	}
	
	// isExist
	public int isExist(String user_id, int comm_idx) {
		return likesMapper.isExist(user_id, comm_idx);
	}
}
