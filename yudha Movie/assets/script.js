  // popover
  $(function () {
      $('[data-toggle="popover"]').popover()
  })
  // function
  function Coba(id) {
      $.ajax({
          url: 'http://omdbapi.com',
          dataType: 'json',
          type: 'get',
          data: {
              'apikey': '7ff7bcba',
              'i': id,
          },
          success: function (movie) {
              if (movie.Response === "True") {

                  $('.' + id).html(movie.Plot)

              }
          }
      });

  }

  // function
  function searchMovie() {
      $('#movie-list').html('');

      $.ajax({
          url: 'http://omdbapi.com',
          type: 'get',
          dataType: 'json',
          data: {
              'apikey': '7ff7bcba',
              's': $('#fakebox-input').val()
          },
          success: function (result) {
              if (result.Response == "True") {
                  let poster = [];
                  let movies = result.Search;
                  $('#movie-list').append(`
                <h6 class="text-primary font-italic mb-2" id="hasil">Search result: </h6> 
                `);
                  $.each(movies, function (i, data) {
                      if (data.Poster == 'N/A') {
                          poster[data.imdbID] = 'https://placehold.co/300x420';
                      } else {
                          poster[data.imdbID] = data.Poster;
                      }
                      $('#movie-list').append(`
                    <div class="row mb-3">
                    <div class="col"  data-id="${data.imdbID}">
                        <img src="${poster[data.imdbID]}" alt="" class="img-fluid float-left" style="max-width:10%;height: auto;">
                        <div class="content">
                            <div class="row">
                                <div class="col-12">
                                    <a href="#" id="detail" class="see-detail" data-id="${data.imdbID}" data-toggle="modal" data-target="#exampleModal"><h5>${data.Title}</h5></a>
                                    
                                   
                                    <p class="mb-0">Tahun Rilis : ${data.Year}</p>
                                    <p class="card-text plot ${data.imdbID}">` + Coba(data
                              .imdbID) +
                          `</p>
                        </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                     `);
                  });

                  $('#search-input').val('');
                  $('.footer').css({
                      'position': 'relative'
                  })

              } else {
                  $('#movie-list').html(`
        <div class="col-12 ">
            <h1 class="text-secondary"><span class="" >Oops!</span> ` + result.Error + `</h1>
        </div>
    `)
              }
          }
      });
  }


  $('#fakebox-input').on('keyup', function (e) {
      if (e.which === 13) {
          searchMovie();
          $('.logo').removeClass('col-6');
          $('.logo').removeClass('myLogo');
          $('.logo').addClass('col-3');
          $('#fakebox').addClass('inputMove');
          // $('.input-search').addClass('col');
          $('hr').removeClass('batas');


      }
  });

  $('#movie-list').on('click', '.see-detail', function () {

      $.ajax({
          url: 'http://omdbapi.com',
          dataType: 'json',
          type: 'get',
          data: {
              'apikey': '7ff7bcba',
              'i': $(this).data('id'),
              'plot': 'full'
          },
          success: function (movie) {
              if (movie.Response === "True") {
                  let banner = [];
                  if (movie.Poster == 'N/A') {
                      banner[movie.Title] = 'https://placehold.co/300x420';
                  } else {
                      banner[movie.Title] = movie.Poster;
                  }
                  $('.modal-body').html(`
    <div class="container-fluid">
        <div class="row">
            <div class="col-4">
                <img src="` + banner[movie.Title] + `" class="img-fluid">
            </div>

            <div class="col-8">
                <ul class="list-group">
                    <li class="list-group-item bg-light"><h3>` + movie.Title + `</h3></li>
                    <li class="list-group-item">Released : ` + movie.Released + `</li>
                    <li class="list-group-item">Genre : ` + movie.Genre + `</li>                 
                    <li class="list-group-item">Director : ` + movie.Director + `</li>                 
                    <li class="list-group-item">Director : ` + movie.Actors +
                      `</li>                 
                    <li class="list-group-item plot-modal" style="height:120px; overflow:auto">Director : ` + movie
                      .Plot + `</li>                 
                </ul>
            </div>
        </div>
    </div>
`);

              }
          }
      });

  });