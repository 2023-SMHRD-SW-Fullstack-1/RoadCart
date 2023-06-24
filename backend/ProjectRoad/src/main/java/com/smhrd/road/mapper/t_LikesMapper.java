package com.smhrd.road.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.road.domain.t_likes;

@Mapper
public interface t_LikesMapper {
	
	//좋아요 등록
	public void likeUp(t_likes tlike);
	
	//좋아요 취소
	public void likeDelete(t_likes tlike);
	
	//좋아요 개수
	public String likeSum(t_likes tlike);
	
	//isLikes
	@Select("select count(*) from t_likes where user_id=#{user_id} and comm_idx=#{comm_idx}")
	public boolean isLikes(String user_id, int comm_idx);
}
