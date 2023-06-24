<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
    <title>join Page</title>
</head>
<body>
    <h1>join Page</h1>
    <form action="join" method="post">
        <h2>회원가입</h2>
        <label for="user_id">아이디:</label>
        <input type="text" name="user_id" required>
        <br>
        <label for="user_pw">비밀번호:</label>
        <input type="password" name="user_pw" required>
        <br>
        <label for="user_nick">닉네임:</label>
        <input type="text" name="user_nick" required>
        <br>
        <input type="submit" value="가입">
    </form>
    <br>
    <form action="logout" method="post">
        <h2>로그아웃</h2>
        <input type="submit" value="로그아웃">
    </form>
</body>
</html>