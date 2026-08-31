# NOVAprint — Dirección visual aprobada

## Tres direcciones iniciales

### Theme Name: Creative Commerce Studio
**Very Brief Intro:** Un lenguaje editorial premium para productos personalizables: marfil cálido, tinta profunda y azul eléctrico como gesto de acción. La interfaz se siente como un estudio de diseño que también vende.
**Probability:** 0.07

### Theme Name: Electric Workshop
**Very Brief Intro:** Una experiencia más enérgica y tecnológica, con superficies oscuras, diagramas de capas y acentos de azul luminoso para hacer visible el proceso creativo.
**Probability:** 0.03

### Theme Name: Soft Utility Market
**Very Brief Intro:** Una tienda serena y táctil, construida alrededor de fondos claros, fotografía de producto y controles muy sencillos para que personalizar se sienta accesible.
**Probability:** 0.05

## Enfoque elegido: Creative Commerce Studio

### Design Movement
Editorial digital contemporáneo con referencias a revistas de diseño, packaging premium y herramientas creativas de escritorio. La tienda pública prioriza deseo y claridad; el panel admin traduce la misma identidad a una herramienta operativa de alta densidad.

### Core Principles
1. **El producto es el protagonista.** Las composiciones de termo, camiseta y sudadera tienen escala, espacio negativo y textura fotográfica.
2. **La personalización debe verse.** Cada acción del configurador produce un cambio visual inmediato y un precio claramente explicado.
3. **La utilidad puede ser editorial.** La navegación, los datos y los controles están ordenados como un sistema profesional, pero conservan ritmo, contraste y personalidad.
4. **El azul es una decisión, no un relleno.** El azul eléctrico aparece para orientar la acción y señalar aquello que puede cambiarse.

### Color Philosophy
El marfil cálido evita la frialdad clínica del blanco puro y coloca la marca cerca del mundo físico de los materiales. La tinta aporta confianza y legibilidad. El azul eléctrico identifica el momento de crear, guardar o avanzar; el azul cielo funciona como eco ligero para estados secundarios. El sistema mantiene el contraste alto y reserva el color más intenso para las acciones con intención.

### Layout Paradigm
La homepage usa una composición editorial asimétrica: copy anclado a la izquierda, producto a la derecha y módulos que se desplazan horizontalmente. El configurador se estructura en tres estaciones —herramientas, lienzo y resumen— con un resumen pegajoso que mantiene el precio a la vista. El admin utiliza un sidebar persistente y paneles de trabajo que se sienten como una mesa de operaciones, no como una plantilla de tarjetas.

### Signature Elements
- **N-gota:** marca gráfica compacta basada en una N geométrica que recuerda una gota de tinta.
- **Líneas de corte:** pequeños separadores y reglas azules que evocan guías de impresión y áreas de seguridad.
- **Etiquetas de estudio:** microcopys en mayúsculas, chips de estado y numeración editorial para dar contexto sin ruido.

### Interaction Philosophy
Cada interacción debe explicar el siguiente paso. Los controles tienen respuesta táctil breve, las herramientas activas se distinguen con azul y las acciones irreversibles piden confirmación visual. En el configurador, añadir una capa incrementa el precio y actualiza el resumen sin ocultar el producto.

### Animation
Entradas escalonadas de 40–60 ms para grupos de contenido, transiciones de 180–240 ms con `cubic-bezier(0.23, 1, 0.32, 1)`, y transformaciones limitadas a `transform` y `opacity`. Las tarjetas se elevan apenas al pasar el cursor; el preview del producto responde con un desplazamiento mínimo. Toda la animación no esencial queda desactivada para `prefers-reduced-motion`.

### Typography System
**Space Grotesk** para titulares, navegación y etiquetas de acción; sus formas geométricas refuerzan la idea de estudio creativo. **DM Sans** para descripciones, datos, tablas y texto largo; mantiene legibilidad en móvil. Los titulares usan pesos 600–700, el cuerpo 400–500 y las etiquetas 600 con tracking amplio.

### Brand Essence
**NOVAprint convierte objetos cotidianos en piezas personales para personas que quieren diseñar, no elegir entre opciones.** Personal, preciso, optimista.

### Brand Voice
Los titulares son directos y visuales; las CTAs suenan a invitación concreta; el microcopy elimina fricción y explica el resultado.

> “Tú lo imaginas. Nosotros lo hacemos.”

> “Empieza con un termo en blanco. Termina con algo que solo puede ser tuyo.”

### Wordmark & Logo
El wordmark usa “NOVA” en Space Grotesk semibold y “print” en peso regular para diferenciar creación y ejecución. El símbolo es una N modular de dos trazos que se curva como una gota de tinta; aparece a la izquierda del wordmark y funciona de forma autónoma como favicon.

### Signature Brand Color
**Azul de tinta `#2563EB`**: el color propietario que marca el gesto de crear y conecta la pantalla con la impresión física.

## Design Decisions

| Elemento | Decisión |
|---|---|
| Artefacto | Demo web con storefront público, configurador de termo y dashboard admin |
| Color | Marfil `#F7F6F2`, tinta `#111111`, azul `#2563EB`, azul cielo `#60A5FA`, gris niebla `#E9EBEF` |
| Tipografía | Space Grotesk + DM Sans |
| Espaciado | Base de 4 px; ritmo principal 8/16/24/40/64 px |
| Radios | 14–18 px en superficies; botones de píldora; contenedores grandes de 24 px |
| Sombras | Difusas y suaves, separando por superficie antes que por bordes |
| Movimiento | 160–240 ms, ease-out fuerte, respetando reduced motion |
| Datos | Datos demo locales; el punto de integración queda representado por el estado y la nomenclatura del admin |
