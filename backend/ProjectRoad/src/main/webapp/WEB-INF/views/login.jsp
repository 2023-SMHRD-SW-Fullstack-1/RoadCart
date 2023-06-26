<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<form action="login" method="post">
        <h2>로그인</h2>
        <label for="user_id">아이디:</label>
        <input type="text" name="user_id" required>
        <br>
        <label for="user_pw">비밀번호:</label>
        <input type="password" name="user_pw" required>
        <br>
        <input type="submit" value="로그인">
    </form>
</body>
</html>