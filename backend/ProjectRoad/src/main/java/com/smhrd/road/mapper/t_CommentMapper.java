package com.smhrd.road.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.road.domain.t_comment;
import com.smhrd.road.domain.t_community;

@Mapper
public interface t_CommentMapper {

	// 댓글 등록
	public void commentRegister(t_comment comment);

	// 댓글 수정
	public void commentUpdate(t_comment comment);

	// 댓글 삭제
	@Delete("delete from t_comment where cmt_idx = #{cmt_idx}")
	public void commentDelete(int cmt_idx);
	
	// cmt_idx 조회
	@Select("select count(*) from t_commnet where cmt_idx=#{cmt_idx}")
	public int selectIdx(int cmt_idx);
	
	// getComm
	public t_community getComm(int comm_idx);
	
	// comments 조회
	public List<t_comment> commentList(int comm_idx);
}
