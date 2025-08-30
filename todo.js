const addBtn = document.getElementById('add');
const closeKey = document.getElementById('close');
const modalC = document.querySelector('.mo');

closeKey.addEventListener('click', closeModal)
addBtn.addEventListener('click', openModal)


function openModal(){
    modalC.classList.remove('hidden')
}

function closeModal(){
    modalC.classList.add('hidden')
}