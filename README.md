# 💇‍♂️ Frontend Peluquería César Farra

Este proyecto es el frontend del sistema de gestión de la Peluquería César Farra. Está diseñado para administrar de manera eficiente clientes, turnos, servicios, y visualizar estadísticas y métricas del negocio. Su objetivo es facilitar la operatividad diaria de la peluquería mediante una interfaz clara, rápida y adaptable.

## 🚀 Tecnologías utilizadas

- ⚛️ **React** – Biblioteca para construir interfaces de usuario.
- ⚡ **Vite** – Herramienta de desarrollo rápido para aplicaciones React.
- 🎨 **Tailwind CSS** – Framework de estilos utilitario para construir diseños modernos.
- 🧪 **Vitest** – Framework de pruebas para componentes y lógica del frontend.

## 🌐Link del despliegue 
En el siguiente link se encuentra la aplicación operativa desplegada en un servidor de Vercel, si desea hacer una prueba rápida se recomienda ingresar a este link, de lo contrario puede seguir con loas pasos de Instalación y ejecución del proyecto:

### Sistema de gestión de turnos operativo:
<https://peluqueriacesarfarra-front.vercel.app/>

## 📦 Instalación y ejecución del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/mateochumbita/peluqueriacesarfarra_front.git
cd frontend-peluqueria-farra
```
### 2. Instalar dependencias
```bash
npm install

```
### 3. Inicializar variables de entorno
⚠️ Este proyecto depende de un backend para funcionar correctamente.
Asegurate de tener el link del deploy del backend dentro de tus variables de entorno, **de lo contrario la aplicación no funcionará**
1. Crear un archivo .env en la raiz de nuestro proyecto
2. Copiar y pegar la siguiente variable de entorno
   
```env
VITE_API_URL = https://cesarfarra-api.vercel.app/
```


### 4. Ejecutar el proyecto
```bash
npm run dev

```
Esto levantará el servidor de desarrollo en http://localhost:5173

### 🔐 5. Credenciales del Administrador
Las mismas están disponibles en la entrega de la Actividad Obligatoria nro. 2


## 🧪 Ejecutar pruebas
Si lo desea, puede ejecutar las pruebas unitarias que están orientadas a probar el correcto funcionamiento de los siguientes componentes 
- dateRangerFilter.js
- FormateDate.js
- ParseFechaLocal.js
- stringUtils.js

```bash
npm test

```

