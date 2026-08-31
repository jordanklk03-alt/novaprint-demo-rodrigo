# NOVAprint — Delta del prompt cliente

## Funcionalidad ya cubierta por la versión v0

El configurador existente ya dispone de una vista previa de termo, área de impresión, selección de color, subida de imagen en JPG/JPEG/PNG/WEBP, texto editable, emojis, diseños predeterminados, capas, restablecer, resumen de precio y cálculo dinámico local.

## Funcionalidad nueva que sí debe añadirse

| Área | Cambio necesario |
|---|---|
| Entrada principal | Botón destacado **Diseñar con IA** dentro del configurador. |
| Modal/panel | Flujo visual de “Crea tu diseño con IA” con imagen opcional, descripción extensa, sugerencias clicables y estado de carga. |
| Modo guiado | Asistente “No sé qué quiero” con destinatario, estilo, colores, texto y elementos obligatorios. |
| Resultados | Tres propuestas diferenciadas con acciones “Usar este diseño”, “Editar” y “Crear otra versión”. |
| Acciones posteriores | “Mejorar diseño” y “Cambiar estilo” manteniendo la idea original. |
| Integración | La propuesta elegida debe pasar al área de impresión y poder seguir editándose manualmente. |
| Precio | Mostrar el coste configurado de generación, variación y mejora dentro del resumen. |
| Historial | Nueva sección de diseños IA guardados con fecha, producto, prompt, estado y reutilización. |
| Seguridad UX | Estado de carga atractivo y mensaje amigable de moderación; no exponer errores técnicos. |

## Dependencias de arquitectura

El prompt solicita que la generación real siga `Frontend → Backend → Servicio IA → Backend → Frontend`, con claves en variables de entorno, límites y registro de uso. La versión actual es un proyecto frontend estático, por lo que la siguiente iteración puede incluir una **demostración visual simulada** del flujo AI Designer, pero la generación real, moderación, límites, historial persistente y cobro requieren posteriormente activar backend, autenticación y base de datos. No se deben incluir claves API en el frontend.

## No repetir

No recrear la subida manual de imágenes, texto, emojis, diseños, capas, colores ni el cálculo base del configurador; se reutilizarán sus controles y estados existentes. El trabajo nuevo debe integrarse encima del configurador actual.

## Delta del prompt administrador

La nueva sección **Administración → IA Designer** añade un destino propio en la sidebar y un panel con estado activo/inactivo, proveedor, modelo, número de propuestas, precios de pack/regeneración/mejora, generaciones gratuitas y límite por usuario. También incorpora estadísticas de generaciones, usuarios, carritos y pedidos; tabla de diseños generados; solicitudes para revisión y archivo; biblioteca de estilos activables/desactivables y botón para crear estilos; y una tarjeta de arquitectura que deja explícito que las API keys viven en el backend.

En esta versión estática, los controles son interactivos a nivel de interfaz y se muestran como demo. La persistencia, la ejecución de proveedores, la moderación real, el coste calculado desde consumo y el historial por usuario quedan documentados como integración backend posterior.
