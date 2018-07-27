var card_deck = document.getElementById('studios');

create_studio_card = function(studio)
{
  let card =
    `<a id=${studio.id} class="card my-3 bg-dark text-light" href=${studio.url} target="_blank">
      <div class="card-header pb-1" >
        <p class="text-light card-subtitle p-0">Studio</p>
      </div>
      <img class="card-img-top" src=${studio.logo}>
      <div class="card-body p-1 pt-2 d-flex flex-column justify-content-center" >
        <h4 class="my-0 text-light card-title studio-font">${studio.name}</h4>
      </div>
      <div class="card-footer p-0 pt-1 mt-auto">
        <small class="text-muted">Games created by<br>${studio.campers}</small>
      </div>
  </a>`

  card_deck.innerHTML += card;
}

studios.sort( () => Math.random() - 0.5);                  //randomize studios
studios.forEach( (studio) => create_studio_card(studio) ); //create studio cards 



