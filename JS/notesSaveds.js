const IDBRequest = indexedDB.open("notes_basadate"); // Abrir la base de datos
let db; // Variable para almacenar la referencia a la base de datos

IDBRequest.addEventListener("upgradeneeded", ()=>{ // Verificar si se crea la base de datos
    const db = IDBRequest.result;
    db.createObjectStore("notes", { // Crear ObjectStore 
      autoIncrement: true // Auto incremente del id de los objetos del objectStore
    })
})

IDBRequest.addEventListener("success", ()=>{ // Verificar que la base de datos se abre satisfactoriamente
    db = IDBRequest.result;
    console.log("Todo salió correctamente");
    dbReadObjects();
})
  
IDBRequest.addEventListener("error", ()=>{ // Verificar si ocurre un error
    console.log("Ocurrió un error");
})
  
const dbReadObjects = ()=>{ // Leer los objetos
    const IDBdata = getIDBdata("readonly");
    const objectStore = IDBdata.objectStore("notes");
    const cursor = objectStore.openCursor();
    cursor.addEventListener("success", ()=>{
      if (cursor.result) {
        new_note = crearLiNota(cursor.result.key,cursor.result.value)
        ulNotes.appendChild(new_note);
        cursor.result.continue();
      } else console.log("Todos los datos fueron leídos");
    }) 
}

const dbReadObjectsFavorites = () => {
    const IDBdata = getIDBdata("readonly");
    const objectStore = IDBdata.objectStore("notes");
    const cursor = objectStore.openCursor();

    cursor.addEventListener("success", () => {
        const result = cursor.result;
        if (result) {
            if (result.value.favorito === true) { // Comparar explícitamente con true
                let new_note = crearLiNota(result.key, result.value);
                ulNotes.appendChild(new_note);
            }
            result.continue(); // Avanza al siguiente registro, siempre
        } else {
            console.log("Todos los datos fueron leídos");
        }
    });
};

const dbSearchByTitle = (searchText) => {
    const IDBdata = getIDBdata("readonly");
    const objectStore = IDBdata.objectStore("notes");
    const cursor = objectStore.openCursor();

    cursor.addEventListener("success", () => {
        const result = cursor.result;
        if (result) {
            const titulo = result.value.titulo.toLowerCase(); // Normaliza a minúsculas
            const search = searchText.toLowerCase();

            if (titulo.includes(search)) { // Verifica similitud
                let new_note = crearLiNota(result.key, result.value);
                ulNotes.appendChild(new_note);
            }
            result.continue(); // Sigue con el próximo objeto
        } else {
            console.log("Búsqueda finalizada.");
        }
    });
};



const getIDBdata = (mode,msg)=>{
      const IDBtransaction = db.transaction("notes", mode); 
      IDBtransaction.addEventListener("complete", ()=>{
        console.log(msg);
      })
      return IDBtransaction;
}