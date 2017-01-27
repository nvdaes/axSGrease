# AxSGrease

- Author: James Teh &lt;jamie@nvaccess.org&gt; & other contributors
- Copyright: 2011-2017 NV Access Limited

AxSGrease es un conjunto de scripts de [GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) para mejorar la accesibilidad de varios sitios web.

## Instalación
Antes de que puedas instalar cualquiera de estos scripts, en primer lugar debes instalar [GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).
Una vez hecho eso, simplemente activa el enlace de descarga del script que te interese entre los siguientes para descargarlo e instalarlo

## Scripts
A continuación hay información sobre cada script.

### Bugzilla Accessibility Fixes
[Descargar Bugzilla Accessibility Fixes](https://github.com/nvaccess/axSGrease/raw/master/BugzillaA11yFixes.user.js)

Este script mejora la accesibilidad de las páginas de error en la plataforma para el seguimiento de errores [Bugzilla](http://www.bugzilla.org/), usada por muchos proyectos.
Hace lo siguiente:

- Hace accesibles como encabezados el título de error, encabezado de adjuntos y número de comentario.
- Proporciona texto alternativo para imágenes de usuario, de modo que los lectores de pantalla no deduzcan un nombre poco amigable a partir de la URL.

### GitHub Accessibility Fixes
[Descargar GitHub Accessibility Fixes](https://github.com/nvaccess/axSGrease/raw/master/GitHubA11yFixes.user.js)

Este script mejora la accesibilidad de [GitHub](https://github.com/).
Hace lo siguiente:

- Hace accesibles como encabezados varios encabezados, entre ellos:
 - Encabezamientos en incidencias, pull requests y commits
 - Encabezamientos de grupos de commits en listados de commits
 - El título del commit para commits individuales
  - El encabezamiento para cada fichero modificado en pull requests y commits
- Asegura que varias tablas de datos no son tratadas como tablas de maquetación, entre ellas:
 - El contenido de fichero cuando se está viendo un fichero individual
 - Listados de ficheros
 - Contenido diff
 - Tablas en contenido Markdown
- Cuando hay líneas de código sobre las que se puede comentar (p. ej. un pull request o commit), pone los botones de comentario después (en vez de antes) del código.
- Ace accesible el estado de elementos verificables de menús; p. ej. en las ventanas emergentes watch y labels.
- Marca los botones de "Add your reaction" como si tuvieran una ventana emergente, sitúa el foco en la primera reacción cuando se pulsa el botón añadir y disminuye la información transmitida por las etiquetas de los botones de reacción.

### Kill Windowless Flash
[Descargar Kill Windowless Flash](https://github.com/nvaccess/axSGrease/raw/master/KillWindowlessFlash.js)

Los objetos Adobe Flash se pueden crear para ser accesibles.
Incluso si no lo son y solo contienen controles sin etiquetar, aún sería posible usar estos objetos con algo de ayuda visual al principio, o por ensayo y error.
Sin embargo, es imposible para las herramientas de accesibilidad interaccionar en modo alguno con objetos que son "sin ventana" (también conocidos como transparentes u opacos).
Este script convierte  los objetos Flash sin ventana en objetos con ventana, de modo que haya una oportunidad para acceder a ellos.

### Monorail Accessibility Fixes
[Descargar Monorail Accessibility Fixes](https://github.com/nvaccess/axSGrease/raw/master/MonorailA11yFixes.user.js)

Este script mejora la accesibilidad de la plataforma de seguimiento de incidencias [Monorail](https://bugs.chromium.org/), usada por Google para proyectos relacionados con Chromium.
Hace lo siguiente:

- Hace accesibles como encabezados los títulos de incidencia y encabezados de comentario.
- Hace accesible el control de estrella y estado.

### Slack Accessibility Fixes
[Descargar Slack Accessibility Fixes](https://github.com/nvaccess/axSGrease/raw/master/SlackA11yFixes.user.js)
Este script mejora la accesibilidad de [Slack](https://www.slack.com/).
Hace lo siguiente:

- Reordena algunos elementos que se presentan en el lugar equivocado para su accesibilidad. Por ejemplo, usando este script, la zona de entrada de datos se presenta cerca del final de la página, como lo hace visualmente, en vez de al principio.
- Hace los mensajes accesibles como elementos de lista.
- Hace que las marcas de fecha de los mensajes se presenten en una sola línea, en vez de ocupar varias.
- Ace accesibles los controles de estrella y sus estados.
- Ace accesible el botón cerrar para el panel acerca del canal.
- Hace accesibles como encabezados los separadores de días en el historial de mensajes, y el encabezado del panel acerca del canal.
- Notifica automáticamente los mensajes entrantes (mediante una "live region").
- Oculta un área editable que no se muestra visualmente.

### Telegram accessibility fixes
[Descargar Telegram Accessibility Fixes](https://github.com/nvaccess/axSGrease/raw/master/TelegramA11yFixes.user.js)

Este script mejora la accesibilidad de la interfaz web del [Telegram instant messaging](https://web.telegram.org/).

Por el momento hace lo siguiente:

- Marca el historial de mensajes como una "live region", de modo que los mensajes nuevos se anuncian automáticamente. 
