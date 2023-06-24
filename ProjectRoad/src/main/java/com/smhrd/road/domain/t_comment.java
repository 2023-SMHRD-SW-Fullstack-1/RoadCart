package com.smhrd.road.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class t_comment {
	// 댓글 식별자 
    private int cmt_idx;
    // 댓글 내용 
    private String cmt_content;
    // 댓글 작성일자 
    private String cmt_dt;
    // 댓글 작성자 
    private String user_id;
    // 원글 번호 
    private int comm_idx;
    
    
    public t_comment(String cmt_content, String user_id, int comm_idx) {
    	this.cmt_content=cmt_content;
    	this.user_id=user_id;
    	this.comm_idx=comm_idx;
    }
}
