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
   db.menu_items.find({
       $and: [
           {"category": "CATEGORIA"},
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
           },
           {
               // If the document has no "subsidiary", then it is global
               // else, check if the id matches
               $or: [
                   {
                       "subsidiary": {$exists: false}
                   },
                   {
                       "subsidiary": ObjectId("ID_SUCURSAL")
                   }
               ]
           }
       ]
   })
   ````
   
4. Buscar un platillo por nombre en una sucursal.

   ````json
   db.menu_items.find({
       $and: [
           {
               // If the document has no "subsidiary", then it is global
               // else, check if the id matches
               $or: [
                   {
                       "subsidiary": {$exists: false}
                   },
                   {
                       "subsidiary": ObjectId("ID_SUCURSAL")
                   }
               ]
           },
           {
   			"name": {
   				$regex: "CADENA*",
   				$options: "i",
   			}
           }
       ]
   })
   ````


## 2. Cuentas

1. Listar todas las cuentas por fecha.

   ````json
   db.bills.find().sort({date: -1})
   ````
2. Listar todas las cuentas de un mesero por id.

   ````json
   db.bills.find({"waiter": ObjectId("ID")})).sort({date: -1})
   ````
3. Listar todas las cuentas de un mesero por nombre.

   Primero se busca el mesero con:

   ````json
   db.employees.find({
       position: "Mesero",
         name: {
           $regex: "NOMBRE*",
           $options: 'i'
         }
   })
   ````

   El usuario hace clic en el mesero y se obtiene su id.
4. Listar los 5 platillos más comprados.

   ````json
   db.bills.aggregate{[
     {
       /**
        * Hide unused fields
        */
       $project: {
         _id: 0,
         date: 0,
         reservation: 0,
         waiter: 0,
         total: 0,
         tip: 0,
         table: 0,
         subsidiary: 0,
       },
     },
     {
       /**
        * Unwind the menu_items ids array
        */
       $unwind: {
         path: "$orders",
         preserveNullAndEmptyArrays: false,
       },
     },
     {
       /**
        * Count the repetition of each id
        */
       $group: {
         _id: "$orders",
         count: { $sum: 1 },
       },
     },
     {
       /**
        * Sort by repeated, from max to min
        */
       $sort: {
         count: -1,
       },
     },
     {
       /**
        * Provide the number of documents to limit.
        */
       $limit: 5,
     },
     {
       /**
        * Get the information of the top items
        */
       $lookup: {
         from: "menu_items",
         localField: "_id",
         foreignField: "_id",
         as: "top_info",
       },
     },
     {
       /**
        * Hide the unused fields
        */
       $project: {
         _id: 0,
         count: 0,
       },
     },
     {
       /**
        * Unwind the items info
        */
       $unwind: {
         path: "$top_info",
         preserveNullAndEmptyArrays: false,
       },
     },
   ]}
   ````

5. Listar todas las cuentas de una sucursal por id.

   ````json
   db.bills.find({"subsidiary": ObjectId("ID")}).sort({date: -1})
   ````
6. Listar todas las cuentas de una sucursal por nombre.

   Primero se busca la sucursal con:

   ````json
   db.subsidiaries.find({
       name: {
           $regex: "NOMBRE*",
   		$options: 'i'
   	}
   })
   ````

   El usuario hace clic en la sucursal y se obtiene su id.

## Sucursales

1. Listar todas las sucursales

   ````json
   db.subsidiaries.find()
   ````
2. Buscar sucursales por ubicación

   ````json
   db.subsidiaries.find({
       "address.country": {
           $regex: "PAIS*",
           $options: 'i'
       },
       "address.state": {
           $regex: "ESTADO*",
           $options: 'i'
       },
       "address.city": {
           $regex: "CIUDAD*",
           $options: 'i'
       },
   })
   ````

## Empleados

1. Listar todos los empleados. (Sólo lo puede usar el administrador).

   Ordenar:

   - Por nombre

     ````json
     db.employees.find().sort({name: 1})
     ````

   - Por fecha de contratación

     ````json
     db.employees.find().sort({hiring_date: -1})
     ````

2. Listar todos los empleados activos/inactivos. (Sólo lo puede usar el administrador).

   ````json
   db.employees.find({is_active: BOOL}).sort({name: 1})
   ````

3. Buscar empleado por nombre (admin).

   ````json
   db.employees.find({
       name:{
           $regex: "NOMBRE*",
           $options: 'i'
       }
   })
   ````

4. Buscar empleado por correo (admin).

   ````json
   db.employees.find({
       email: {
           $regex: "CORREO*",
           $options: 'i'
       }
   })
   ````

