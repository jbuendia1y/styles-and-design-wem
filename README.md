# Estilos & Diseños WEM

## Init Proyect

Install dependencies : **'`npm install`'**

### Create a '.env' file

```
CLOUDINARY_KEY = XXX
CLOUDINARY_SECRET = XXX
CLOUDINARY_NAME = XXX
```

Los archivos de cloudinary tienen que estar una carpeta **`styles-and-designs-wem`**

### Estructura de carpetas

```
styles-and-designs-wem
|   main.json
|   type-material
|   |   type-furniture
|   |   |   any-name.md
|   |   ... images.jpg ...
```

### Contenido del `main.json`

```json
[
  {
    "image": "URL OF IMAGE",
    "title": "NAME OF IMAGE"
  }
]
```

### Contenido del .MD

```md
---
title: "Titulo para la página de mueble"
description: "Descripción para la página de mueble"
image: "Imagen principal para la página de mueble"
---

Texto opcional para la página , después de los metadatos
```
