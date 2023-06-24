<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<li><h5>일정관리</h5></li>
				<form action="schedule/register" method="post">
					<li><input type="text" name="sche_title" placeholder="일정 타이틀" id="input"></li>
					<li><input type="text" name="sche_content" placeholder="일정 내용" ></li>
					<li><input type="text" name="sche_start_dt" placeholder="시작날짜 8자리" ></li>
					<li><input type="text" name="sche_end_dt" placeholder="끝날짜 8자리" ></li>
					<li><input type="submit" value="JoinUs" class="button fit"></li>
				</form>
</body>
</html>