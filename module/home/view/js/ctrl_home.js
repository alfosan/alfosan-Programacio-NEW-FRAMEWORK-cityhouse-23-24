// console.log('ENTRAMOS EN EL CONTROLADOR JS');
function carrusel_principal_custom() {
  var carruselContainer = $('<div class="owl-carousel owl-theme"></div>').appendTo(".carrusel_principal");

  ajaxPromise(friendlyURL('?module=home&op=carrusel_principal_custom'), 'GET', 'JSON')
  .then(function(data) {
          for (row in data) {
              carruselContainer.append(
                  "<div class='item_principal'>" +
                      "<img class= 'custom_img' src='" + data[row].img_custom + "' id='"+ data[row].name_room + "' />" +
                      "<h2>"+  data[row].name_room  + "</h2>" +
                  "</div>"
              );
          }

          carruselContainer.owlCarousel({
              autoplay: true,
              items: 1,
              rewind: true,
              margin: 20,
              responsiveClass: true,
              autoHeight: true,
              autoplayTimeout: 6000,
              smartSpeed: 800,
              nav: true,
          });
      })
      .catch(function() {
          // Manejar el error si es necesario
          // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Category HOME";
      });
}

function carrusel_principal_type() {
  // console.log('Entramos en el Carrusel_Type')

  var carruselContainer = $('<div class="owl-carousel owl-theme"></div>').appendTo(".carrusel_type");

  ajaxPromise(friendlyURL('?module=home&op=carrusel_principal_type'), 'GET', 'JSON')
  .then(function(data) {
      for (row in data) {
              carruselContainer.append(
                  "<div class='item'>" +
                      "<img class= 'type_img' src='" + data[row].type_icon + "' id='"+ data[row].tipos + "' />" +
                      "<h2>"+  data[row].tipos  + "</h2>" +
                  "</div>"
              );
          }

          carruselContainer.owlCarousel({
            autoplay: true,
            rewind: true,
            margin: 20,
            responsiveClass: true,
            autoHeight: true,
            autoplayTimeout: 5000,
            smartSpeed: 800,
            nav: true,
            responsive: {
              0: {
                items: 1
              },
              600: {
                items: 3
              },
              1024: {
                items: 4
              },
              1366: {
                items: 4
              }
            }
        });
    })
    .catch(function() {
        // Manejar el error si es necesario
        // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Category HOME";
    });
}

function carrusel_categorys() {
    // console.log('Entramos en el Carrusel_Categorys')
    var carruselContainer = $('<div class="owl-carousel owl-theme"></div>').appendTo(".carrusel_category");

    ajaxPromise(friendlyURL('?module=home&op=carrusel_categorys'), 'GET', 'JSON')
        .then(function(data) {
            for (row in data) {
                carruselContainer.append(
                    "<div class='item'>" +
                        "<img class= 'categorys_img' src='" + data[row].category_icon + "' id='"+ data[row].categorys +"' />" +
                        "<h2>"+  data[row].categorys  + "</h2>" +
                    "</div>"
                );
            }
            carruselContainer.owlCarousel({
                autoplay: true,
                rewind: true,
                margin: 20,
                responsiveClass: true,
                autoHeight: true,
                autoplayTimeout: 5000,
                smartSpeed: 800,
                nav: true,
                responsive: {
                  0: {
                    items: 1
                  },
                  600: {
                    items: 3
                  },
                  1024: {
                    items: 4
                  },
                  1366: {
                    items: 4
                  }
                }
            });
        })
        .catch(function() {
            // Manejar el error si es necesario
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Category HOME";
        });
}

function carrusel_operations() {
    var carruselContainer = $('<div class="owl-carousel owl-theme"></div>').appendTo(".carrusel_operations");

    ajaxPromise(friendlyURL('?module=home&op=carrusel_operations'), 'GET', 'JSON')
    .then(function(data) {
            for (row in data) {
                carruselContainer.append(
                    "<div class='item'>" +
                        "<img class= 'operation_img' src='" + data[row].img_operation + "' id='"+ data[row].operation_type +  "' />" +
                        "<h2>"+  data[row].operation_type  + "</h2>" +
                    "</div>"
                );
            }

            // Inicializar el carrusel después de agregar todas las imágenes
            carruselContainer.owlCarousel({
                autoplay: true,
                rewind: true,
                margin: 20,
                responsiveClass: true,
                autoHeight: true,
                autoplayTimeout: 5000,
                smartSpeed: 800,
                nav: true,
                responsive: {
                  0: {
                    items: 1
                  },
                  600: {
                    items: 3
                  },
                  1024: {
                    items: 4
                  },
                  1366: {
                    items: 4
                  }
                }
            });
        })
        .catch(function() {
            // Manejar el error si es necesario
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Category HOME";
        });
}

