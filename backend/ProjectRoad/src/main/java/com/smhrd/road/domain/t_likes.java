package com.smhrd.road.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class t_likes {
	 // 좋아요 순번 
    private int like_idx;
    
    // 글 번호 
    private int comm_idx;
    
    // 좋아요 여부 
    private String like_yn;
    
    // 좋아요 작성자 
    private String user_id;
    
    // 좋아요 날짜 
    private String like_dt;
}
