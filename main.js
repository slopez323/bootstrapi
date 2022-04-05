generateDog();

$('#dogGen').on('click', generateDog);

function generateDog(){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(function(httpResponse){
        return httpResponse.json();
    })
    .then(function (data) {
        console.log(data.message)
        $('#dogImg').attr('src',data.message);
    });
}