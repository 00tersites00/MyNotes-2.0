const btn_agregar_note = document.getElementById("btn_addNote");
const ulNotes = document.getElementById("ul-notes");
const panelDeEdicion = document.getElementById("panelEdicion");
const filtroTitulo = document.getElementById("filter-title");
const filtroFavoritos = document.getElementById("filter-favorites");

btn_agregar_note.addEventListener("click", ()=>{
    if (window.innerWidth < 768) {
        document.getElementById("div-side-bar").remove();
    }
    completarPanelControl("newNote");
})

filtroFavoritos.addEventListener("click", ()=>{
    ulNotes.innerHTML = " ";
    dbReadObjectsFavorites();
})

filtroTitulo.addEventListener("click", ()=>{
    ulNotes.innerHTML = " ";
    dbSearchByTitle(document.getElementById("input-search").value);
})

crearLiNota = (id, noteElement)=>{
    const li = document.createElement("li");
    li.className = "row li-note text-light justify-content-between py-3 bg-dark align-items-center px-4 px-md-2";

    // Icono de la izquierda
    const iconoIzq = document.createElement("i");
    if(noteElement.tipo == "Text"){
        iconoIzq.className = "bi bi-justify-left col-1 fs-3";
    } else if(noteElement.tipo == "Tasks"){
        iconoIzq.className = "bi bi-list-task col-1 fs-3";
    }

    // Contenedor del título y la fecha
    const divTexto = document.createElement("div");
    divTexto.className = "d-flex flex-column col-md-9 col-8 px-3";

    const h5 = document.createElement("h5");
    h5.textContent = noteElement.titulo;

    const p = document.createElement("p");
    p.className = "m-0";
    p.textContent = noteElement.fecha;

    // Agregar título y fecha al div contenedor
    divTexto.appendChild(h5);
    divTexto.appendChild(p);

    // Icono de favorito a la derecha
    const iconoFav = document.createElement("i");
    iconoFav.setAttribute("Favorite", noteElement.favorito);

    if(noteElement.favorito){
        iconoFav.className = "";
        iconoFav.classList.add("bi", "bi-star-fill", "fs-3", "btn-favorite", "col-md-2", "d-flex", "justify-content-center", "align-items-center", "col-2");
        iconoFav.setAttribute("favorito", true);
    } else {
        iconoFav.className = "";
        iconoFav.classList.add("bi", "bi-star", "fs-3", "btn-favorite", "col-md-2", "d-flex", "justify-content-center", "align-items-center", "col-2");
        iconoFav.setAttribute("favorito", false);
    }

    iconoFav.addEventListener("click", ()=>{
        if(iconoFav.getAttribute("favorito") == "true"){
            iconoFav.className = "";
            iconoFav.classList.add("bi", "bi-star", "fs-3", "btn-favorite", "col-md-2", "d-flex", "justify-content-center", "align-items-center", "col-2");
            iconoFav.setAttribute("favorito", false);
            noteElement.favorito = false;
            updateNote(noteElement, id);
        } else {
            iconoFav.className = "";
            iconoFav.classList.add("bi", "bi-star-fill", "fs-3", "btn-favorite", "col-md-2", "d-flex", "justify-content-center", "align-items-center", "col-2");
            iconoFav.setAttribute("favorito", true);
            noteElement.favorito = true;
            updateNote(noteElement, id);
        }
    })

    // Agregar elementos al li
    li.appendChild(iconoIzq);
    li.appendChild(divTexto);
    li.appendChild(iconoFav);

    divTexto.addEventListener("click", ()=>{
        if (window.innerWidth < 768) {
            document.getElementById("div-side-bar").remove();
        }
        completarPanelControl("editNote", noteElement, id)
    })

    return li;
}
