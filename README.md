# Aliseda Inmobiliaria

Aplicación web de búsqueda y detalle de propiedades inmobiliarias, desarrollada con **Angular 21**.

## ¿Qué puedes hacer en la app?

- **Explorar propiedades** en un listado con imágenes, precio y características básicas
- **Cargar más resultados** de forma incremental con el botón "Ver 12 inmuebles más"
- **Ver el detalle de una propiedad**: galería de imágenes, precio, referencia, descripción, metros cuadrados, habitaciones y baños
- **Navegar la galería** de imágenes a pantalla completa con controles de anterior/siguiente

---

## Cómo ejecutarlo en local

Necesitas tener instalado **Node.js** y **npm**.

**1. Clona el repositorio:**
```bash
git clone https://github.com/luisangel584/a-inmobiliaria.git
cd a-inmobiliaria
```

**2. Instala las dependencias:**
```bash
npm install
```

**3. Arranca el servidor de desarrollo:**
```bash
npm start
```

**4. Abre el navegador en:**
```
http://localhost:4200
```

El servidor incluye un proxy que redirige las peticiones a la API de Aliseda, por lo que no necesitas configurar nada más.

---

## Decisiones técnicas

El proyecto usa varias herramientas de Angular moderno para gestionar el estado y las peticiones:

- **Signals** - valores reactivos que notifican al template cuando cambian, sin necesidad de Zone.js. Se usan para guardar el estado local de cada página: la lista de propiedades cargadas, si hay un error, si se está cargando, o qué imagen está activa en la galería. Cuando una signal cambia, solo se actualiza la parte del template que la consume.

- **Computed signals** - valores derivados que se recalculan automáticamente cuando sus dependencias cambian. Por ejemplo, `hasMore` se calcula a partir de `nextPageUrl`: si la API devuelve una URL de siguiente página, `hasMore` es `true` y el botón "Ver más" aparece. Si no, desaparece. No hay lógica extra ni actualizaciones manuales.

- **`subscribe` con RxJS** - se usa cuando necesitamos hacer algo con el resultado de una petición y tener control total sobre qué pasa con los datos. La suscripción se limpia sola gracias a `takeUntilDestroyed`, que la cancela automáticamente cuando Angular destruye el componente, sin necesidad de implementar `ngOnDestroy`.

- **`rxResource`** - abstracción de Angular que conecta una señal con una petición HTTP. Es ideal cuando la petición depende de un parámetro reactivo: en el detalle de propiedad, el `id` es un input signal que Angular actualiza automáticamente cuando cambia el parámetro de ruta, y `rxResource` lo observa y relanza la petición sin intervención manual. Además, expone una máquina de estados nativa - `isLoading`, `hasValue` y `error` - que permite dar retroalimentación al usuario en cada fase sin declarar variables adicionales. Esto es especialmente limpio y escalable cuando un componente maneja varias operaciones asíncronas a la vez.

---

### `subscribe` en el listado de propiedades

El listado necesita acumular resultados: cada vez que el usuario pulsa "Ver más", los nuevos elementos se suman a los anteriores. Para eso se usa `subscribe` junto con una signal `items`, que permite actualizar el array de forma precisa:

```typescript
private readonly destroyRef = inject(DestroyRef);

private fetch(page: number): void {
  this.isLoading.set(true);

  this.propertiesService
    .getProperties(page)
    .pipe(
      // Cuando el componente se destruye, Angular cancela la suscripción
      // automáticamente gracias a DestroyRef. No hace falta implementar ngOnDestroy.
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      // next se ejecuta cuando la petición devuelve datos correctamente.
      // Aquí acumulamos los nuevos resultados al array existente.
      next: (response) => {
        this.items.update((prev) => [...prev, ...response.data]);
        this.isLoading.set(false);
      },
      // error se ejecuta si la petición falla.
      // Activamos la señal hasError para mostrar el mensaje en el template.
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
}
```

### `rxResource` en el detalle de propiedad

En la página de detalle, el ID de la propiedad viene como parámetro de ruta. `rxResource` hace la petición automáticamente cada vez que ese parámetro cambia, y expone señales de `isLoading`, `hasValue` y `error` listas para usar directamente en el template, sin necesidad de gestionar el estado manualmente.

```typescript
// El id viene del parámetro de ruta como input signal.
// Angular lo actualiza automáticamente si la URL cambia.
readonly id = input.required<string>();

// rxResource observa el id y lanza la petición cada vez que cambia.
// No hace falta ngOnInit, ni subscribe, ni gestionar isLoading manualmente.
readonly property = rxResource({
  params: () => ({ id: this.id() }),
  stream: ({ params }) => this.propertiesService.getPropertyById(params.id),
});
```

En el template se consume directamente con la máquina de estados que expone:

```html
@if (property.isLoading()) {
  <p>Cargando propiedad...</p>
} @else if (property.error()) {
  <p>Error al cargar la propiedad</p>
} @else if (property.hasValue()) {
  <!-- aquí van los componentes con los datos -->
}
```

---

## Arquitectura de carpetas

La app sigue una estructura **orientada a features**. Cada funcionalidad agrupa todo lo que necesita - páginas, componentes, servicios e interfaces - en su propia carpeta, lo que facilita navegar y escalar el proyecto sin que las carpetas crezcan de forma descontrolada.

