package com.smhrd.road.service;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.road.domain.t_poi;
import com.smhrd.road.domain.t_schedule;
import com.smhrd.road.mapper.t_ScheduleMapper;

@Service
public class t_ScheduleService {
	
	@Autowired
	private t_ScheduleMapper scheduleMapper;
	
	//일정리스트
	public List<t_schedule> scheduleList(String user_id){
		return scheduleMapper.scheduleList(user_id);
	}
	
	//해당날짜 일정조회
	public List<t_poi> scheduleDetail(int idx) {
		return scheduleMapper.scheduleDetail(idx);
	}
	
	//일정등록
	public int scheduleRegister(t_schedule sc) {
		return scheduleMapper.scheduleRegister(sc);
	}
	
	//일정조회
	@Select("select count(*) from t_schedule where sche_idx=#{sche_idx}")
	public int scheduleSelect(t_schedule sch) {
		return scheduleMapper.scheduleSelect(sch);
	}
	
	// user_id 조회
	public int userId_select(String user_id) {
		return scheduleMapper.userId_select(user_id);
	}
	
	//일정수정
	public void scheduleUpdate(t_schedule sch) {
		 scheduleMapper.scheduleUpdate(sch);
	}
	
	//일정삭제
	public void deleteSchedule(t_schedule sch) {
         scheduleMapper.deleteSchedule(sch);
    }

	// sch_idx 조회
	public int sch_idxSelect(int sche_idx) {
		return scheduleMapper.sch_idxSelect(sche_idx);
	}
	

	

	
}
