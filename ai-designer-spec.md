# NOVAprint AI Designer — Especificación de esta iteración

## Alcance añadido

Esta iteración incorpora una representación funcional de la experiencia **NOVAprint AI Designer** sobre el configurador ya existente y una nueva sección administrativa **Administración → IA Designer**. Se reutilizan la preview del termo, los controles de imagen, texto, emojis, diseños, capas y el precio base del configurador; no se duplican esos módulos.

## Flujo de cliente

El cliente puede abrir el panel desde **Diseñar con IA**, subir una imagen opcional, escribir una descripción, utilizar sugerencias, abrir el modo guiado “No sé qué quiero”, generar tres propuestas demo, escoger una, editar el texto y cambiar de estilo. La propuesta elegida se aplica al área de impresión y se añade como capa del diseño actual. También se muestran estados de carga, variación y mejora como estados de interfaz.

## Flujo de administración

La sección **IA Designer** reúne el estado activo, proveedor y modelo configurados, número de propuestas, precios, generaciones gratuitas, límite por usuario, estilos disponibles, generaciones, coste estimado, solicitudes a revisar y diseños generados. Los valores son datos de demostración editables en la interfaz; las acciones de persistencia se marcan como preparadas para conectar.

## Frontera segura para producción

La demo frontend no incluye claves ni llamadas directas a ningún proveedor. La implementación real deberá usar el flujo `Frontend → Backend → Servicio de IA → Backend → Frontend`, con secretos en variables de entorno. El backend deberá registrar usuario, pedido, coste, fecha, producto y diseño generado; aplicar límites, moderación y cobro; y exponer una interfaz estable para cambiar de proveedor o modelo sin rehacer el configurador.

## Precios demo

| Acción | Precio demo |
|---|---:|
| Pack de 3 propuestas | 2,99 € |
| Crear otra versión | 0,99 € |
| Mejorar diseño | 0,99 € |

Estos precios representan configuración inicial de demostración y deben trasladarse posteriormente a la configuración persistente del administrador.
