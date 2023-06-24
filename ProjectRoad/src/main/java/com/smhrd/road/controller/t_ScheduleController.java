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
@CrossOrigin("http://localhost:3000")
public class t_ScheduleController {

	@Autowired
	private t_ScheduleService scheduleService;

	@Autowired
	private t_PoiService poiService;
	
	// 일정 리스트
	@PostMapping(value = "/schedulelist")
	public @ResponseBody JSONObject scheduleList(@RequestParam("user_id") String user_id) {
		System.out.println("user_id : "+user_id);
		int result = scheduleService.userId_select(user_id);
		System.out.println("result 값 : "+result);
		
		JSONObject obj = new JSONObject();
		if(result>=1) {
			System.out.println("전송 성공");
			List<t_schedule> sch = scheduleService.scheduleList(user_id);
			for(int i=0; i<sch.size();i++) {
				System.out.println(sch.get(i).getSche_title());
			}
			obj.put("sch_list", sch);
			System.out.println("obj 값 : "+ obj);
			return obj;
		}else {
			System.err.println("전송 실패");
			return obj;
		}
		
		
	}
	
	// 해당날짜 일정조회
	@PostMapping(value="/scheduledetail")
	public @ResponseBody JSONObject scheduleDetail(@RequestParam("sche_idx") int sche_idx) {
		System.out.println("sche_idx 값 : "+sche_idx);
		int result = scheduleService.sch_idxSelect(sche_idx);
		System.out.println("result 값 : "+result);
		
		JSONObject obj = new JSONObject();
		if(result>=1) {
			System.out.println("전송 성공");

			List<t_poi> poiList =  scheduleService.scheduleDetail(sche_idx);
			for (int i = 0; i < poiList.size(); i++) {
				System.out.println(poiList.get(i).getPoi_name());
			}
			obj.put("poiList", poiList);
			System.out.println("obj 값 : "+obj);
			return obj;
		}else {
			System.out.println("전송 실패");
			return obj;
		}
		
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

		// poi 등록
		List<Map<String, Object>> reqList = (List<Map<String, Object>>) map.get("t_poi");
		for (int i = 0; i < reqList.size(); i++) {
			t_poi poi = new t_poi(
					reqList.get(i).get("user_id").toString(), 
					reqList.get(i).get("poi_dt").toString(),
					reqList.get(i).get("poi_category").toString(), 
					reqList.get(i).get("poi_name").toString(),
					reqList.get(i).get("poi_info").toString(), 
					reqList.get(i).get("poi_addr").toString(),
					Double.parseDouble(reqList.get(i).get("lat").toString()),
					Double.parseDouble(reqList.get(i).get("lng").toString()), 
					reqList.get(i).get("poi_img").toString());
			System.out.println(reqList.get(i).get("poi_dt").toString());
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
