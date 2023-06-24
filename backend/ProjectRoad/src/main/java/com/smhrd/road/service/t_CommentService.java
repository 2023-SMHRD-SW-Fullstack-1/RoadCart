package com.smhrd.road.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.road.domain.t_comment;
import com.smhrd.road.domain.t_community;
import com.smhrd.road.mapper.t_CommentMapper;

@Service
public class t_CommentService {

	@Autowired
	private t_CommentMapper commentMapper;

	// 댓글 등록
	public void commentRegister(t_comment comment) {
		commentMapper.commentRegister(comment);
	}

	// 댓글 수정
	public void commentUpdate(t_comment comment) {
		commentMapper.commentUpdate(comment);
	}

	// 댓글 삭제
	public void commentDelete(int cmt_idx) {
		commentMapper.commentDelete(cmt_idx);
	}
	
	// idx 조회
	public int selectIdx(int cmt_idx) {
		return commentMapper.selectIdx(cmt_idx);
	}

}
