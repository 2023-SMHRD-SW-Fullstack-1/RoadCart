package com.smhrd.road.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.smhrd.road.domain.t_user;

@Controller
public class HomeController {

	
	@GetMapping(value="/")
	public String main() {
		return "join";
	}
	@GetMapping(value="/login")
	public String login() {
		return "login";
	}
	@GetMapping(value="/logout")
	public String logout() {
		return "logout";
	}
	@GetMapping(value="/update")
	public String update() {
		return "update";
	}
	
	
	
	
//	@GetMapping(value="/")
//	public String schedule() {
//		return "schedule";
//	}
	
}
