# Renovar el acceso de GitHub para subir NOVAprint

El error que apareció fue `403 Permission denied`. Esto significa que la cuenta está conectada, pero la autorización que utiliza Manus no puede escribir en el repositorio `novaprint-demo-rodrigo`.

## Paso 1: Comprueba el repositorio

Abre esta dirección en GitHub y confirma que puedes ver el repositorio:

`https://github.com/jordanklk03-alt/novaprint-demo-rodrigo`

Si no puedes abrirlo, estás usando otra cuenta de GitHub o el repositorio pertenece a otra cuenta/organización. En ese caso, inicia sesión con la cuenta propietaria o añade la cuenta correcta como colaboradora.

## Paso 2: Abre la configuración del proyecto en Manus

1. Vuelve al proyecto **NOVAprint — Hazlo tuyo.**
2. Abre el panel de administración del proyecto.
3. Entra en `Settings`.
4. Abre la sección `GitHub` o `Integrations`.
5. Localiza la conexión llamada **GitHub**.

## Paso 3: Renueva la conexión

Busca un botón con un nombre parecido a `Reconnect`, `Re-authorize`, `Connect GitHub`, `Manage connection` o `Disconnect`.

Si aparece `Reconnect` o `Re-authorize`, selecciónalo directamente. Si solo aparece `Disconnect`, desconecta la integración y vuelve a pulsar `Connect GitHub`.

No elimines el repositorio de GitHub. Solo se debe renovar la autorización de la integración.

## Paso 4: Autoriza GitHub

GitHub abrirá una pantalla de autorización. Inicia sesión con la cuenta que contiene el repositorio y acepta la autorización.

Si aparece una pantalla de selección de repositorios, elige `Only select repositories` y marca:

`jordanklk03-alt/novaprint-demo-rodrigo`

Si GitHub ofrece permisos detallados, asegúrate de que el repositorio tenga:

| Permiso | Nivel necesario |
|---|---|
| Contents | Read and write |
| Metadata | Read-only |
| Administration | Solo si la integración necesita crear repositorios; no es necesario para hacer push |

Para subir código, el permiso importante es **Contents: Read and write**. No es necesario conceder permisos de pagos, correo, organización ni información personal adicional.

## Paso 5: Si el repositorio pertenece a una organización

Si `novaprint-demo-rodrigo` está dentro de una organización, GitHub puede mostrar un botón como `Request access`, `Approve`, `Grant access` o `Configure SSO`.

En ese caso:

1. Solicita o aprueba el acceso de la integración a esa organización.
2. Si la organización utiliza SSO, pulsa `Configure SSO` y autoriza la aplicación.
3. Comprueba que la integración tenga acceso específicamente a `novaprint-demo-rodrigo`.

Si no eres administrador de la organización, la persona administradora tendrá que aprobar la aplicación o añadir tu cuenta como colaboradora con permiso **Write**.

## Paso 6: Vuelve a Manus

Regresa al proyecto y comprueba que GitHub aparece como conectado y habilitado. No hace falta introducir ningún token manualmente.

## Paso 7: Avísame

Cuando hayas terminado, escríbeme simplemente:

`listo`

Entonces volveré a ejecutar la subida del proyecto a:

`https://github.com/jordanklk03-alt/novaprint-demo-rodrigo`

## Si sigue apareciendo el error 403

Si la autorización se completa pero vuelve a aparecer `403`, comprueba estas tres cosas:

1. Estás conectado a GitHub con `jordanklk03-alt`, que es la cuenta que tiene acceso al repositorio.
2. El repositorio no está bajo otra cuenta u organización sin permisos de escritura.
3. En la autorización de GitHub, el repositorio está seleccionado y tiene `Contents: Read and write`.

Si todo es correcto y el error continúa, puedes añadir temporalmente `jordanklk03-alt` como colaboradora del repositorio desde `Settings → Collaborators` con permiso **Write**, y después volver a avisarme.

Nunca envíes por el chat una contraseña, API key, token personal ni código de recuperación de GitHub.
