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
	
	//좋아요 등록
	public void likeUp(t_likes tlike) {
		likesMapper.likeUp(tlike);
	}
	
	//좋아요 취소
	public void likeDelete(t_likes tlike) {
		likesMapper.likeDelete(tlike);
	}
	
	//좋아요 개수
	public String likeSum(t_likes tlike) {
		return likesMapper.likeSum(tlike) ;
	}
	
	// isLikes
	public boolean isLikes(String user_id, int comm_idx){
		return likesMapper.isLikes(user_id, comm_idx);
	}
}
