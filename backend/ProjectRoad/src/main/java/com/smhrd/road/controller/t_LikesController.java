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
import com.smhrd.road.service.t_CommunityService;
import com.smhrd.road.service.t_LikesService;

@RestController
@CrossOrigin("http://localhost:3000")
public class t_LikesController {

	@Autowired
	private t_LikesService likesService;
	
	@Autowired
	private t_CommunityService communityService;

	// 좋아요 조회
	@PostMapping("/community/islikes")
	public List<Boolean> isLikes(@RequestBody Map<String, Object> map) {
		List<Integer> comm_idx = (List<Integer>)map.get("comm_idx");
		String user_id = map.get("user_id").toString();
		List<Boolean> list = new ArrayList<>();
		
		for (int i = 0; i < comm_idx.size(); i++) {
			boolean isExist = likesService.isLikes(user_id, comm_idx.get(i)) > 0 ? true : false;
			list.add(isExist);
		}
		
		return list;
	}

	// 좋아요 등록
	@PostMapping("/community/addlikes")
	public void likeUp(@RequestBody List<String> list) {
		String user_id = list.get(0);
		int comm_idx = Integer.parseInt(list.get(1));
		int likes_sum = likesService.likeSum(comm_idx);
		int isExist = likesService.isExist(user_id, comm_idx);
		if (isExist > 0) {
			likesService.likesUp(comm_idx, user_id);
		} else {
			likesService.addLikes(comm_idx, user_id);
		}
	}

	// 좋아요 취소
	@PostMapping("/community/removelikes")
	public void likeDelete(@RequestBody List<String> list) {
		String user_id = list.get(0);
		int comm_idx = Integer.parseInt(list.get(1));
		int likes_sum = likesService.likeSum(comm_idx);
		likesService.likesDown(comm_idx, user_id);
		communityService.updateLikes(likes_sum - 1, comm_idx);
	}
	
	// 좋아요 개수
	@PostMapping("community/likesum")
	public int likeSum(@RequestBody int comm_idx) {
		return likesService.likeSum(comm_idx);
	}

	
}