function carrusel_city() {
  // console.log('ENTRAMOS en el carrousel City');
  var carruselContainer = $('<div class="owl-carousel owl-theme"></div>').appendTo(".carrusel_city");

  ajaxPromise(friendlyURL('?module=home&op=carrusel_city'), 'GET', 'JSON')
      .then(function(data) {
          for (row in data) {
              carruselContainer.append(
                  "<div class='item'>" +
                      "<img class= 'city_img' src='" + data[row].img_city + "' id='"+ data[row].name_city + "' />" +
                      "<h2>"+  data[row].name_city  + "</h2>" +
                  "</div>"
              );
          }
          carruselContainer.owlCarousel({
              autoplay: true,
              rewind: true,
              margin: 20,
              responsiveClass: true,
              autoHeight: true,
              autoplayTimeout: 5000,
              smartSpeed: 800,
              nav: true,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 3
                },
                1024: {
                  items: 4
                },
                1366: {
                  items: 4
                }
              }
          });
      })
      .catch(function() {
          // Manejar el error si es necesario
          // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Category HOME";
      });
}

function carrusel_ultimas_busquedas() {
  var carruselContainer = $('<div class="owl-carousel owl-theme"></div>').appendTo(".carrusel_ultima_busqueda");


  var storedIds = localStorage.getItem('ids_viviendas_seleccionadas');
  var idsArray = storedIds ? JSON.parse(storedIds) : [];

  console.log('IDS PILLADOS DEL LOCAL STORAGE', storedIds);

  if (idsArray.length > 0) {
      mostrarCarrusel();
  } else {
      ocultarCarrusel();
  }

  // ajaxPromise('/proyectos/8_MVC_CRUD/module/home/ctrl/ctrl_home.php?op=Process_Carrusel_Ids', 'POST', 'JSON', { ids: idsArray })
  ajaxPromise(friendlyURL('?module=home&op=carrusel_ultimas_busquedas'), 'POST', 'JSON', { ids: idsArray })
      .then(function(data) {
          // Construir el carrusel con los detalles de las viviendas recibidas
          for (row in data) {
              carruselContainer.append(
                  "<div class='item'>" +
                  "<img class= 'recomendations_img' src='" + data[row].img_vivienda + "' id='" + data[row].id_vivienda + "' />" +
                  "<h2>Sigue viendo " + data[row].tipos + " : "+ data[row].price + "€" + "</h2>"+
                  "</div>"
              );
          }

          carruselContainer.owlCarousel({
              autoplay: true,
              rewind: true,
              margin: 20,
              responsiveClass: true,
              autoHeight: true,
              autoplayTimeout: 5000,
              smartSpeed: 800,
              nav: true,
              responsive: {
                  0: {
                      items: 1
                  },
                  600: {
                      items: 3
                  },
                  1024: {
                      items: 4
                  },
                  1366: {
                      items: 4
                  }
              }
          });
      })
      .catch(function(error) {
          console.error(error); // Manejar el error si es necesario
      });

  function mostrarCarrusel() {
      $(".carrusel_ultima_busqueda").show();
  }

  function ocultarCarrusel() {
      $(".carrusel_ultima_busqueda").hide();
  }
}

function carrusel_mas_visitadas() {
  var carruselContainer = $('<div class="owl-carousel owl-theme"></div>').appendTo(".carrusel_mas_visitadas");

  ajaxPromise(friendlyURL('?module=home&op=carrusel_recomendations'), 'GET', 'JSON')
      .then(function(data) {
          for (row in data) {
              carruselContainer.append(
                  "<div class='item'>" +
                      "<img class= 'recomendations_img' src='" + data[row].img_vivienda + "' id='"+ data[row].id_vivienda + "' />" +
                      "<h2>" + data[row].vistas +"<h2>"+
                  "</div>"
              );
          }
          carruselContainer.owlCarousel({
              autoplay: true,
              rewind: true,
              margin: 20,
              responsiveClass: true,
              autoHeight: true,
              autoplayTimeout: 5000,
              smartSpeed: 800,
              nav: true,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 3
                },
                1024: {
                  items: 4
                },
                1366: {
                  items: 4
                }
              }
          });
      })
      .catch(function() {
          // Manejar el error si es necesario
          // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Category HOME";
      });
}

