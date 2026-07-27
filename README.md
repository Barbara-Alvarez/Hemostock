# Hemostock

API REST para el control de inventario de hemocomponentes de un
servicio de hemoterapia.

## Requisitos

- Node.js 24
- MongoDB corriendo en el puerto 27017

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

Si no tenés MongoDB instalado, podés levantarlo con Docker:

```bash
docker compose up -d
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/hemocomponentes` | Crear |
| GET | `/hemocomponentes` | Listar todos |
| GET | `/hemocomponentes/:id` | Obtener uno |
| PUT | `/hemocomponentes/:id` | Modificar |
| DELETE | `/hemocomponentes/:id` | Eliminar |
| GET | `/hemocomponentes/categoria/:categoria` | Filtrar por tipo |
| GET | `/hemocomponentes/bajo-stock/:cantidad` | Stock menor a un valor |
| PUT | `/hemocomponentes/actualizar-stock` | Actualización masiva |

## Ejemplos de uso

### Crear un hemocomponente

```bash
curl -X POST http://localhost:3000/hemocomponentes \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "Plaquetas",
    "grupoSanguineo": "O+",
    "cantidad": 5,
    "fechaVencimiento": "2026-08-05"
  }'
```

Valores admitidos:

- `tipo`: `Sangre entera`, `Glóbulos rojos`, `Plaquetas`
- `grupoSanguineo`: `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`

Los campos `tipo`, `grupoSanguineo`, `cantidad` y `fechaVencimiento` son
obligatorios. `fechaIngreso` se completa automáticamente.

### Filtrar por categoría

```bash
curl "http://localhost:3000/hemocomponentes/categoria/Plaquetas"
```

### Productos con bajo stock

```bash
curl http://localhost:3000/hemocomponentes/bajo-stock/5
```

Devuelve los hemocomponentes con cantidad **menor** al valor indicado.

### Actualización masiva de stock

```bash
curl -X PUT http://localhost:3000/hemocomponentes/actualizar-stock \
  -H "Content-Type: application/json" \
  -d '{
    "hemocomponentes": [
      { "id": "6a66c0fe8253ed3d3c67c4d5", "cantidad": 20 },
      { "id": "6a66c1328253ed3d3c67c4d7", "cantidad": 3 }
    ]
  }'
```