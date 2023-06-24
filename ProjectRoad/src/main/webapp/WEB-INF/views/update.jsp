<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>회원정보 수정</title>
</head>
<body>
    <h1>회원정보 수정</h1>

    <form action="update" method="POST">
		
		<label for="user_nick">닉네임:</label>
        <input type="text" id="user_nick" name="user_nick" required><br>
        
        <label for="user_pw">비밀번호:</label>
        <input type="password" id="user_pw" name="user_pw" required><br>

        <input type="submit" value="수정">
    </form>
</body>
</html>