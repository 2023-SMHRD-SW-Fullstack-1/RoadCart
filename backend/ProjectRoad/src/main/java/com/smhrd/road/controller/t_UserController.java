package com.smhrd.road.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.road.domain.t_user;
import com.smhrd.road.mapper.t_UserMapper;
import com.smhrd.road.service.t_UserService;

import lombok.RequiredArgsConstructor;

@Controller
@CrossOrigin("http://localhost:3000")
//@CrossOrigin("http://172.30.1.28:3000")
public class t_UserController {

	@Autowired
	private t_UserService userService;

	@Autowired
	private t_UserMapper userMapper;

	@Autowired
	private HttpSession session;

	// 회원가입
	@PostMapping(value = "/join")
	public @ResponseBody boolean join(@RequestBody Map<String, Object> map) {
		System.out.println(map);
		String user_id = map.get("user_id").toString();
		String user_pw = map.get("user_pw").toString();
		String user_nick = map.get("user_nick").toString();

		t_user user = new t_user(user_id, user_pw, user_nick);
		int result = userService.id_Check(user_id);
		if (result == 1) {// 중복
			return false;
		} else { // 중복X
			userService.join(user);
			return true;
		}
	}

	// 로그인
	@PostMapping(value = "/login")
	public @ResponseBody JSONObject login(@RequestBody Map<String, Object> map) {
		System.out.println(map);
		String user_id = map.get("user_id").toString();
		String user_pw = map.get("user_pw").toString();
		System.out.println(user_id);
		System.out.println(user_pw);
		int result = userService.userSelect(user_id, user_pw);
		JSONObject obj = new JSONObject();
		if (result == 1) { // 로그인
			t_user user = userService.login(user_id, user_pw);
			obj.put("loginUser", user);
			System.out.println(obj);
			return obj;
		} else { // 가입시키기
			return obj;
		}
	}

	// SNS로그인
	@PostMapping(value = "/snslogin")
	public @ResponseBody JSONObject snsLogin(@RequestBody Map<String, Object> map) {
		System.out.println(map);
		String user_sns = map.get("user_sns").toString();
		String user_token = map.get("user_token").toString();
		int result = userService.snsSelect(user_sns, user_token);
		System.out.println("result 값:"+result);
		JSONObject obj = new JSONObject();
		if (result == 1) { // 로그인
			t_user user = userService.snsLogin(user_sns, user_token);
			obj.put("loginUser", user);
			return obj;
		} else { // 가입시키기
			return obj;
			
		}
	}

	// SNS회원가입
	@PostMapping(value = "/snsjoin")
	public @ResponseBody JSONObject snsJoin(@RequestBody Map<String, Object> map) {
		System.out.println("가입하기");
		System.out.println(map);
		String user_pw = UUID.randomUUID().toString().substring(0,10);
		String user_nick = map.get("user_nick").toString();
		String user_sns = map.get("user_sns").toString();
		String user_token = map.get("user_token").toString();
		String user_id = (UUID.randomUUID().toString()).substring(0,7) + user_nick + "@" + user_sns + ".com";
		t_user user = new t_user(user_id, user_pw, user_nick, user_sns, user_token);
		
		userService.snsJoin(user);
		JSONObject obj = new JSONObject();
		obj.put("loginUser", user);
		
		return obj;
		


	}

	// 회원정보수정(기존)
	@PostMapping(value = "/update")
	public @ResponseBody JSONObject update(@RequestBody Map<String, Object> map) {
		System.out.println(map);
		String user_id = map.get("user_id").toString();
		//String user_pw = map.get("user_pw").toString();
		String user_nick = map.get("user_nick").toString();
		t_user user = new t_user(user_id,user_nick);
		userService.update(user);
		JSONObject obj = new JSONObject();
		obj.put("loginUser", user);
		
		return obj;

	}

	// 회원삭제(관리자)
	@RequestMapping(value = "/delete/{user_id}")
	public String delete_admin(@PathVariable("user_id") String user_id) {

		int cnt = userMapper.delete_admin(user_id);

		return "redirect:/select";
	}

	// 회원탈퇴(유저)
	@PostMapping("/delete")
	public @ResponseBody void delete_success(@RequestBody Map<String, Object> map) {
		String user_id = map.get("user_id").toString();
		userService.delete_success(user_id);
		
	}

	// 닉네임 중복체크
	@PostMapping("/nickcheck")
	public @ResponseBody boolean nickCheck(@RequestBody Map<String, Object> map) {

		String user_nick = map.get("user_nick").toString();
		System.out.println(user_nick);

		int result = userService.nickCheck(user_nick);
		if (result == 1) { // 중복
			return false;
		} else { // 중복X
			userService.nickCheck(user_nick);
			return true;
		}
	}

}
