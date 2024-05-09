  // Obtener referencias a elementos del DOM
  const openModalBtn = document.getElementById("openModalBtn");
  const modal = document.getElementById("myModal");
  const closeModalSpan = document.getElementsByClassName("close")[0];
  const priceSlider = document.getElementById("priceSlider");
  const priceSlider_2 = document.getElementById("priceSlider_2");
  const priceValue = document.getElementById("priceValue");
  const priceAlquiler = document.getElementById("priceAlquier");
  const ventaRadio = document.getElementById("venta");
  const alquilerRadio = document.getElementById("alquiler");

  // Función para abrir el modal
  openModalBtn.onclick = function() {
    modal.style.display = "block";
  }

  // Función para cerrar el modal al hacer clic en la "x"
  closeModalSpan.onclick = function() {
    modal.style.display = "none";
  }

  // Función para cerrar el modal al hacer clic fuera de él
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Función para formatear el número con comas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Event listener para el deslizador de precio de venta
  priceSlider.oninput = function() {
    if (ventaRadio.checked) {
      priceValue.textContent = numberWithCommas(this.value);
    }
  };

  // Event listener para el deslizador de precio de alquiler
  priceSlider_2.oninput = function() {
    if (alquilerRadio.checked) {
      priceAlquiler.textContent = numberWithCommas(this.value);
    }
  };

  // Deshabilitar la barra deslizante de venta si se selecciona alquiler
  ventaRadio.addEventListener("change", function() {
    priceSlider.disabled = !this.checked;
    priceSlider_2.disabled = this.checked;
  });

  // Deshabilitar la barra deslizante de alquiler si se selecciona venta
  alquilerRadio.addEventListener("change", function() {
    priceSlider.disabled = this.checked;
    priceSlider_2.disabled = !this.checked;
  });

