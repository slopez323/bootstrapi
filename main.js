let dogCount = 0;
let weatherCount = 0;

$('#dogGen').on('click', generateDog);

function generateDog(){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(function(httpResponse){
        return httpResponse.json();
    })
    .then(function (data) {
        $('.dog.carousel-indicators').append(`<button type="button" data-bs-target="#dogCarousel" data-bs-slide-to="${dogCount}" class="dog${dogCount}"></button>
        `);
        $('.dog.carousel-inner').append(`<div class="carousel-item dog${dogCount}"><img src="${data.message}" width="100%" height="800px"></div`);
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
        $('.weather.carousel-indicators').append(`<button type="button" data-bs-target="#weatherCarousel" data-bs-slide-to="${weatherCount}" class="weather${weatherCount}"></button>
        `);
        if(data.message == 'NOT_FOUND'){
            $('.weather.carousel-inner').append(`<div class="carousel-item weather${weatherCount}"><h3>${city.toUpperCase()}</h3><p>No data.</p></div>`);
        } else {
        $('.weather.carousel-inner').append(`<div class="carousel-item weather${weatherCount}"><h3>${city.toUpperCase()}</h3>
        <p>Temperature: ${data.temperature}</p>
        <p>Wind: ${data.wind}</p>
        <p>Description: ${data.description}</p></div>`);
        };
        $(`.weather${weatherCount}`).addClass('active');
        for(let i = 0; i < weatherCount; i++){
            $(`.weather${i}`).removeClass('active');
        };
        weatherCount++;
        $('#cityInput').val('');
    });
};