package com.smhrd.road.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.road.domain.t_poi;
import com.smhrd.road.service.t_PoiService;

@Controller
@CrossOrigin("http://localhost:3000")
//@CrossOrigin("http://172.30.1.28:3000")
public class t_PoiController {

	@Autowired
	private t_PoiService poiService;

	@GetMapping("/poi")
	public @ResponseBody List<t_poi> poiList() {
		return poiService.poiList();
	}

//	// 여행 관심지 등록
//	@PostMapping("/poi/poiRegister")
//	public String poiRegister(t_poi poi, @RequestPart("comm_file") MultipartFile file) {
//		System.out.println(poi.getPoi_name() + "," + poi.getPoi_info() + "," + poi.getUser_id());
//		System.out.println(file.getOriginalFilename());
//		System.out.println(UUID.randomUUID().toString());
//
//		String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
//
//		try {
//			file.transferTo(new File(newFileName));
//		} catch (IllegalStateException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		poi.setPoi_img(newFileName);
//
//		int cnt = poiService.poiRegister(poi);
//
//		// System.out.println(cnt);
//
//		if (cnt > 0) {
//			return "redirect:/poi";
//		} else {
//			return "redirect:/poi/poiRegister";
//		}
//
//	}
//
//	// 여행 관심지 수정
//    @PostMapping("/poi/poiUpdate")
//    public String poiUpdate(t_poi poi, @RequestPart(value = "comm_file", required = false) MultipartFile file) {
//        System.out.println(poi.getPoi_name() + "," + poi.getPoi_info() + "," + poi.getUser_id());
//
//        if (file != null && !file.isEmpty()) {
//            System.out.println(file.getOriginalFilename());
//            System.out.println(UUID.randomUUID().toString());
//
//            String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
//
//            try {
//                file.transferTo(new File(newFileName));
//                poi.setPoi_img(newFileName);
//            } catch (IllegalStateException | IOException e) {
//                e.printStackTrace();
//            }
//        }
//
//        int cnt = poiService.poiUpdate(poi);
//
//        if (cnt > 0) {
//            return "redirect:/poi";
//        } else {
//            return "redirect:/poi/poiUpdate";
//        }
//    }

    
    
    

}