5. Listar todos los empleados de una sucursal.

   Ordenar:

   - Por nombre

     ````json
     db.employees.find({
         subsidiary: ObjectId("ID_SUCURSAL")
     }).sort({name: 1})
     ````

   - Por fecha de contratación

     ````json
     db.employees.find({
         subsidiary: ObjectId("ID_SUCURSAL")
     }).sort({date: -1})
     ````

6. Listar todos los empleados activos/inactivos de una sucursal.

   ````json
   db.employees.find({
       subsidiary: ObjectId("ID_SUCURSAL"),
       is_active: BOOL
   }).sort({name: 1})
   ````

7. Buscar empleado por nombre en una sucursal.

   ````json
   db.employees.find({
       subsidiary: ObjectId("ID_SUCURSAL"),
       name:{
           $regex: "NOMBRE*",
           $options: 'i'
       }
   })
   ````

8. Buscar empleado por correo en una sucursal.

   ````json
   db.employees.find({
       subsidiary: ObjectId("ID_SUCURSAL"),
       email: {
           $regex: "CORREO*",
           $options: 'i'
       }
   })
   ````

9. Mostrar el mesero que más vendió en el mes en una sucursal.

   ````json
   [
     {
       /**
        * Select the subsidiary
        */
       $match: {
         subsidiary: ObjectId("ID_SUCURSAL"),
       },
     },
     {
       /**
        * Get the year and month
        * of each document.
        * And the current year and month
        */
       $project: {
         year: { $year: "$date" },
         current_year: { $year: new Date() },
   
         month: { $month: "$date" },
         current_month: { $month: new Date() },
         waiter: 1,
       },
     },
     {
       /**
        * Select all the documents
        * with the year and month same as today
        */
       $match: {
         $expr: {
           $and: [
             {
               $eq: ["$month", "$current_month"],
             },
             {
               $eq: ["$year", "$current_year"],
             },
           ],
         },
       },
     },
     {
       /**
        * Calculate how many bills
        * has each waiter
        */
       $group: {
         _id: "$waiter",
         total_bills: {
           $sum: 1,
         },
       },
     },
     {
       /**
        * Sort the waiters decreasing by bills
        */
       $sort: {
         total_bills: -1,
       },
     },
     {
       /**
        * Select only the first waiter
        */
       $limit: 1,
     },
     {
       /**
        * Retrieve the waiter information
        */
       $lookup: {
         from: "employees",
         localField: "_id",
         foreignField: "_id",
         as: "best_waiter",
       },
     },
     {
       /**
        * Unwind it
        */
       $unwind: {
         path: "$best_waiter",
       },
     },
   ]
   ````

## Reservaciones

1. Listar las reservaciones actuales (ordenar por fecha).

   ````json
   db.reservations.find({
       "date": {$gte: new Date()}
   }).sort({"date": 1})
   ````
2. Buscar reservaciones actuales por nombre.

   ````json
   db.reservations.find({
       $and: [
           {"date": {$gte: new Date()}},
           {"client": {
               $regex: "NOMBRE*",
               $options: 'i'
           }}
       ]    
   }).sort({"date": 1})
   ````
3. Buscar reservaciones actuales por teléfono.

   ````json
   db.reservations.find({
       $and: [
           {"date": {$gte: new Date()}},
           {"phone": {
               $regex: "TELÉFONO*",
               $options: 'i'
           }}
       ]    
   }).sort({"date": 1})
   ````
4. Listar las reservaciones pasadas.

   ````json
   db.reservations.find({
       "date": {$lt: new Date()}
   }).sort({"date": -1})
   ````
5. Buscar reservaciones pasadas por nombre.

   ````json
   db.reservations.find({
       $and: [
           {"date": {$lt: new Date()}},
           {"client": {
               $regex: "NOMBRE*",
               $options: 'i'
           }}
       ]    
   }).sort({"date": -1})
   ````
6. Buscar reservaciones pasadas por teléfono.

   ````json
   db.reservations.find({
       $and: [
           {"date": {$lt: new Date()}},
           {"phone": {
               $regex: "TELÉFONO*",
               $options: 'i'
           }}
       ]    
   }).sort({"date": -1})
   ````
7. Buscar todas las reservaciones por nombre.

   ````json
   db.reservations.find({
       "client": {
           $regex: "NOMBRE*",
           $options: 'i'
       }
   }).sort({"date": -1})
   ````
8. Buscar todas las reservaciones por teléfono.

   ````json
   db.reservations.find({
      	"phone": {
           $regex: "TELÉFONO*",
           $options: 'i'
       }
   }).sort({"date": -1})
   ````

## Permisos

1. Buscar permisos por nombre.

   ````json
   db.permissions.find({
      	"name": {
           $regex: "NOMBRE*",
           $options: 'i'
       }
   }
   ````

