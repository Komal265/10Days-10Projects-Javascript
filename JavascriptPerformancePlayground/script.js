const searchInput = document.getElementById("search");
const typingStatus = document.getElementById("typingStatus");
const apiStatus = document.getElementById("apiStatus");

// ✅ added (required for throttle)
const scrollCountEl = document.getElementById("scrollCount");
let scrollCount = 0;

// function handleInput(event) {
//     console.log("function started");

//     console.log("API CALL for: ", event.target.value)
// }

// searchInput.addEventListener("input" , handleInput);

// debounce
function debounce(fn, delay) {
    let timer;

    return function (event) {
        typingStatus.textContent = "🟡 Typing… waiting for debounce";
        apiStatus.textContent = "⏸ API not called yet";

        clearTimeout(timer);

        timer = setTimeout(() => {
            // fn.call(this , event);  // this === input element
            fn.apply(this, [event]);
        }, delay);
    };
}

function fetchResults(event) {
    typingStatus.textContent = "✅ Typing stopped";
    apiStatus.textContent = "🚀 API CALLED for: " + event.target.value;
}

const debouncedSearch = debounce(fetchResults, 1000);
searchInput.addEventListener("input", debouncedSearch);

// bind example
const boundFetch = fetchResults.bind(searchInput);
boundFetch({ target: searchInput });

// throttle
function throttle(fn, limit) {
    let isRunning = false;

    return function () {
        if (isRunning) return;

        isRunning = true;
        fn.call(this);

        setTimeout(() => {
            isRunning = false;
        }, limit);
    };
}

window.addEventListener(
    "scroll",
    throttle(() => {
        scrollCount++;
        scrollCountEl.textContent = scrollCount;
    }, 1000)
);

// call stack, microtask queue, taskqueue
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");

// Synchronous code → runs first (Start, End)

// Microtask queue → Promise callbacks

// Task queue → setTimeout
