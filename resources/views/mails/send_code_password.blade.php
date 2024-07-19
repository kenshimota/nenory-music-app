<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codigo para Cambiar Contraseña</title>
</head>
<body>
   <p>Hola {{ $user->name }} {{ $user->last_name }}, Hemos recibido una solicitud de un codigo para cambiar contraseña </p>
   <p>Su código es: <b>{{ $code }}</b></p>
   <p>Si usted no ha solicitado este cambio de contraseña, puede ignorar este mensaje y su contraseña seguirá siendo la misma.</p>
</body>
</html>