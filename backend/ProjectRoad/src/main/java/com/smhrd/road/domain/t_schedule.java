package com.smhrd.road.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class t_schedule {
	 // 일정 순번 
    private int sche_idx;
    // 일정 제목 
    private String sche_title;
    // 일정 내용 
    private String sche_content;
    // 일정 시작일자 
    private String sche_start_dt;
    // 일정 종료일자 
    private String sche_end_dt;
    // 작성자 아이디 
    private String user_id;
    
    public t_schedule(String sche_title, String sche_content, String sche_start_dt, String sche_end_dt,String user_id) {
    	this.sche_title = sche_title;
    	this.sche_content = sche_content;
    	this.sche_start_dt = sche_start_dt;
    	this.sche_end_dt = sche_end_dt;
    	this.user_id= user_id;
    }

	public t_schedule(String sche_title, String sche_content, String sche_start_dt, String sche_end_dt) {
		this.sche_title = sche_title;
		this.sche_content = sche_content;
		this.sche_start_dt = sche_start_dt;
		this.sche_end_dt = sche_end_dt;
	}

	public t_schedule(int sche_idx) {
		this.sche_idx=sche_idx;
	}
    
    
    
}
