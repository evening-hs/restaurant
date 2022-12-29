# Consultas

## 1. Platillos y bebidas

1. Listar todos los platillos de una sola categoría en todas las sucursales, (Sólo el administrador general puede usarlo).

   ````json
   db.menu_items.find({
       $and: [
           {"category": "CATEGORY"},
           {
               // If the document has no season
               // or has season and it's currently active
               $or: [
                   {
                       "season_start": {$exists: false}
                   },
                   {
                       $and: [
                           {"season_start": {$lte: new Date()}},
                           {"season_end": {$gte: new Date()}}
                       ]
                   }
               ]
           }
       ]
   })
   ````

   ````json
   db.menu_items.find({$and: [{"category": "CATEGORY"},{$or: [{"season_start": {$exists: false}},{$and: [{"season_start": {$lte: new Date()}},{"season_end": {$gte: new Date()}}]}]}]})
   ````

   

2. Buscar un platillo por nombre en todas las sucursales, (Sólo el administrador general puede usarlo).

   ````json
   db.menu_items.find({
       "name": {
           $regex: 'CADENA*',
           $options: 'i'
       }
   })
   ````

   ````json
   db.menu_items.find({"name": {$regex: 'CADENA*',$options: 'i'}})
   ````

   

3. Listar todos los platillos de una sola categoría en una sucursal.

   ````json
   [
     {
       /**
        * Seleccionar la sucursal
        */
       $match: {
         name: "Morelia",
       },
     },
     {
       /**
        * Seleccionar los documentos de la colección menu_items
        * cuyo id se encuentra en el arreglo menu_items de esta colección
        */
       $lookup: {
         from: "menu_items",
         localField: "menu_items",
         foreignField: "_id",
         as: "menu_items_info",
       },
     },
     {
       /**
        * Ocultar los campos que no vamos a usar
        */
       $project: {
         _id: 0,
         name: 0,
         address: 0,
         contact: 0,
         manager: 0,
         employees: 0,
         menu_items: 0,
       },
     },
     {
       /**
        * Expandir el arreglo resultante
        */
       $unwind: {
         path: "$menu_items_info",
       },
     },
     {
       /**
        * Filtrar los items por categoria y fecha
        */
       $match: {
         $and: [
           { "menu_items_info.category": "CATEGORIA" },
           {
             $or: [
               {
                 "menu_items_info.season_start": {
                   $exists: false,
                 },
               },
               {
                 $and: [
                   {
                     "menu_items_info.season_start": {
                       $lte: new Date(),
                     },
                   },
                   {
                     "menu_items_info.season_end": {
                       $gte: new Date(),
                     },
                   },
                 ],
               },
             ],
           },
         ],
       },
     },
   ]
   ````

   

4. Buscar un platillo por nombre en una sucursal.

   ````json
   [
     {
       $match: {
         name: "Morelia",
       },
     },
     {
       $lookup: {
         from: "menu_items",
         localField: "menu_items",
         foreignField: "_id",
         as: "menu_items_info",
       },
     },
     {
       $project: {
         _id: 0,
         name: 0,
         address: 0,
         contact: 0,
         manager: 0,
         employees: 0,
         menu_items: 0,
       },
     },
     {
       $unwind: {
         path: "$menu_items_info",
       },
     },
     {
       $match: {
         "menu_items_info.name": {
           $regex: "CADENA*",
           $options: "i",
         },
       },
     },
   ]
   ````


## 2. Cuentas

1. Listar todas las cuentas por fecha
2. Listar todas las cuentas de un mesero
3. Listar los platillos más comprados
4. Listar todas las cuentas de una sucursal

## Sucursales

1. Listar todas las sucursales
2. Buscar sucursales por domicilio

## Empleados

1. Listar todos los empleados

   Ordenar:

   - Por nombre
   - Por fecha de contratación
   - Por posición
   - Activos

2. Listar todos los empleados de una sucursal

   Ordenar:

   - Por nombre
   - Por fecha de contratación
   - Por posición
   - Activos

3. Buscar empleado por nombre

4. Buscar empleado por correo

## Reservaciones

1. Listar las reservaciones actuales (ordenar por fecha)
2. Buscar reservaciones por nombre
3. Buscar reservaciones por teléfono
4. Listar las reservaciones pasadas

## Permisos

1. Buscar permisos por nombre