 // Obtiene el modal
 var modal_2 = document.getElementById("myModal_2");

 // Obtiene el botón select de extras
 var selectExtras = document.getElementById("openModalBtn_2");

 // Obtiene el botón de cerrar
 var span = document.getElementsByClassName("close_2")[0];

 // Cuando el usuario hace clic en el botón, abre el modal
 selectExtras.onclick = function() {
   modal_2 .style.display = "block";
   selectExtras.classList.add("open");
 }

 // Cuando el usuario hace clic en <span> (x), cierra el modal
 span.onclick = function() {
   modal_2 .style.display = "none";
   selectExtras.classList.remove("open");
 }

 // Cuando el usuario hace clic fuera del modal, también lo cierra
 window.onclick = function(event) {
   if (event.target == modal_2 ) {
     modal_2 .style.display = "none";
     selectExtras.classList.remove("open");
   }
 }

 // Guarda los extras seleccionados
