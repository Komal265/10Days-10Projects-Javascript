function createClosure() {
    let count = 0; //private number
    
    return {
        increase() {
            count++;
            return count
        },

        decrease() {
            count--;
            return count
        },

        reset() {
            count = 0;
            return count
        },
        getValue() {
            return count
        }
    }
}

let counter = createClosure();

let increase = document.querySelector('.increase');
let decrease = document.querySelector('.decrease');
let reset = document.querySelector('.reset');
let save = document.querySelector('.save');

let number = document.querySelector('.number');
let numberSave = document.querySelector('.number-save');

increase.addEventListener('click',() => {
    number.textContent = counter.increase()
});
decrease.addEventListener('click',() => {
    number.textContent = counter.decrease()
});
reset.addEventListener('click',() => {
    number.textContent = counter.reset()
});

save.addEventListener('click', ()=> {
    let span = document.createElement('span');
    span.textContent = counter.getValue();
    numberSave.appendChild(span)
});