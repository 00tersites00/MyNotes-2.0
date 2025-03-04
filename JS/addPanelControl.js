
const completarPanelControl = (type, note_element, id)=>{
    panelDeEdicion.innerHTML = " ";

    const divPrincipal = document.createElement("div");
    divPrincipal.className = "d-flex flex-column ";

    const controlBar = document.createElement("ul");
    controlBar.className = "row justify-content-center py-4 gap-3 control-bar list-unstyled";

    const liSelect = document.createElement("li");
    liSelect.className = "col-md-3 col-6";

    const select = document.createElement("select");
    select.className = "form-control btn btn-outline-light select-tipoNota input-panel";

    const opciones = [" ", "Text", "Tasks"];
    opciones.forEach(valor => {
        const option = document.createElement("option");
        option.value = valor;
        option.textContent = valor === " " ? "- Seleccione -" : valor;
        select.appendChild(option);
    });

    liSelect.appendChild(select);
    controlBar.appendChild(liSelect);

    const liSave = document.createElement("li");
    liSave.className = "col-md-2 col-5";

    const btnSave = document.createElement("button");
    btnSave.type = "button";
    btnSave.className = "btn btn-primary text-light w-100 py-1 input-panel";
    btnSave.textContent = "Save";

    liSave.appendChild(btnSave);
    controlBar.appendChild(liSave);

    const liDelete = document.createElement("li");
    liDelete.className = "col-md-3 col-6";

    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.className = "btn btn-danger text-light w-100 d-flex justify-content-between px-4 py-1 input-panel";
    btnDelete.innerHTML = `Delete <i class="bi bi-trash-fill"></i>`;

    liDelete.appendChild(btnDelete);
    controlBar.appendChild(liDelete);

    divPrincipal.appendChild(controlBar);

    const divInputs = document.createElement("div");
    divInputs.className = "d-flex flex-column py-2 gap-3 align-items-center container-inputContenido px-3 w-100";

    const inputTitulo = document.createElement("input");
    inputTitulo.type = "text";
    inputTitulo.className = "bg-dark input-tituloNota fs-3 text-light w-100 px-2";
    inputTitulo.placeholder = "Titulo del note";

    divInputs.appendChild(inputTitulo);

    if(type == "editNote"){
        inputTitulo.value = note_element.titulo;
        if (note_element.tipo == "Tasks"){
            select.value = "Tasks";

            const button = document.createElement('button');
            button.classList.add('btn', 'btn-outline-light', "mt-2");
            button.id = 'btn-addTask';

            const icon = document.createElement('i');
            icon.classList.add('bi', 'bi-plus-lg');

            const ul = document.createElement('ul');
            ul.classList.add('w-100', 'px-2', 'd-flex', 'gap-3', 'flex-column', 'ul-tasks', "py-2");
            ul.id = "ul-tasks";

            button.appendChild(icon);
            divInputs.appendChild(button);
            divInputs.appendChild(ul);

            ul.innerHTML = "";

            note_element.contenido.forEach(tarea => {
                const li = document.createElement('li');
                li.classList.add('row', 'text-light', 'justify-content-between', 'align-items-center', 'gap-1', 'liTask');
        
                // Crear icono de check o square
                const iconSquare = document.createElement('i');
                iconSquare.classList.add('bi', tarea.estado ? 'bi-check-square' : 'bi-square', 'col-1', 'fs-3', 'icon-task');
                iconSquare.setAttribute("activo", tarea.estado.toString());
        
                // Evento para cambiar estado
                iconSquare.addEventListener("click", () => {
                    if (iconSquare.getAttribute("activo") === "false") {
                        iconSquare.className = "bi bi-check-square col-md-1 fs-3 icon-task";
                        iconSquare.setAttribute("activo", "true");
                    } else {
                        iconSquare.className = "bi bi-square col-md-1 fs-3 icon-task";
                        iconSquare.setAttribute("activo", "false");
                    }
                });
        
                // Crear input con el título de la tarea
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = 'Task';
                input.value = tarea.tituloTask; // Asigna el valor del objeto
                input.classList.add('col-md-9', 'm-0', 'input-text-task', 'bg-dark', 'fs-5', 'text-light', 'py-1', "col-8");
        
                // Crear icono de eliminar
                const iconTrash = document.createElement('i');
                iconTrash.classList.add('bi', 'bi-trash3-fill', 'fs-3', 'col-md-1', 'ml-2', 'icon-task', "col-2");
        
                // Evento para eliminar tarea
                iconTrash.addEventListener("click", () => {
                    li.remove();
                });
        
                // Agregar elementos al li
                li.appendChild(iconSquare);
                li.appendChild(input);
                li.appendChild(iconTrash);
        
                // Agregar li a la lista ul
                ul.appendChild(li);
            });
        } else if (note_element.tipo == "Text"){
            select.value = "Text";

            const textarea = document.createElement("textarea");
            textarea.className = "bg-dark textarea-contenido text-light p-2 w-100";
            textarea.id = "textarea-note";
            textarea.placeholder = "Descripcion de la nota";
            textarea.value = note_element.contenido;

            divInputs.appendChild(textarea);
        }
    }

    select.addEventListener("change", ()=>{
        while (divInputs.children.length > 1) {
            divInputs.removeChild(divInputs.lastChild);
        }    

        if(select.value == "Text"){
            const textarea = document.createElement("textarea");
            textarea.className = "bg-dark textarea-contenido text-light p-2 w-100";
            textarea.id = "textarea-note";
            textarea.placeholder = "Descripcion de la nota";
    
            divInputs.appendChild(textarea);
        } else if(select.value == "Tasks"){
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-outline-light', "mt-2");
            button.id = 'btn-addTask';

            // Crear el icono <i> dentro del botón
            const icon = document.createElement('i');
            icon.classList.add('bi', 'bi-plus-lg');

            const ul = document.createElement('ul');
            ul.classList.add('w-100', 'px-2', 'd-flex', 'gap-3', 'flex-column', 'ul-tasks', "py-2");
            ul.id = "ul-tasks";

            // Agregar el icono al botón
            button.appendChild(icon);

            button.addEventListener("click", ()=>{
                let ulTasks = document.getElementById("ul-tasks");

                const li = document.createElement('li');
                li.classList.add('row', 'text-light', 'justify-content-between', 'align-items-center', 'gap-1', "liTask");

                const iconSquare = document.createElement('i');
                iconSquare.classList.add('bi', 'bi-square', 'col-md-1', 'fs-3', "icon-task");
                iconSquare.setAttribute("activo", "false");
                
                iconSquare.addEventListener("click", ()=>{
                    if(iconSquare.getAttribute("activo") == "false"){
                        iconSquare.className = "";
                        iconSquare.classList.add('bi', 'bi-check-square', 'col-md-1', 'fs-3', "icon-task");
                        iconSquare.setAttribute("activo", "true");
                    } else if(iconSquare.getAttribute("activo") == "true"){
                        iconSquare.className = "";
                        iconSquare.classList.add('bi', 'bi-square', 'col-md-1', 'fs-3', "icon-task");
                        iconSquare.setAttribute("activo", "false");
                    }
                })

                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = 'Task';
                input.classList.add('col-md-9', 'm-0', 'input-text-task', 'bg-dark', 'fs-5', 'text-light', 'py-1');

                const iconTrash = document.createElement('i');
                iconTrash.classList.add('bi', 'bi-trash3-fill', 'fs-3', 'col-md-1', 'ml-2', "icon-task");

                iconTrash.addEventListener("click", ()=>{
                    event.target.closest("li").remove();
                });

                li.appendChild(iconSquare);
                li.appendChild(input);
                li.appendChild(iconTrash);

                ulTasks.appendChild(li);
            })

            divInputs.appendChild(button);
            divInputs.appendChild(ul);
        }

        
    })

    btnSave.addEventListener("click", (e)=>{
        e.preventDefault();
        let object_note = {};
        const fechaActual = new Date();
        const dia = fechaActual.getDate();  // Obtiene el día
        const mes = fechaActual.getMonth() + 1;  // Obtiene el mes (el índice comienza en 0, así que sumamos 1)
        const año = fechaActual.getFullYear();  // Obtiene el año
        const fechaFormateada = `${dia}/${mes}/${año}`;

        if(select.value == "Text"){
            let textarea = document.getElementById("textarea-note");
            object_note = {
                titulo: inputTitulo.value,
                tipo: "Text",
                contenido: textarea.value,
                favorito: false,
                fecha: fechaFormateada
            };
        }else if(select.value == "Tasks"){
            const tareas = [];

            document.querySelectorAll('.liTask').forEach(li => {
                const input = li.querySelector('.input-text-task'); // Obtiene el input de la tarea
                const icono = li.querySelector('i'); // Obtiene el icono de la tarea
        
                const tarea = {
                    tituloTask: input.value.trim(), // Guarda el valor del input
                    estado: icono.classList.contains('bi-check-square') // Si tiene 'bi-check-square' es true, sino false
                };
        
                tareas.push(tarea);
            });
            
            object_note = {
                titulo: inputTitulo.value,
                tipo: "Tasks",
                contenido: tareas,
                favorito: false,
                fecha: fechaFormateada
            };
        }

        if (type == "newNote"){
            console.log("llego aqui");
            addObjectNote(object_note); // Añadir ese objeto a la base de datos
        } else if (type == "editNote"){
            updateNote(object_note, id);
        }

        location.reload();
    })

    btnDelete.addEventListener("click", ()=>{
        deleteObject(id);
        location.reload();

    })

    divPrincipal.appendChild(divInputs);
    panelDeEdicion.appendChild(divPrincipal);
}
