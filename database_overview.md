# Restaurant

## Colecciones

### Platillos y bebidas

Platillo con una sola variación

````json
{
    name: "",
    description: "",	// Opcional
    image: Image,
    price: 0.0,
    category: "",		// Entrada, Postres, Bebidas...
    ingredients: [""],	// Opcional
    season_start: Date,	// Opcional
    season_end: Date	// Opcional
}
````

Platillo con variaciones, etc ingredientes extra.

````json
{
    name: "",
    description: "",	// Opcional
    image: Image,
    category: "",
    ingredients: [""],	// Ingrediente común
    season_start: Date,
    season_end: Date,
    variations: [
        {
            name: "",
            price: 0.0,
    		description: "",	// Opcional
            ingredients: [""]	// Ingredientes propios
        },
    ]
}
````

### Cuenta

````json
{
    date: ISODate(),
    reservation: ObjectId(reservacion),	// Opcional
    waiter: ObjectId(empleado),
    total: 0.0,
    tip: 0.0,
    table: 0,
    subsidiary: ObjectId(sucursal),
	orders: [ObjectId(platillo)]
}
````

### Sucursales

````json
{
    name: "",
    address: {
        street: "",
        number: "",
        interior_number: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
    },
    contact: {
        phone: "",
        email: "",
        facebook: "",	// Opcionales
        instagram: "",	// Opcionales
        twitter: "",	// Opcionales
    },
    manager: ObjectId(empleado),
    employees: [ObjectId(empleado)],
    menu_items: [ObjectId(menu_item)]
}
````

### Empleados

````json
{
    name: "",
    hiring_date: ISODate(),
    position: "",
    degree: "",
    phone: "",
    email: "",
    password: "",
    is_active: boolean,
    schedule: {
        sunday: {
            start: ISODate(),
            end: ISODate()
        },
        monday: {
            start: ISODate(),
            end: ISODate()
        },
        tuesday: {
            start: ISODate(),
            end: ISODate()
        },
        wednesday: {
            start: ISODate(),
            end: ISODate()
        },
        thursday: {
            start: ISODate(),
            end: ISODate()
        },
        friday: {
            start: ISODate(),
            end: ISODate()
        },
        saturday: {
            start: ISODate(),
            end: ISODate()
        }
    },
    salary: 0.0,
    legal_documents: [""],	// Arreglo de direcciones de los archivos almacenados en el servidor
    permissions: ObjectId(permisos),
}
````

### Reservaciones

````json
{
    client: "",
    phone: "",
    subsidiary: ObjectId(sucursal),
    table: 0,
    date: ISODate()
}
````

### Permisos

Los tipos de empleados pienso guardarlos como plantillas en el la interfaz de usuario, no en la base de datos por que quiero que el sistema sea flexible y se adapte a distintos tipos de restaurant.

**Administrador general**

- Agregar sucursales
- Eliminar sucursales
- Actualizar información de cualquier sucursal
- Agregar, eliminar y modificar administradores de sucursal
- Agregar, eliminar y modificar información de cualquier empleado
- Agregar, eliminar y modificar platillos

**Administrador de sucursal**

- Actualizar información de su sucursal, excepto su administrador

**Ayudante de administrador de sucursal**

- Actualizar los datos de contacto de la sucursal
- Agregar, eliminar y modificar platillos de la sucursal
- Modificar y eliminar cuentas

**Recepcionista**

- Agregar, eliminar y modificar reservaciones

**Mesero / Cajero**

- Hacer cuentas

````json
{
    name: "", // Recepcionista, Mesero, Personalizado...
    
    add_subsidiaries: true,
    remove_subsidiaries: true,
    update_any_subsidiary: true,
    
    add_subsidiary_manager: true,
    remove_subsidiary_manager: true,
    update_subsidiary_manager: true,
    
    add_any_subsidiary_menu_item: true,
    remove_any_subsidiary_menu_item: true,
    update_any_subsidiary_menu_item: true,
    
    update_subsidiary_info: true,
    update_subsidiary_contact_info: true,
    add_menu_item: true,
    remove_menu_item: true,
    update_menu_item: true,
    
    add_check: true,
    remove_check: true,
    update_check: true,
    
    add_reservation: true,
    remove_reservation: true,
    update_reservation: true
}
````
