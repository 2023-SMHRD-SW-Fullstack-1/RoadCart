package com.smhrd.road.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.smhrd.road.converter.ImageToBase64;
import com.smhrd.road.converter.ImgConverter;
import com.smhrd.road.domain.t_community;
import com.smhrd.road.mapper.t_CommunityMapper;
import com.smhrd.road.mapper.t_LikesMapper;

@Service
public class t_CommunityService {

	@Autowired
	private t_CommunityMapper communityMapper;
	
	@Autowired
	private t_LikesMapper likesMapper;

	@Autowired
	private ResourceLoader resourceLoader;

	// 전체 게시글 조회
	public JSONObject communityList(String user_id) {
		List<t_community> list = communityMapper.communityList();

		JSONObject obj = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		JSONArray jsonArray2 = new JSONArray();
		ImgConverter<File, String> converter = new ImageToBase64();

		for (t_community community : list) {

			File uploadDir = new File("c:/uploadImage");
			File uploadedFile = new File(uploadDir, community.getComm_file());
			String filePath = uploadedFile.getAbsolutePath();

			Resource resource = new FileSystemResource(uploadedFile); // 파일의 메타데이터
			String fileStringValue = null;
			try {
				fileStringValue = converter.convert(resource.getFile());
			} catch (IOException e) {
				e.printStackTrace();
			} catch (NullPointerException e) {
				e.printStackTrace();
			}

			community.setComm_file(fileStringValue);
			community.setComm_likes(likesMapper.likeSum(community.getComm_idx()));
			jsonArray.add(community);
			boolean isLike = likesMapper.isLikes(user_id, community.getComm_idx()) > 0 ? true : false;
			jsonArray2.add(isLike);
			
		}
		obj.put("community", jsonArray);
		obj.put("isLike", jsonArray2);

		return obj;
	}

	// my게시글 조회
	public JSONArray myCommunityList(t_community comm) {
		List<t_community> list = communityMapper.myCommunityList(comm);

		JSONArray jsonArray = new JSONArray();
		ImgConverter<File, String> converter = new ImageToBase64();

		for (t_community community : list) {

			File uploadDir = new File("c:/uploadImage");
			File uploadedFile = new File(uploadDir, community.getComm_file());
//			System.out.println("uploadedFile 값 : " + uploadedFile);
			String filePath = uploadedFile.getAbsolutePath();

//			System.out.println("filePath : " + filePath);
			Resource resource = new FileSystemResource(uploadedFile); // 파일의 메타데이터
//			System.out.println(resource);
			String fileStringValue = null;
			try {
				fileStringValue = converter.convert(resource.getFile());
			} catch (IOException e) {
				e.printStackTrace();
			} catch (NullPointerException e) {
				e.printStackTrace();
			}

//			System.out.println(fileStringValue);
			community.setComm_file(fileStringValue);
			JSONObject obj = new JSONObject();

			jsonArray.add(community);
		}

		return jsonArray;
	}
	
	// getComm
	public t_community getComm(int comm_idx) {
		return communityMapper.getComm(comm_idx);
	}
	
	// 좋아요 갱신
	public void updateLikes(int likes_sum, int comm_idx) {
		communityMapper.updateLikes(likes_sum, comm_idx);
	}

	// 게시글 등록(sche_idx X)
	public int commRegister(t_community tcomm) {
		return communityMapper.commRegister(tcomm);
	}
	
	// 게시글 등록(sche_idx O)
	public int commRegister2(t_community tcomm) {
		return communityMapper.commRegister2(tcomm);
	}

	// VO조회
	public int commSelect(t_community comm) {
		return communityMapper.commSelect(comm);
	}

	// 게시글 수정
	public void commUpdate(t_community tcomm) {
		communityMapper.commUpdate(tcomm);
	}

	// 게시글삭제
	public int commDelete(int comm_idx) {
		return communityMapper.commDelete(comm_idx);
	}

	// comm_idx 조회
	public int idxCommSelect(int comm_idx) {
		return communityMapper.idxCommSelect(comm_idx);
	}
	
	//게시글 열람
	public t_community content(int comm_idx) {
		return communityMapper.content(comm_idx);
	}

}
