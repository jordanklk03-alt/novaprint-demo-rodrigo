# Acceso administrador de NOVAprint

La zona `/admin` está protegida por autenticación real mediante Manus OAuth y por el rol `admin` validado en el servidor. No se ha creado una contraseña fija dentro del proyecto, porque una credencial compartida en el frontend no sería segura.

La cuenta propietaria registrada actualmente es:

| Campo | Valor |
|---|---|
| Usuario | `jordan.javier1995@gmail.com` |
| Método de acceso | Manus OAuth |
| Rol | `admin` |
| URL | `/admin` |

Para entrar, abre `/admin` e inicia sesión con la cuenta Manus autorizada. La contraseña es la de tu cuenta Manus y no se almacena ni se muestra dentro de NOVAprint.

El servidor también expone el procedimiento `admin.me`, protegido con `adminProcedure`. Una cuenta autenticada con rol `user` recibe `FORBIDDEN` y no puede renderizar el panel administrativo.
