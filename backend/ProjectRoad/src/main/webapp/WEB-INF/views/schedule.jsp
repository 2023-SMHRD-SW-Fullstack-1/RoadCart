<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<li><h5>��������</h5></li>
				<form action="schedule/register" method="post">
					<li><input type="text" name="sche_title" placeholder="���� Ÿ��Ʋ" id="input"></li>
					<li><input type="text" name="sche_content" placeholder="���� ����" ></li>
					<li><input type="text" name="sche_start_dt" placeholder="���۳�¥ 8�ڸ�" ></li>
					<li><input type="text" name="sche_end_dt" placeholder="����¥ 8�ڸ�" ></li>
					<li><input type="submit" value="JoinUs" class="button fit"></li>
				</form>
</body>
</html>