```
src/
├── app/
│   ├── app.ts / app.html / app.routes.ts   # Raíz de la aplicación y enrutado global
│   │
│   ├── features/
│   │   └── properties/                     # Feature de propiedades
│   │       ├── components/                 # Componentes presentacionales (solo reciben datos)
│   │       │   ├── hero-gallery/           # Galería de imágenes con modal
│   │       │   ├── property-card/          # Tarjeta de propiedad para el listado
│   │       │   ├── detail-header/          # Título y ubicación en el detalle
│   │       │   ├── detail-pricing/         # Precio y referencia en el detalle
│   │       │   ├── detail-amenities/       # Superficie, habitaciones y baños
│   │       │   └── detail-description/     # Descripción de la propiedad
│   │       │
│   │       ├── pages/                      # Páginas inteligentes (llaman servicios y gestionan estado)
│   │       │   ├── properties-list-page/   # Listado paginado de propiedades
│   │       │   └── property-detail/        # Detalle de una propiedad
│   │       │
│   │       ├── interfaces/                 # Tipos e interfaces TypeScript
│   │       ├── services/                   # Lógica de acceso a la API
│   │       └── properties.routes.ts        # Rutas de la feature
│   │
│   └── shared/
│       └── components/
│           └── top-nav/                    # Barra de navegación superior compartida
│
├── environments/                           # URLs de API por entorno (local / producción)
└── styles/                                 # Variables SCSS globales (colores, espaciados, z-index)
```

La regla principal es que **solo las páginas llaman a los servicios**. Los componentes reciben los datos como `@Input` y emiten eventos con `@Output`, sin saber nada de dónde vienen los datos.

Cada feature tiene su propio archivo `*.routes.ts` donde se definen sus rutas. Esto evita que el enrutado global crezca sin control y hace que añadir o modificar rutas sea algo localizado en la feature que corresponde, sin tocar el resto de la app.

---

## Estilos

### PrimeFlex - solo para el sistema de columnas

Se usa **PrimeFlex** únicamente para su grid de 12 columnas (`grid`, `col-*`). Todo lo demás - colores, tipografía, espaciados, componentes visuales - está construido de forma personalizada para el proyecto. Esto evita depender de estilos de terceros que pueden ser difíciles de sobreescribir o que no encajan con el diseño.

### Variables SCSS globales

Existe un archivo `src/styles/_variables.scss` que centraliza todos los valores de diseño del proyecto: colores, espaciados, z-indexes, radios de borde, etc. Usar variables en lugar de valores directos hace que cualquier cambio de diseño se aplique en un solo lugar y sea consistente en toda la app.

```
$spacing-s: 12px;
$neutral-300: #96a1b5;
$z-modal: 200;
```

### Nomenclatura BEM

Las clases CSS siguen la convención **BEM** (Bloque, Elemento, Modificador). Esto hace que el código de estilos sea predecible y fácil de leer: con el nombre de una clase ya sabes a qué componente pertenece y qué rol tiene dentro de él.

```
.property-card            → bloque
.property-card__image     → elemento
.property-card--featured  → modificador
```

---

## Flujo de trabajo con Git

```
main
 │
 ├── feature/nombre-feature  ──► PR ──► main
 │
 └── (producción siempre refleja el estado de main)
```

- **`main`** - rama principal. Solo recibe código revisado a través de Pull Requests. Lo que está aquí es lo que se despliega.
- **`feature/*`** - ramas de trabajo. Cada funcionalidad o fix se desarrolla en su propia rama y se integra en `main` mediante un PR.

Puedes explorar el historial completo de cambios y decisiones en la pestaña de [Pull Requests](https://github.com/luisangel584/a-inmobiliaria/pulls?q=is%3Apr+is%3Aclosed).

---

## Producción

La app está desplegada en **GitHub Pages**:

👉 [https://luisangel584.github.io/a-inmobiliaria/](https://luisangel584.github.io/a-inmobiliaria/)

Las peticiones a la API **no se hacen directamente desde el navegador** - pasan por un **Worker de Cloudflare** que actúa como proxy intermedio. Esto es necesario porque los navegadores modernos tienen restricciones en cómo negocian las conexiones con ciertos servidores, lo que provoca que la petición falle antes de llegar a la API. Al delegar esa petición a una función fuera del navegador (el Worker), se evita el problema completamente.

Además, el Worker tiene configurado **CORS** para que solo acepte peticiones provenientes de nuestra implementación en GitHub Pages, bloqueando cualquier otro origen.

---

## Stack y características técnicas

### Angular 21
- Standalone components
- Signals y computed signals
- Input signals (`input.required`)
- `rxResource`
- `inject()`
- Lazy loading
- Nueva sintaxis de plantillas (`@if`, `@for`, `@let`)
- Angular Router
- Pipes nativos (`CurrencyPipe`, `UpperCasePipe`)

### RxJS
- Observables y `subscribe`
- `takeUntilDestroyed`

### Estilos
- SCSS por componente
- Variables globales centralizadas
- BEM
- PrimeFlex (sistema de grid)

### Iconos
- `@ng-icons/material-icons`
- SVG personalizados como assets estáticos

### Herramientas y calidad
- Proxy de desarrollo
- Environments por entorno

### Infraestructura y despliegue
- GitHub Pages
- `angular-cli-ghpages`
- Cloudflare Workers
- CORS restringido por origen
