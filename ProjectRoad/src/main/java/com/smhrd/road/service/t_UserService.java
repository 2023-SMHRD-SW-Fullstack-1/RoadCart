package com.smhrd.road.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.smhrd.road.domain.t_user;
import com.smhrd.road.mapper.t_UserMapper;

@Service
public class t_UserService {
	// 회원가입 시 저장시간을 넣어줄 DateTime형
	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:sss");
	Date time = new Date();
	String localTime = format.format(time);

	@Autowired
	private t_UserMapper userMapper;

	// 회원가입
	public void join(t_user user) {
		userMapper.join(user);
	}

	// 가입여부조회
	public int userSelect(String user_id, String user_pw) {
		return userMapper.userSelect(user_id, user_pw);
	}

	// 아이디 중복체크
	public int id_Check(String user_id) {
		return userMapper.id_Check(user_id);
	}

	// 로그인
	public t_user login(String user_id, String user_pw) {
		return userMapper.login(user_id, user_pw);
	}

	// SNS조회
	public int snsSelect(String user_sns, String user_token) {
		return userMapper.snsSelect(user_sns, user_token);
	}
	// SNS로그인
	public t_user snsLogin(String user_sns, String user_token) {
		return userMapper.snsLogin(user_sns, user_token);
	}
	// SNS회원가입
	public void snsJoin(t_user user) {
		userMapper.snsJoin(user);
	}

	// 회원정보수정
	public void update(t_user user) {
		userMapper.update(user);
	}


	// 닉네임 중복체크
	public int nickCheck(String user_nick) {
		return userMapper.nickCheck(user_nick);
	}
	
	// 회원탈퇴(관리자용)
	public int delete_admin(String user_id) {
		return userMapper.delete_admin(user_id);
	}
	
	// 회원탈퇴
	public void delete_success(String user_id) {
		userMapper.delete_success(user_id);
	}


}
