package com.smhrd.road.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
//회원 정보 
public class t_user {
	// 회원 아이디
	private String user_id;
	// 회원 비밀번호
	private String user_pw;
	// 회원 닉네임
	private String user_nick;
	// 회원 가입일자
	private String user_joindate;
	// 관리자 여부
	private String admin_yn;
	
	private String user_sns;
	
	private String user_token;
	
	public t_user(String user_id, String user_pw) {
		this.user_id=user_id;
		this.user_pw=user_pw;
	}
	
	public t_user(String user_id, String user_pw,String user_nick) {
		this.user_id=user_id;
		this.user_pw=user_pw;
		this.user_nick=user_nick;
	}
	
	public t_user(String user_id, String user_pw,String user_nick, String user_sns, String user_token) {
		this.user_id=user_id;
		this.user_pw=user_pw;
		this.user_nick=user_nick;
		this.user_sns=user_sns;
		this.user_token=user_token;
	}

	public t_user(String user_id, String user_pw, String user_nick, String user_sns) {
		this.user_id = user_id;
		this.user_pw = user_pw;
		this.user_nick = user_nick;
		this.user_sns = user_sns;
	}
	
	
	
}
