<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>ȸ������ ����</title>
</head>
<body>
    <h1>ȸ������ ����</h1>

    <form action="update" method="POST">
		
		<label for="user_nick">�г���:</label>
        <input type="text" id="user_nick" name="user_nick" required><br>
        
        <label for="user_pw">��й�ȣ:</label>
        <input type="password" id="user_pw" name="user_pw" required><br>

        <input type="submit" value="����">
    </form>
</body>
</html>