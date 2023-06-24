package com.smhrd.road.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.road.domain.t_likes;
import com.smhrd.road.service.t_LikesService;

@RestController
@CrossOrigin("http://localhost:3000")
public class t_LikesController {

	@Autowired
	private t_LikesService likesService;

	// 좋아요 등록
	@PostMapping("/community/islikes")
	public List<Boolean> isLikes(@RequestBody Map<String, Object> map) {
		System.out.println("사람있어요");
		System.out.println(map);
		List<Integer> comm_idx = (List<Integer>)map.get("comm_idx");
		String user_id = map.get("user_id").toString();
		for (int i = 0; i < comm_idx.size(); i++) {
			System.out.println(comm_idx.get(i));
		}
		
		List<Boolean> list = new ArrayList<>();
		
		for (int i = 0; i < comm_idx.size(); i++) {
			list.add(likesService.isLikes(user_id, comm_idx.get(i)));
		}
		
		return list;
	}

	// 좋아요 등록
	@PostMapping("/community/likes")
	public void likeUp(t_likes tLike) {
		likesService.likeUp(tLike);
	}

	// 좋아요 개수
	@PostMapping("community/likesum")
	public String likeSum(@RequestBody t_likes tlike) {
		return likesService.likeSum(tlike);
	}

	// 좋아요 취소
	@PostMapping("/community/likes_d")
	public void likeDelete(t_likes tlike) {
		likesService.likeDelete(tlike);
	}
}
