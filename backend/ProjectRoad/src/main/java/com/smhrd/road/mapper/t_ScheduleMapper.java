package com.smhrd.road.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.road.domain.t_poi;
import com.smhrd.road.domain.t_schedule;

@Mapper
public interface t_ScheduleMapper {
	
	//일정 리스트
	public List<t_schedule> scheduleList(String user_id);
	
	// 해당날짜 일정조회
	public List<t_poi> scheduleDetail(int idx);
	
	//일정등록
	public int scheduleRegister(t_schedule sch);
	
	//일정조회
	@Select("select count(*) from t_schedule where sche_idx=#{sche_idx}")
	public int scheduleSelect(t_schedule sch);
	
	//일정수정
	public void scheduleUpdate(t_schedule sch);
	
	//일정삭제
	@Delete("delete from t_schedule where sche_idx = #{sche_idx}")
	public void deleteSchedule(t_schedule sch);
	
	//user id 조회
	@Select("select count(*) from t_schedule where user_id=#{user_id}")
	public int userId_select(String user_id);
	
	// sche_idx 조회
	@Select("select count(*) from t_schedule where sche_idx=#{sche_idx}")
	public int sch_idxSelect(int sche_idx);
	
	// idx 반환
	@Select("select sche_idx from t_schedule where sche_title=#{sche_title} and sche_content=#{sche_content} and sche_start_dt=#{sche_start_dt} and sche_end_dt=#{sche_end_dt}")
	public int schIdx(t_schedule sch);
	
	
	
}