function carrusel_recomendations() {
  var carruselContainer = $('<div class="owl-carousel owl-theme"></div>').appendTo(".carrusel_recomendations");

  ajaxPromise(friendlyURL('?module=home&op=carrusel_recomendations'), 'GET', 'JSON')
      .then(function(data) {
          for (row in data) {
              carruselContainer.append(
                  "<div class='item'>" +
                      "<img class= 'recomendations_img' src='" + data[row].img_vivienda + "' id='"+ data[row].id_vivienda + "' />" +
                      "<h2>"+  "RECOMENDADA"  + "</h2>" +
                  "</div>"
              );
          }
          carruselContainer.owlCarousel({
              autoplay: true,
              rewind: true,
              margin: 20,
              responsiveClass: true,
              autoHeight: true,
              autoplayTimeout: 5000,
              smartSpeed: 800,
              nav: true,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 3
                },
                1024: {
                  items: 4
                },
                1366: {
                  items: 4
                }
              }
          });
      })
      .catch(function() {
          // Manejar el error si es necesario
          // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Category HOME";
      });
}

function load_carrito_view(){
  var tokens = localStorage.getItem('user_tokens');
  if (!tokens) {
      window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
      return;
  }

  window.location.href='http://localhost/proyectos/FRAMEWORK_CITYHOUSE/carrito';

}
function clicks_home() {
  $(document).on("click", 'img.custom_img', function () {
      var filters_home = [["name_room", this.getAttribute('id')]];
      console.log(filters_home);
      localStorage.removeItem('filters_home')
      localStorage.setItem('filters_home', JSON.stringify(filters_home));
      setTimeout(function () {
          window.location.href = '?module=shop&op=view';
      }, 1000);
  });

  $(document).on("click", 'img.categorys_img', function () {
    var filters_home = [["categorys", this.getAttribute('id')]];
    console.log(filters_home);
    localStorage.removeItem('filters_home');
    localStorage.setItem('filters_home', JSON.stringify(filters_home));
    setTimeout(function () {
        window.location.href = '?module=shop&op=view';
    }, 1000);
});


  $(document).on("click", 'img.type_img', function () {
    var filters_home = [["tipos", this.getAttribute('id')]];
      console.log(filters_home);
      localStorage.removeItem('filters_home')
      localStorage.setItem('filters_home', JSON.stringify(filters_home));
      setTimeout(function () {
          window.location.href = '?module=shop&op=view';
      }, 1000);
  });

  $(document).on("click", 'img.operation_img', function () {
    var filters_home = [["operation_type", this.getAttribute('id')]];
    console.log(filters_home);
      localStorage.removeItem('filters_home')
      localStorage.setItem('filters_home', JSON.stringify(filters_home));
      setTimeout(function () {
          window.location.href = '?module=shop&op=view';
      }, 1000);
  });

  $(document).on("click", 'img.city_img', function () {
      var filters_home = [["name_city", this.getAttribute('id')]];
      console.log(filters_home);
      localStorage.removeItem('filters_home')
      localStorage.setItem('filters_home', JSON.stringify(filters_home));
      setTimeout(function () {
          window.location.href = '?module=shop&op=view';
      }, 1000);
  });

  $(document).on("click", 'img.recomendations_img', function () {
      var filters_recomendations = [];
      filters_recomendations.push({ "recomendation": [this.getAttribute('id')] });
      localStorage.removeItem('filters_recomendations')
      localStorage.setItem('filters_recomendations', JSON.stringify(filters_recomendations));
      setTimeout(function () {
          window.location.href = '?module=shop&op=view';
      }, 1000);
  });
}

$(document).ready(function() {
  carrusel_principal_custom();
    carrusel_principal_type();
    carrusel_categorys();
    carrusel_operations();
    carrusel_city();
    carrusel_recomendations();
    carrusel_ultimas_busquedas();
    carrusel_mas_visitadas();
    clicks_home();
});

/* console.log('Carga los clicks');
  $(document).on("click",'div.carrusel_principal', function (){
    var filters_home = [];
    filters_home.push({"tipo":[this.getAttribute('id')]});
    localStorage.removeItem('filters_home')
    localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
      setTimeout(function(){ 
        window.location.href = 'index.php?page=controller_shop&op=list';
      }, 2000);
  });*/
  /*
  $(document).on("click",'div.carrusel_operations', function (){
    var filters_home = [];
    filters_home.push({"operation":[this.getAttribute('id')]});
    localStorage.removeItem('filters_home')
    localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
      setTimeout(function(){ 
        window.location.href = 'index.php?page=controller_shop&op=list';
      }, 2000);  
  });

  $(document).on("click",'div.carrusel_city', function (){
    var filters_home = [];
    filters_home.push({"city":[this.getAttribute('id')]});
    localStorage.removeItem('filters_home')
    localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
      setTimeout(function(){ 
        window.location.href = 'index.php?page=controller_shop&op=list';
      }, 2000);  
  });*/