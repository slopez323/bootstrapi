let dogCount = 0;

$('#dogGen').on('click', generateDog);

function generateDog(){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(function(httpResponse){
        return httpResponse.json();
    })
    .then(function (data) {
        $('.carousel-indicators').append(`<button type="button" data-bs-target="#dogCarousel" data-bs-slide-to="${dogCount}" class="dog${dogCount}"></button>
        `);
        $('.carousel-inner').append(`<div class="carousel-item dog${dogCount}"><img src="${data.message}" width="100%" height="800px"></div`);
        $(`.dog${dogCount}`).addClass('active');
        for(let i = 0; i < dogCount; i++){
            $(`.dog${i}`).removeClass('active');
        };
        dogCount++;
    });
}

$('#weather').on('submit', function(event){
    event.preventDefault();
    getWeather($('#cityInput').val());
});

function getWeather(city){
    fetch(`https://goweather.herokuapp.com/weather/${city}`)
    .then(function(httpResponse){
        return httpResponse.json();
    })
    .then(function(data){
        if(data.message == 'NOT_FOUND'){
            $('#cityTitle').text('CITY NOT FOUND');
            $('#temp').text('');
            $('#wind').text('');
            $('#desc').text('');
            return;
        };
        $('#cityTitle').text(city.toUpperCase());
        $('#temp').text(`Temperature: ${data.temperature}`);
        $('#wind').text(`Wind: ${data.wind}`);
        $('#desc').text(`Description: ${data.description}`);
        $('#cityInput').val('');
    });
};