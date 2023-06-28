package com.smhrd.road.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.smhrd.road.domain.t_community;

@Mapper
public interface t_CommunityMapper {

	// 전체 게시글 조회
	public List<t_community> communityList();
	
	// 나의 게시글 조회
	public List<t_community> myCommunityList(String user_id);
	
	// comm_idx조회
	@Select ("select count(*) from t_community where comm_idx=#{comm_idx}")
	public int commSelect(t_community comm);

	// 게시글 등록(sche_idx X)
	public int commRegister(t_community tcomm);
	
	// 게시글 등록(sche_idx O)
	public int commRegister2(t_community tcomm);

	// 게시글 수정
	public void commUpdate(t_community tcomm);

	// 게시글 삭제
	public int commDelete(int comm_idx);
	
	// 게시글 열람
	@Select("select * from t_community where comm_idx=#{comm_idx}")
	public t_community content(int comm_idx);

	// comm_idx조회
	@Select ("select count(*) from t_community where comm_idx=#{comm_idx}")
	public int idxCommSelect(int comm_idx);
	
	// 좋아요 갱신
	@Update("update t_community set comm_likes=#{likes_sum} where comm_idx=#{comm_idx}")
	public void updateLikes(int likes_sum, int comm_idx);

	// getComm
	public t_community getComm(int comm_idx);
}
