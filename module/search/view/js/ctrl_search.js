console.log('entramos en el searchhh js')
function load_type() {
    ajaxPromise(friendlyURL('?module=search&op=search_type'), 'POST', 'JSON')
        .then(function (data) {
          // console.log(data);
            var $searchType = $('.search_type');
            $searchType.empty(); // LIMPIAR
            
            var $select = $('<select>').addClass('type_select_search').attr('name', 'type_select_search');
            $('<option>').attr('value', '').attr('selected', true).attr('hidden', true).text('Selecciona un tipo').appendTo($select);
            var $optgroup = $('<optgroup>').attr('label', 'TIPOS').appendTo($select);
            for (var row in data) {
                $('<option>').attr('value', data[row].tipos).text(data[row].tipos).appendTo($optgroup);
            }
            $select.appendTo($searchType);
            highlightFilters1();
            secundario_del_highlightFilters1();
        })
        .catch(function () {
            // Manejar errores aquí
            // window.location.href = "index.php?modules=exception&op=503&error=fail_load_category&type=503";
        });
}

function load_category(tipo) {
  $('.category_select_search').empty();

  if (tipo == undefined) {
    ajaxPromise(friendlyURL('?module=search&op=search_category_null'), 'POST', 'JSON')
    .then(function (data) {
        var $searchType = $('.search_category');
        $searchType.empty(); // LIMPIAR
        
        var $select = $('<select>').addClass('category_select_search').attr('name', 'category_select_search');
        $('<option>').attr('value', '').attr('selected', true).attr('hidden', true).text('Categorias').appendTo($select);
        var $optgroup = $('<optgroup>').attr('label', 'CATEGORYS').appendTo($select);
        for (var row in data) {
            $('<option>').attr('value', data[row].categorys).text(data[row].categorys).appendTo($optgroup);
        }
        
        $select.appendTo($searchType);
        highlightFilters1();
        secundario_del_highlightFilters1();
    })
    .catch(function () {
        // Manejar errores aquí
        // window.location.href = "index.php?modules=exception&op=503&error=fail_load_category&type=503";
    });
  }else{
    console.log(tipo);
    ajaxPromise(friendlyURL('?module=search&op=search_category'), 'POST', 'JSON', {'tipo': tipo})
    .then(function (data) {
        var $searchType = $('.search_category');
        $searchType.empty(); // LIMPIAR
        
        var $select = $('<select>').addClass('category_select_search').attr('name', 'category_select_search');
        $('<option>').attr('value', '').attr('selected', true).attr('hidden', true).text('Categorias').appendTo($select);
        var $optgroup = $('<optgroup>').attr('label', 'CATEGORYS').appendTo($select);
        for (var row in data) {
            $('<option>').attr('value', data[row].categorys).text(data[row].categorys).appendTo($optgroup);
        }
        
        $select.appendTo($searchType);
        highlightFilters1();
        secundario_del_highlightFilters1();
    })
    .catch(function () {
        // Manejar errores aquí
        // window.location.href = "index.php?modules=exception&op=503&error=fail_load_category&type=503";
    });
  }
}

$(document).on('click', '.search_icon', function () {
    filters_search();
});

function filters_search() {
    var filters_search = [];
    
    // Filtro categorys
    var categorys = $('.category_select_search').val();
    if (categorys) {
        filters_search.push(['categorys', categorys]);
    }

    // Filtro type
    var tipos = $('.type_select_search').val();
    if (tipos) {
        filters_search.push(['tipos', tipos]);
    }
    
    // Search
    var searchValue = $('.search__input').val();
    if (searchValue) {
        filters_search.push(['name_city', searchValue]);
    }
    
    localStorage.setItem('filters_search', JSON.stringify(filters_search));
    
    // RECARGAR
    window.location.href = '?module=shop';
}

$(".search__input").on("keyup", function () {
    autocomplete();
});

function autocomplete() {
  $(document).ready(function () {
      const searchInput = $(".search__input");
      const searchAuto = $("#search_auto");
    
      let cityNames = [];
    
      fetchCityNames();
    
      function fetchCityNames() {
          $.ajax({
              url: "?module=search&op=autocomplete_search",
              dataType: "json",
              success: function (data) {
                  // console.log(data);
                  cityNames = data;
              },
              error: function (jqXHR, textStatus, errorThrown) {
                  console.error("Error filtrando nombres de ciudad:", textStatus, errorThrown);
              }
          });
      }
    
      searchInput.on("keyup", function () {
          const query = $(this).val().toLowerCase().trim();
    
          if (query.length) {
              const filteredCities = cityNames.filter(cityObj => {
                  const cityName = cityObj.name_city;
                  return cityName.toLowerCase().startsWith(query);
              });
    
              searchAuto.empty();
    
              if (filteredCities.length) {
                  const list = $("<ul>").appendTo(searchAuto);
                  filteredCities.forEach(cityObj => {
                      const cityName = cityObj.name_city;
                      const item = $("<li>").text(cityName).appendTo(list);
                      item.on("click", function () {
                          searchInput.val(cityName); 
                          searchAuto.empty();
                      });
                  });
    
                  searchAuto.show();
              } else {
                  searchAuto.hide(); 
              }
          } else {
              searchAuto.hide(); 
          }
      });
    
      $(document).on("click", function (event) {
          if (!$(event.target).closest(".search__container").length) {
              searchAuto.hide();
          }
      });
  });
}

function launch_search() {
  load_type();
  load_category();
  $(document).on('change', '.type_select_search', function () {
      let tipo = $(this).val();
      if (tipo === 0) {
          load_category();
      } else {
          load_category([tipo]); // Pasa tipo como un array
      }
  });
}

function highlightFilters1() {
  var category_select = localStorage.getItem('category_select');
  var type_select = localStorage.getItem('type_select');
  var search_input = localStorage.getItem('search_input');

  if (category_select) {
    $('.category_select_search').val(category_select);
  }

  if (type_select) {
    $('.type_select_search').val(type_select);
  }

  if (search_input) {
    $('.search__input').val(search_input);
  }
}

function secundario_del_highlightFilters1() {
  $('.category_select_search').change(function () {
    localStorage.setItem('category_select', $(this).val());
  });

  $('.type_select_search').change(function () {
    localStorage.setItem('type_select', $(this).val());
  });

  $('.search__input').on('input', function () {
    localStorage.setItem('search_input', $(this).val());
  });
}

$(document).ready(function () {
  launch_search();
  autocomplete();
  highlightFilters1();
  secundario_del_highlightFilters1();
});