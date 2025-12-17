const joke = document.querySelector('.joke')
const jokeBtn = document.querySelector('.jokeBtn')

jokeBtn.addEventListener('click', getJoke);

//get slected jokes types 
function getSelectedTypes() {
    const checkboxes = document.querySelectorAll('.jokeType')
    let selected = [];

    checkboxes.forEach(box => {
    if(box.checked) {
        selected.push(box.value);
    }
});

// Handle "any"
if (selected.includes("Any")) {
    return ["Any"];
}
    return selected;
}
 
//fetch jokes using promise
function fetchJoke(types) {
    if(types.length === 0) {
        alert("please select a joke type");
        return;
    }

    const url = `https://v2.jokeapi.dev/joke/${types.join(',')}?type=single`

    fetch(url)
        .then(response => response.json()) // promise 1
        .then(data => {
            if(data.error) {
                displayJoke("no joke found for selected category");
                return;
            }
            displayJoke(data.joke); 
        })

        .catch(error => {
             displayJoke("something went wrong")
             console.log(error);
        });

}

 function displayJoke(text) {
            joke.innerText = text;
        }

        function getJoke() {
            const types = getSelectedTypes();
            fetchJoke(types);
        }

