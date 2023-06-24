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

@Service
public class t_CommunityService {

	@Autowired
	private t_CommunityMapper communityMapper;

	@Autowired
	private ResourceLoader resourceLoader;

	// 전체 게시글 조회
	public JSONArray communityList(t_community comm) {
		List<t_community> list = communityMapper.communityList(comm);

		JSONArray jsonArray = new JSONArray();
		ImgConverter<File, String> converter = new ImageToBase64();

		for (t_community community : list) {

			File uploadDir = new File("c:/uploadImage");
			File uploadedFile = new File(uploadDir, community.getComm_file());
			//System.out.println("uploadedFile 값 : " + uploadedFile);
			String filePath = uploadedFile.getAbsolutePath();

			//System.out.println("filePath : " + filePath);
			Resource resource = new FileSystemResource(uploadedFile); // 파일의 메타데이터
			//System.out.println(resource);
			String fileStringValue = null;
			try {
				fileStringValue = converter.convert(resource.getFile());
			} catch (IOException e) {
				e.printStackTrace();
			} catch (NullPointerException e) {
				e.printStackTrace();
			}

			//System.out.println(fileStringValue);
			community.setComm_file(fileStringValue);
			JSONObject obj = new JSONObject();
			obj.put("community", community);

			jsonArray.add(obj);
		}

		return jsonArray;
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
			obj.put("community", community);

			jsonArray.add(obj);
		}

		return jsonArray;
	}

	// 게시글 등록
	public int commRegister(t_community tcomm) {
		return communityMapper.commRegister(tcomm);
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
