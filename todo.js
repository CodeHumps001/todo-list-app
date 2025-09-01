const addBtn = document.getElementById('add');
const closeKey = document.getElementById('close');
const modalC = document.querySelector('.mo');
let todoContainer = document.getElementById('todo-container')
const subBtn = document.getElementById('sub');
let errorMessage = document.getElementById('error');
let errorDiv = document.getElementById('error-div')
const modeToggle = document.getElementById('mode-container')
const modeElement = document.getElementById("toggle-mode")


modeToggle.addEventListener('click', toggleMode)

function toggleMode() {
    if (modeToggle) {
        modeToggle.classList.toggle('active'); // just one toggle

        document.body.classList.toggle('light-mode');

        if (modeToggle.classList.contains('active')) {
            modeElement.innerHTML = `<i class='bx bx-moon'></i>`;
        } else {
            modeElement.innerHTML = `<i class='bx bx-night-light'></i>`;
        }
    }
}


let todoList = [];

  // working with local storage 

// saving tolist to local storage 
  function saveTodo(){
    localStorage.setItem('mylist', JSON.stringify(todoList))
  }

  //loading todo
  function loadTodo(){
    let storesTodo = localStorage.getItem("mylist")
    if(storesTodo){
        todoList = JSON.parse(storesTodo);
    }
    displayTodo;
  }

//add todo
subBtn.addEventListener('click', addTodo)
function addTodo(){
  
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;

    if(title === '' || description === "" || date === ''){
        let message = "An Error occured try to fill in all the fields!"
        errorMessage.innerHTML = `${message}`;
        errorDiv.classList.remove('hidden')

    }else{

       let todo = { 
        title, 
        description, 
        date, 
        completed: false 
    };
    
        todoList.push(todo);
        saveTodo() 
        displayTodo();
         modalC.classList.add('hidden')
     
    }

}

function displayTodo(){

    let todoHTML = ``;
    for(let i=0 ; i < todoList.length ; i++){

        todoHTML += `

                <div class="todo-card todocard" id="todo-card">
            <h2 class="todo-header">${todoList[i].title}</h2>
            <p class="todo-description">${todoList[i].description}</p>
            <p class="created-date">${todoList[i].date}</p>
            <div class="btn">
                <button class="delete dlt" data-index="${i}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="del-icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
Delete</button>
                <button class="complete cmp" complete-index="${i}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="com-icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
</svg>
Complete</button>
            </div>

        </div>            

        `
    }

    todoContainer.innerHTML = todoHTML;
    selectOption()
    deleteTodo();
    completeTodo();
    

   
}

//toggle modal
closeKey.addEventListener('click', closeModal)
addBtn.addEventListener('click', openModal)


function openModal(){
    modalC.classList.remove('hidden')
}

function closeModal(){
    modalC.classList.add('hidden')
}

// crud operations
// delete

function deleteTodo(){
     
    let deleteKey = document.querySelectorAll('.dlt')

    deleteKey.forEach((key) =>{
 
        key.addEventListener('click', ()=> {
            let index = key.getAttribute('data-index');
            todoList.splice(index, 1)
            saveTodo();
            displayTodo();
        })
        
    })
}

// complete task

function completeTodo(){
    let completeKey = document.querySelectorAll('.cmp')
    let todoCard = document.querySelectorAll('.todocard')

    completeKey.forEach((key) =>{
        key.addEventListener('click' , ()=>{
            let index = key.getAttribute('complete-index');
           
            todoCard.forEach((card, cindex) =>{
                cindex = index
                todoCard[cindex].classList.add('completed');
                completeKey[index].innerHTML = "completed";
                
            })
            
           
            // ✅ delete card after 10s
               setTimeout(() => {
                   todoList.splice(index, 1); // remove from array
                   saveTodo();              // save update
                   displayTodo();            // re-render UI
               }, 10000)
        })
         
    })
}



window.addEventListener('DOMContentLoaded', loadTodo);

let selectElement = document.getElementById("select-case");

function selectOption() {
    const todoCards = document.querySelectorAll('.todocard');

    todoCards.forEach((card) => {
        // remove any old text-transform classes first
        card.classList.remove('lowercase', 'uppercase', 'capitalize');

        if (selectElement.value === "lowercase") {
            console.log("lower");
            card.classList.add('lowercase');
        } else if (selectElement.value === "uppercase") {
            console.log("upper");
            card.classList.add('uppercase');
        } else {
            console.log("cap");
            card.classList.add('capitalize');
        }
    });
}

selectElement.addEventListener('change', selectOption);

