package com.smhrd.road.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.road.domain.t_community;
import com.smhrd.road.domain.t_poi;

@Mapper
public interface t_PoiMapper {

	public List<t_poi> poiList();

	// 여행관심지 등록
	public int poiRegister(t_poi poi);
	
	// 여행관심지 조회
	@Select ("select count(*) from t_poi where poi_idx=#{poi_idx}")
	public int poiSelect(t_poi poi);
	
	// 여행관심지 수정
	public int poiUpdate(t_poi poi);
	
	// 여행관심지 삭제
	public int poiDelete(t_poi poi);
}
