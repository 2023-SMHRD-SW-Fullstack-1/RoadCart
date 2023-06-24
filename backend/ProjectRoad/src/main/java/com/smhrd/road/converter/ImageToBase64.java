package com.smhrd.road.converter;

import java.io.File;
import java.io.IOException;
import java.util.Base64;

import org.apache.commons.io.FileUtils;

public class ImageToBase64 extends ImgConverter<File, String>{

	@Override
	public String convert(File f) throws IOException {
		
		//파일을 문자열로 변환하는 코드
		// 1. 파일을 가지고 오기 -> 바이트 배열형태로 읽기
		byte[] fileContent = FileUtils.readFileToByteArray(f);
		// 2. 바이트 형태를 인코딩 (base64)해서 문자열로 변환
		String result = Base64.getEncoder().encodeToString(fileContent);
		return result;
	}
	
	
	
}
