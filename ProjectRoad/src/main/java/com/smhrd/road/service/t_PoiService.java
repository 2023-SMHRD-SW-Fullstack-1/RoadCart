package com.smhrd.road.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.road.domain.t_community;
import com.smhrd.road.domain.t_poi;
import com.smhrd.road.mapper.t_PoiMapper;

@Service
public class t_PoiService {

	@Autowired
	private t_PoiMapper poiMapper;

	public List<t_poi> poiList() {
		return poiMapper.poiList();
	}

	// 여행관심지 등록
	public int poiRegister(t_poi poi) {
		return poiMapper.poiRegister(poi);
	}
	
	// 여행관심지 조회
	public int poiSelect(t_poi poi) {
		return poiMapper.poiSelect(poi);
	}
	

	// 여행관심지 수정
	public int poiUpdate(t_poi poi) {
		return poiMapper.poiUpdate(poi);
	}
	
	// 여행관심지 삭제
	public int poiDelete(t_poi poi) {
		return poiMapper.poiDelete(poi);
	}
}
