$('.form').on('submit', function (event) {
  event.preventDefault();
  //Validacion de input
  const numeroPokemon = $('.input-form').val();
  if (numeroPokemon < 1 || numeroPokemon > 807)
    return alert('Ingrese numero entre 1 y 807');

  // Solicitud de datos
  $.get(`https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`, function (datos) {
    // console.log(datos);
    $('.pokemon-container').html(
      `<h3 class="h3">${datos.name.toUpperCase()}</h3>
       <img class="" src="${datos.sprites.front_default}" width="200">
       <img class="" src="${datos.sprites.back_default}" width="200">
    <h5 class="h5">${`Peso: ${Math.floor(datos.weight * 0.453592)} [kg]`}</h5>
      `
    );

    console.log(datos);

    //Extrayendo datos para el grafico
    const datosGraficos = [];
    datos.stats.map((stat) =>
      datosGraficos.push({
        y: stat.base_stat,
        label: stat.stat.name.toUpperCase(),
      })
    );

    //Renderizando el grafico
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      theme: 'light2', // "light1", "light2", "dark1", "dark2"
      title: {
        text: 'Estadisticas Pokémon',
      },
      axisY: {
        title: 'PokePoder',
      },
      data: [
        {
          type: 'column',

          dataPoints: datosGraficos,
        },
      ],
    });
    chart.render();

    //Imprime Habilidades principales
    document.querySelector('.habilidades-list').innerHTML = '';
    datos.abilities.map((habilidad) => {
      $.get(habilidad.ability.url, (datos) => {
        $('.habilidades-list').append(`
        <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">${datos.name}</div>
                        ${datos.flavor_text_entries[0].flavor_text}
                    </div>
                </li>
        `);
      });
    });
  });
});
