# NOVAprint — Modificaciones pendientes

- [x] Recibir y comparar el nuevo prompt de la parte cliente con la versión v0.
- [x] Recibir y comparar el nuevo prompt de la parte administrador con la versión v0.
- [x] Integrar el flujo visual de AI Designer sobre el configurador existente, sin duplicar sus controles.
- [x] Añadir en administración la sección IA Designer con configuración, estadísticas, estilos, solicitudes y diseños.
- [x] Documentar la frontera entre demo frontend y backend seguro para proveedor, modelo, claves y límites.
- [x] Ejecutar comprobaciones de TypeScript y build de producción.
- [x] Capturar vistas desktop y móvil de las rutas actualizadas.
- [ ] Guardar un nuevo checkpoint y entregar el resultado.

## Exportación a GitHub

- [x] Habilitar y autorizar la conexión segura con GitHub.
- [x] Confirmar el propietario, nombre y visibilidad del repositorio destino.
- [x] Subir el checkpoint actual de NOVAprint al repositorio.
- [x] Verificar ramas, archivos y ausencia de secretos expuestos.
- [x] Entregar la URL del repositorio y explicar cómo sincronizar cambios futuros.

## Bloqueo actual

- [x] Resolver el permiso de GitHub: la cuenta autenticada no permite crear repositorios mediante la autorización disponible.
- [x] Crear el repositorio vacío o autorizar el permiso de creación y volver a ejecutar el push.

## Mejoras de autenticación y producto 3D

- [x] Añadir autenticación real y protección por rol para la ruta administrativa.
- [x] Definir el acceso admin mediante OAuth del propietario; no se almacena una contraseña compartida.
- [x] Sustituir la silueta 2D del termo por un visor 3D giratorio.
- [x] Hacer que la imagen subida se proyecte/enrolle sobre todo el cuerpo imprimible y deje el tapón libre.
- [x] Validar visualmente giro 3D, cuenta cliente y responsive en desktop y móvil.
- [ ] Ejecutar una prueba interactiva final con una imagen real subida y un checkout Stripe en sandbox.

## Cuenta cliente y checkout

- [x] Añadir acceso visible de cliente: iniciar sesión, cerrar sesión y recordar la sesión mediante Manus OAuth.
- [x] Crear perfil cliente con nombre, email y datos de envío editables.
- [x] Añadir historial básico de pedidos vinculado al usuario autenticado.
- [x] Integrar checkout preparado para pagos seguros y métodos tokenizados.
- [x] Evitar almacenar números de tarjeta, CVV o datos sensibles de pago en NOVAprint.
- [x] Añadir pruebas de aislamiento entre cuentas y protección de datos personales.

## Huecos detectados antes del checkpoint

- [x] Añadir edición persistente de nombre y email en la cuenta cliente mediante procedimientos tRPC seguros.
- [x] Ampliar las pruebas Vitest para verificar aislamiento entre cuentas en perfil, pedidos, métodos de pago y guardado de datos.

## Comprobación de repositorio antes del checkpoint

- [ ] Verificar explícitamente la visibilidad de `jordanklk03-alt/novaprint-demo-rodrigo` y documentar el resultado.
- [ ] Revisar ramas y archivos subidos a GitHub y confirmar que no hay secretos o credenciales expuestas.

## Sincronización de la iteración full-stack

- [ ] Subir al repositorio remoto la cuenta cliente, Stripe, migraciones, webhook y visor 3D que aún solo están en el árbol local.
- [ ] Repetir la auditoría remota de ramas, archivos y nombres de secretos después del push.
