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
        <h2>ȸ������</h2>
        <label for="user_id">���̵�:</label>
        <input type="text" name="user_id" required>
        <br>
        <label for="user_pw">��й�ȣ:</label>
        <input type="password" name="user_pw" required>
        <br>
        <label for="user_nick">�г���:</label>
        <input type="text" name="user_nick" required>
        <br>
        <input type="submit" value="����">
    </form>
    <br>
    <form action="logout" method="post">
        <h2>�α׾ƿ�</h2>
        <input type="submit" value="�α׾ƿ�">
    </form>
</body>
</html>