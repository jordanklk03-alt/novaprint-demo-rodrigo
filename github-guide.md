# Cómo subir NOVAprint a GitHub

Esta guía explica dos métodos. El primero es el más sencillo porque utiliza la exportación de GitHub del panel de Manus. El segundo permite trabajar manualmente con Git y la terminal.

## Método recomendado: exportar desde el panel del proyecto

### 1. Abre el proyecto

Entra en el proyecto **NOVAprint — Hazlo tuyo.** desde Manus y abre el panel de administración del proyecto.

### 2. Comprueba que existe un checkpoint

Antes de exportar, asegúrate de que el proyecto tiene un checkpoint guardado. La versión actual ya tiene uno disponible: **NOVAprint AI Designer v1**.

### 3. Abre la configuración de GitHub

En el panel derecho entra en:

`Settings → GitHub`

La exportación de GitHub crea un repositorio nuevo con el código del proyecto.

### 4. Conecta tu cuenta de GitHub

Si Manus te solicita autorización, inicia sesión en GitHub y concede únicamente los permisos necesarios para crear el repositorio. Si ya existe una conexión, selecciona el propietario o la organización donde quieres guardar el proyecto.

### 5. Define el repositorio

Introduce un nombre, por ejemplo:

`novaprint-demo`

Elige si quieres que sea **Private** o **Public**. Para un proyecto todavía en desarrollo, recomiendo **Private**.

### 6. Exporta el código

Confirma la exportación. El panel creará el repositorio y copiará el estado actual del proyecto, incluidos los archivos de React, estilos, documentación y configuración.

### 7. Comprueba el repositorio

Abre el enlace de GitHub que te muestre Manus y revisa que existan, como mínimo, estas rutas:

| Ruta | Contenido |
|---|---|
| `client/src/` | Código de la aplicación frontend |
| `client/src/pages/` | Homepage, configurador y paneles |
| `client/src/components/` | Componentes reutilizables |
| `ideas.md` | Dirección visual aprobada |
| `brand-spec.md` | Activos y tokens de marca |
| `ai-designer-spec.md` | Especificación del AI Designer |
| `package.json` | Dependencias y scripts |

La exportación representa un **snapshot**. Si después realizas nuevos cambios en Manus, tendrás que volver a exportar o utilizar el método manual con Git para sincronizarlos.

## Método manual: Git y terminal

### 1. Abre una terminal en el proyecto

La ruta del proyecto actual es:

```bash
cd /home/ubuntu/novaprint-demo
```

### 2. Revisa el estado del repositorio

```bash
git status
git remote -v
```

El proyecto ya utiliza control de versiones para los checkpoints. No ejecutes `git init` si `git status` funciona correctamente.

### 3. Revisa que no vayas a subir secretos

Antes de hacer `git add`, comprueba que no haya claves ni archivos `.env` con credenciales:

```bash
git status --ignored
find . -maxdepth 3 -type f \( -name '.env' -o -name '.env.*' \) -print
```

No subas nunca API keys, contraseñas, tokens, certificados privados ni variables de entorno con secretos. Si encuentras un archivo `.env`, verifica que esté incluido en `.gitignore` antes de continuar.

### 4. Crea el repositorio en GitHub

Puedes abrir [github.com/new](https://github.com/new) y crear un repositorio vacío llamado, por ejemplo, `novaprint-demo`.

No marques las opciones **Add a README**, **Add .gitignore** ni **Choose a license** si el proyecto ya contiene sus propios archivos. Así evitarás conflictos en el primer `push`.

### 5. Comprueba que GitHub CLI está autenticado

Si utilizas GitHub CLI:

```bash
gh auth status
```

Si no aparece una cuenta autenticada:

```bash
gh auth login
```

Selecciona GitHub.com, HTTPS y el método de autenticación que prefieras. Sigue las instrucciones que aparezcan en la terminal.

### 6. Añade y confirma los archivos

Desde `/home/ubuntu/novaprint-demo` ejecuta:

```bash
git add .
git commit -m "feat: NOVAprint demo with AI Designer"
git branch -M main
```

Si Git responde que no hay nada nuevo que confirmar, significa que el estado ya estaba guardado localmente; puedes continuar.

### 7. Crea el repositorio y sube el código con GitHub CLI

Sustituye `TU_USUARIO` por tu usuario real de GitHub:

```bash
gh repo create TU_USUARIO/novaprint-demo --private --source=. --remote=origin --push
```

Para un repositorio público, cambia `--private` por `--public`:

```bash
gh repo create TU_USUARIO/novaprint-demo --public --source=. --remote=origin --push
```

### 8. Alternativa si ya creaste el repositorio desde el navegador

Si el repositorio ya existe y prefieres añadir el remoto manualmente:

```bash
git remote add origin https://github.com/TU_USUARIO/novaprint-demo.git
git push -u origin main
```

Si ya existe un remoto llamado `origin`, no vuelvas a ejecutar `git remote add`. Compruébalo con:

```bash
git remote -v
```

### 9. Verifica que el código llegó a GitHub

```bash
git log --oneline -1
git branch --show-current
git status
```

Deberías ver la rama `main`, el commit más reciente y un estado de trabajo limpio. Después recarga el repositorio en GitHub y comprueba sus archivos.

## Cómo subir cambios posteriores

Cada vez que modifiques el proyecto, utiliza:

```bash
cd /home/ubuntu/novaprint-demo
git add .
git commit -m "describe el cambio realizado"
git push
```

Ejemplos de mensajes útiles:

```bash
git commit -m "feat: add AI Designer guided assistant"
git commit -m "fix: improve mobile configurator layout"
git commit -m "docs: update AI Designer architecture"
```

## Ejecutar el proyecto después de clonarlo

En otro ordenador o entorno, clona el repositorio y entra en él:

```bash
git clone https://github.com/TU_USUARIO/novaprint-demo.git
cd novaprint-demo
pnpm install
pnpm check
pnpm build
pnpm dev
```

El comando `pnpm dev` inicia el servidor local de desarrollo.

## Importante sobre imágenes y archivos generados

El código de NOVAprint referencia algunos activos mediante URLs gestionadas por el entorno web, como las rutas `/manus-storage/...`, y otras imágenes mediante URLs externas. Es normal que esas imágenes no aparezcan como archivos físicos dentro del repositorio de GitHub. Si quieres que el proyecto sea completamente independiente de Manus y de URLs externas, tendrás que descargar los activos, guardarlos en un servicio de almacenamiento propio y actualizar las referencias del código.

## Recomendación final

Para tu caso, utiliza primero `Settings → GitHub`, porque es la ruta más rápida y evita problemas con autenticación y remotos. Utiliza el método manual cuando quieras mantener un flujo de trabajo continuo con ramas, commits, pull requests y sincronización frecuente.
