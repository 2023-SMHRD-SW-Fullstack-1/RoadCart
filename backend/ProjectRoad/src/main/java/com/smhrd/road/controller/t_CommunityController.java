package com.smhrd.road.controller;

import org.springframework.http.MediaType;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.smhrd.road.converter.ImageToBase64;
import com.smhrd.road.converter.ImgConverter;
import com.smhrd.road.domain.t_community;
import com.smhrd.road.domain.t_user;
import com.smhrd.road.service.t_CommunityService;

@Controller
@CrossOrigin("http://localhost:3000")
public class t_CommunityController {

	@Autowired
	private t_CommunityService communityService;

	//전체 게시글 조회
	@PostMapping(value="/post")
	public @ResponseBody JSONObject communityList(@RequestBody String user_id) {
		System.out.println(user_id);
		JSONObject obj = communityService.communityList(user_id);
		
		return obj;
	}
	
	
	//나의 게시글 조회
	@PostMapping(value="/mypost")
	public @ResponseBody JSONArray myCommunityList(t_community comm) {
		JSONArray array = communityService.myCommunityList(comm);
		return array;
		
	}

	// 게시글 등록
	@PostMapping(value="/postform",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public @ResponseBody void commRegister(
			@RequestPart("data") t_community comm,
	        @RequestPart("file") MultipartFile file) {

	    if (file != null) {
	        
	        String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
	        String uploadPath = "c:\\uploadImage";
	        try {
	            // 파일 저장
	            File destFile = new File(uploadPath, newFileName);
	            System.out.println("1234567890");
	            file.transferTo(destFile);

	            // 저장된 파일 경로 설정
	            comm.setComm_file("/" + newFileName);
	            System.out.println(comm.getComm_file());
	        } catch (IllegalStateException e) {
	            e.printStackTrace();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
	    try {
	    	comm.getSche_idx();
	    	communityService.commRegister2(comm);
	    } catch(NullPointerException error) {
	    	communityService.commRegister(comm);
	    }
	    
	    
	}
	
	// 게시글 수정
	@PostMapping(value="/postupdate",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public @ResponseBody void commUpdate(
			@RequestPart("comm") t_community comm,
			@RequestPart(value = "img_file") MultipartFile file) {
	    //System.out.println(comm.getComm_idx()+","+comm.getComm_title() + "," + comm.getComm_content() + "," + comm.getUser_id());
	    
	    if (file != null && !file.isEmpty()) {
	        //System.out.println(file.getOriginalFilename());
	       // System.out.println(UUID.randomUUID().toString());

	        String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
	       // System.out.println("FileName: "+newFileName);
	        try {
	            file.transferTo(new File(newFileName));
	            comm.setComm_file(newFileName);
	        } catch (IllegalStateException | IOException e) {
	            e.printStackTrace();
	        }
	    }
	    
	    int result = communityService.commSelect(comm);
	    //System.out.println("result 값 : "+result);
	    
	    if(result==1) {//조회성공
	    	communityService.commUpdate(comm);
	    }else {
	    	//System.out.println("select 조회실패");
	    }

	   
	 
	}

	// 게시글삭제
	@PostMapping(value="/postdelete/{comm_idx}")
	public @ResponseBody void commDelete(@PathVariable("comm_idx") int comm_idx) {
		//System.out.println("commIdx 값 : "+comm_idx);
		
		int result = communityService.idxCommSelect(comm_idx);
		//System.out.println(result);
		
		if(result==1) {
			//System.out.println("삭제성공");
			communityService.commDelete(comm_idx);
		}else {
			//System.out.println("삭제실패");
		}
	

	}
	
	
	
	// 게시글 불러오기
	@PostMapping("/postdetail/{comm_idx}")
	public @ResponseBody t_community getComm(@PathVariable("comm_idx") int comm_idx) {
		return communityService.getComm(comm_idx);
	}
	
	// 게시글 열람
//	@PostMapping("/postdetail/{comm_idx}")
//	public ModelAndView content(@PathVariable("comm_idx") int comm_idx) {
//	  t_community comm = communityService.content(comm_idx);
//	  File file = new File("c:\\uploadImage\\"+comm.getComm_file());
//
//	  ImgConverter<File, String> converter = new ImageToBase64();
//
//	  try {
//	    String fileStringValue = converter.convert(file);
//	    //System.out.println(fileStringValue);
//	  } catch (IOException e) {
//	    e.printStackTrace();
//	  }
//
//	  ModelAndView modelAndView = new ModelAndView("postdetail/postdetailpage"); // Set the correct template file path
//	  modelAndView.addObject("postDetail", comm);
//	  return modelAndView;
//	}
	

}
