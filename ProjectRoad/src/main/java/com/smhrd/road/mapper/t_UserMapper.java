package com.smhrd.road.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.smhrd.road.domain.t_user;

@Mapper
public interface t_UserMapper {

	public List<t_user> userList();

	// 회원가입
	public void join(t_user user);

	// 가입여부조회
	@Select("select count(*) from t_user where user_id=#{user_id} and user_pw=#{user_pw} and user_delete='n'")
	public int userSelect(String user_id, String user_pw);

	// 아이디중복체크
	@Select("select count(*) from t_user where user_id=#{user_id} and user_delete='n'")
	public int id_Check(String user_id);

	// 로그인
	@Select("select * from t_user where user_id=#{user_id} and user_pw=#{user_pw} and user_delete='n'")
	public t_user login(String user_id, String user_pw);

	// SNS조회
	@Select("select count(*) from t_user where user_sns=#{user_sns} and user_token=#{user_token} and user_delete='n'")
	public int snsSelect(String user_sns, String user_token);

	// SNS로그인
	@Select("select * from t_user where user_sns=#{user_sns} and user_token=#{user_token} and user_delete='n'")
	public t_user snsLogin(String user_sns, String user_token);
	
	// SNS회원가입
	public void snsJoin(t_user user);

	// 회원정보수정
	public void update(t_user user);

	// 회원삭제(관리자)
	public int delete_admin(String user_id);

	// 회원탈퇴(유저)
	public void delete_success(String user_id);

	// 닉네임 중복체크
	@Select("select count(*) from t_user where user_nick=#{user_nick} and user_delete='n'")
	public int nickCheck(String user_nick);

	

}
