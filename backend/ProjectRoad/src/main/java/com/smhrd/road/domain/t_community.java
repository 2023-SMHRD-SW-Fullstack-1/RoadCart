package com.smhrd.road.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class t_community {
	
	// 글 번호 
    private int comm_idx;
    // 글 제목 
    private String comm_title;
    // 글 내용 
    private String comm_content;
    // 글 첨부파일 
    private String comm_file;
    // 글 작성일자 
    private String comm_dt;
    // 글 작성자 
    private String user_id;
    // 글 좋아요수 
    private int comm_likes;
    // 일정 순번 
    private int sche_idx;
    
    public t_community(int comm_idx) {
    	this.comm_idx=comm_idx;
	}
}
