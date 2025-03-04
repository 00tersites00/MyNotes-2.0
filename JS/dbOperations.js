//          Funciones de la base de datos

const addObjectNote = (objeto)=>{ // funcion para añadir los elementos a la base de datos
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("notes", "readwrite"); // Abrir una transaccion
    const objectStore = IDBtransaction.objectStore("notes"); 
    objectStore.add(objeto);
    IDBtransaction.addEventListener("complete", ()=>{
      console.log("objeto agregado satisfactoriamente")
    })
}

const deleteObject = (key)=>{ // Funcion para eliminar el note de la base de datos
    const IDBdata = getIDBdata("readwrite", "objeto eliminado correctamente");
    const objectStore = IDBdata.objectStore("notes");
    objectStore.delete(key);
}

const updateNote = (new_note,key) => { // Actualizar los datos de un elemento de la base de datos 
    const IDBdata = getIDBdata("readwrite", "objeto modificado correctamente");
    const objectStore = IDBdata.objectStore("notes");
    objectStore.put(new_note, key);
};
