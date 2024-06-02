console.log('ENTRAMOS EN EL CONTROLADOR JS DE CARROUSEl');

function load_carrito(){
  var tokens = localStorage.getItem('user_tokens');
  if (!tokens) {
      window.location.href = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/login';
      return;
  }

  $.ajax({
      url: friendlyURL('?module=shop&op=add_to_carrito'),
      type: 'GET',
      dataType: 'json',
      data: {
          
      },
      success: function(response) {
          console.log(response);
          // if () {
             
          // } else {
            
          // }

      },
      error: function(xhr, status, error) {
          console.error(xhr.responseText);
      }
  });

}
$(document).ready(function() {
  load_carrito();

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