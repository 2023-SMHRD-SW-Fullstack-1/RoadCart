package com.smhrd.road.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.smhrd.road.domain.t_likes;

@Mapper
public interface t_LikesMapper {
	
	//좋아요 등록(최초)
	@Insert("insert into t_likes (comm_idx, user_id) values(#{comm_idx},#{user_id})")
	public void addLikes(int comm_idx, String user_id);
	
	//좋아용 등록(n->y)
	@Update("update t_likes set like_yn='y' where comm_idx=#{comm_idx} and user_id=#{user_id}")
	public void likesUp(int comm_idx, String user_id);
	
	//좋아요 취소
	@Update("update t_likes set like_yn='n' where comm_idx=#{comm_idx} and user_id=#{user_id}")
	public void likesDown(int comm_idx, String user_id);
	
	//좋아요 개수
	@Select("select count(*) from t_likes where comm_idx=#{comm_idx} and like_yn='y'")
	public int likeSum(int comm_idx);
	
	//isLikes
	@Select("select count(*) from t_likes where user_id=#{user_id} and comm_idx=#{comm_idx} and like_yn='y'")
	public int isLikes(String user_id, int comm_idx);
	
	//isExist
	@Select("select count(*) from t_likes where user_id=#{user_id} and comm_idx=#{comm_idx}")
	public int isExist(String user_id, int comm_idx);
	
}
