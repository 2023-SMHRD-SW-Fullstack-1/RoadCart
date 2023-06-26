package com.smhrd.road.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class t_poi {
	// 장소 식별자
	private int poi_idx;

	// 회원 아이디
	private String user_id;

	// 작성 일자
	private String poi_dt;

	// 카테고리
	private String poi_category;

	// 장소 명
	private String poi_name;

	// 장소 정보
	private String poi_info;

	// 주소
	private String poi_addr;

	// 위도
	private double lat;

	// 경도
	private double lng;

	// 이미지 주소
	private String poi_img;
	
	private int sche_idx;

	public t_poi(String user_id, String poi_dt, String poi_category, String poi_name, String poi_info, String poi_addr,
			double lat, double lng, String poi_img, int sche_idx) {
		this.user_id = user_id;
		this.poi_dt = poi_dt;
		this.poi_category = poi_category;
		this.poi_name = poi_name;
		this.poi_info = poi_info;
		this.poi_addr = poi_addr;
		this.lat = lat;
		this.lng = lng;
		this.poi_img = poi_img;
		this.sche_idx = sche_idx;
	}

	public t_poi(String poi_dt, String poi_category, String poi_name, String poi_info, String poi_addr,
			double lat, double lng, String poi_img) {
		this.poi_dt = poi_dt;
		this.poi_category = poi_category;
		this.poi_name = poi_name;
		this.poi_info = poi_info;
		this.poi_addr = poi_addr;
		this.lat = lat;
		this.lng = lng;
		this.poi_img = poi_img;
	}
	
	public t_poi(int poi_idx) {
		this.poi_idx=poi_idx;
	}
}