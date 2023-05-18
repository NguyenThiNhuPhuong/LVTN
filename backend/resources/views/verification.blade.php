<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
</head>
<body>
<h2>Email Verification</h2>
<p>Hello,</p>
<p>Please click the following link to verify your email:</p>
<a href="{{ url('api/verify-email?token=' . $token) }}">Verify Email</a>
</body>
</html>
