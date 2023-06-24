package com.smhrd.road.controller;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.road.domain.t_comment;
import com.smhrd.road.service.t_CommentService;

@RestController
@CrossOrigin("http://localhost:3000")
public class t_CommentController {

	@Autowired
	private t_CommentService commentService;

	// 댓글 등록
	@PostMapping("/comment")
	public @ResponseBody void commentRegister(@RequestBody Map<String, Object> map) {
		System.out.println(1111);
		System.out.println("map 값 : "+map);
		String cmt_content = map.get("cmt_content").toString();
		String user_id = map.get("user_id").toString();
		int comm_idx = Integer.parseInt(map.get("comm_idx").toString());
		
		t_comment comment = new t_comment(cmt_content,user_id,comm_idx);
		commentService.commentRegister(comment);
	}

	// 댓글 수정
	@PostMapping("/comment/update")
	public @ResponseBody JSONObject commentUpdate(@RequestBody Map<String, Object> map) {
		int cmt_idx = Integer.parseInt(map.get("cmt_idx").toString());
		String cmt_content = map.get("cmt_content").toString();
		String user_id = map.get("user_id").toString();
		int comm_idx = Integer.parseInt(map.get("comm_idx").toString());
		
		int result = commentService.selectIdx(cmt_idx);
		
		
		JSONObject obj = new JSONObject();
		if(result==1) {
			t_comment comment = new t_comment();
			System.out.println("댓글수정 성공");
			commentService.commentUpdate(comment);
			obj.put("comment", comment);
			return obj;
		} else {
			System.out.println("댓글수정 실패");
			return obj;
		}
		
		
	}

	// 댓글 삭제
	@PostMapping("/comment/delete/{cmt_idx}")
	public void commentDelete(@PathVariable("cmt_idx") int cmt_idx) {
		commentService.commentDelete(cmt_idx);
	}
}
