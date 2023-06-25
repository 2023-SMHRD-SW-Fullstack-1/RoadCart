package com.smhrd.road.service;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.road.domain.t_comment;
import com.smhrd.road.domain.t_community;
import com.smhrd.road.mapper.t_CommentMapper;
import com.smhrd.road.mapper.t_UserMapper;

@Service
public class t_CommentService {

	@Autowired
	private t_CommentMapper commentMapper;
	
	@Autowired
	private t_UserMapper userMapper;

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
	
	// comments 조회
	public JSONObject commentList(int comm_idx) {
		List<t_comment> list = commentMapper.commentList(comm_idx);
		JSONObject obj = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		JSONArray jsonArray2 = new JSONArray();
		
		for (t_comment comment : list) {
			jsonArray.add(comment);
			String user_nick = userMapper.selectNick(comment.getUser_id());
			jsonArray2.add(user_nick);
		}
		obj.put("commentList", jsonArray);
		obj.put("user_nick", jsonArray2);
		return obj;
	}

}
