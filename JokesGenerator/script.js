const joke = document.querySelector('.joke');
const jokeBtn = document.querySelector('.jokeBtn');

jokeBtn.addEventListener('click' , getJoke);

//get selected joke types
function getSelectedTypes() {
    const checkboxes = document.querySelectorAll('.jokeType')
    let selected = [];
    
    checkboxes.forEach(box => {
        if(box.checked) {
            selected.push(box.value);
        }
    });

    return selected;
}

//fetch joke from API 
async function fetchJoke(types) {
    if (types.length === 0) {
        alert("Please select a joke type") 
        return;
    }
    const url = `https://v2.jokeapi.dev/joke/${types.join(',')}?type=single`;

    try {
        const response = await fetch(url);
        const data = await response.json();

         if (data.error) {
            displayJoke("No joke found for selected category 😢");
            return;
        }
        displayJoke(data.joke)

    } catch (error) {
        displayJoke("Something went wrong")
    }
}

//display joke 
function displayJoke(text) {
    joke.innerText = text;
}

function getJoke() {
    const types = getSelectedTypes();
    fetchJoke(types);
}