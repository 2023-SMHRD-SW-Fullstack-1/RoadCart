package com.smhrd.road.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.road.domain.t_poi;
import com.smhrd.road.domain.t_schedule;
import com.smhrd.road.domain.t_user;
import com.smhrd.road.service.t_PoiService;
import com.smhrd.road.service.t_ScheduleService;

@Controller
//@CrossOrigin("http://172.30.1.28:3000")
@CrossOrigin("http://localhost:3000")
public class t_ScheduleController {

	@Autowired
	private t_ScheduleService scheduleService;

	@Autowired
	private t_PoiService poiService;
	
	// 일정 리스트
	@PostMapping(value = "/schedulelist")
	public @ResponseBody List<t_schedule> scheduleList(@RequestBody String user_id) {
		int result = scheduleService.userId_select(user_id);
		List<t_schedule> sch = scheduleService.scheduleList(user_id);
		return sch;

	}
	
	// 해당날짜 일정조회
	@PostMapping(value="/scheduledetail")
	public @ResponseBody List<t_poi> scheduleDetail(@RequestBody String sche_idx) {
		int idx = Integer.parseInt(sche_idx);
		System.out.println(idx);
		
		List<t_poi> poiList =  scheduleService.scheduleDetail(idx);
		return poiList;
		
	}

	// 일정등록
	@PostMapping(value = "/schedule/register")
	public @ResponseBody void scheduleRegister(@RequestBody Map<String, Object> map) {

		// schedule 등록
		Map<String, Object> reqSche = (Map<String, Object>) map.get("t_schedule");
		System.out.println(reqSche);
		t_schedule sch = new t_schedule(
				reqSche.get("sche_title").toString(), 
				reqSche.get("sche_content").toString(),
				reqSche.get("sche_start_dt").toString(), 
				reqSche.get("sche_end_dt").toString(),
				reqSche.get("user_id").toString());
		scheduleService.scheduleRegister(sch);
		int idx = scheduleService.schIdx(sch);

		// poi 등록
		List<Map<String, Object>> reqList = (List<Map<String, Object>>) map.get("t_poi");
		for (int i = 0; i < reqList.size(); i++) {
			String img = "";
			try {
				img = reqList.get(i).get("poi_img").toString();
			} catch(NullPointerException error) {
				System.out.println(error);
			}
			t_poi poi = new t_poi(
					reqList.get(i).get("user_id").toString(), 
					reqList.get(i).get("poi_dt").toString(),
					reqList.get(i).get("poi_category").toString(), 
					reqList.get(i).get("poi_name").toString(),
					reqList.get(i).get("poi_info").toString(), 
					reqList.get(i).get("poi_addr").toString(),
					Double.parseDouble(reqList.get(i).get("lat").toString()),
					Double.parseDouble(reqList.get(i).get("lng").toString()), 
					img,
					idx);
			poiService.poiRegister(poi);
		}

	}

	// 일정수정
	@PostMapping("/schedule/update")
	public @ResponseBody void schduleUpdate(@RequestBody Map<String, Object> map) {
		// System.out.println(map);

		// schedule 수정
		Map<String, Object> reqSche = (Map<String, Object>) map.get("t_schedule");
		System.out.println(reqSche);
		t_schedule sch = new t_schedule(
				reqSche.get("sche_title").toString(), 
				reqSche.get("sche_content").toString(),
				reqSche.get("sche_start_dt").toString(), 
				reqSche.get("sche_end_dt").toString());
		int result = scheduleService.scheduleSelect(sch);
		System.out.println(result);
		if(result ==1 ) {
			scheduleService.scheduleUpdate(sch);
		}

		// poi 수정
		List<Map<String, Object>> reqList = (List<Map<String, Object>>) map.get("t_poi");
		
		
		for (int i = 0; i < reqList.size(); i++) {
			t_poi poi = new t_poi(
					reqList.get(i).get("poi_dt").toString(),
					reqList.get(i).get("poi_category").toString(), 
					reqList.get(i).get("poi_name").toString(),
					reqList.get(i).get("poi_info").toString(), 
					reqList.get(i).get("poi_addr").toString(),
					Double.parseDouble(reqList.get(i).get("lat").toString()),
					Double.parseDouble(reqList.get(i).get("lng").toString()), 
					reqList.get(i).get("poi_img").toString());
			int result2 = poiService.poiSelect(poi);
			System.out.println(result2);
			if(result2==1) {
				poiService.poiUpdate(poi);
				break;
			}
		}
		

	}

	// 일정삭제
	@PostMapping("/schedule/delete")
	public @ResponseBody void deleteSchedule(@RequestBody Map<String, Object> map) {
		

		// schedule 삭제
		Map<String, Object> reqSche = (Map<String, Object>) map.get("t_schedule");
		int sche_idx = (int) reqSche.get("sche_idx");
		System.out.println(sche_idx);
		t_schedule sch = new t_schedule(sche_idx);
		int result = scheduleService.scheduleSelect(sch);
		System.out.println("result 값 : "+result);
		if(result==1) {
			scheduleService.deleteSchedule(sch);
		}
		
		
		// poi 삭제
		List<Map<String, Object>> reqList = (List<Map<String, Object>>) map.get("t_poi");
		
		int poi_idx=0;
		for (int i = 0; i < reqList.size(); i++) {
			poi_idx = (int) reqList.get(i).get("poi_idx");
			t_poi poi = new t_poi(poi_idx);
			int result2 = poiService.poiSelect(poi);
			System.out.println(result2);
			if(result2==1) {
				poiService.poiDelete(poi);
				break;
			}
		}

	}
}
