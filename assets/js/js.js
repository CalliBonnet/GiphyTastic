//intial values 
let buttons = ['Cats', 'Dogs']; 

// This is loading all newly created buttons when page re-loads 
function loadButtons() {
    const listButtons = JSON.parse(localStorage.getItem('buttons')); 

    buttons = listButtons; 
}; 


// This is dymanically creating btns on the page 
function renderButtons() {

    $('.recent-search').empty();

    for (let i = 0; i < buttons.length; i++) {
        const buttonName = buttons[i];

        const button = `
             <div class="wrap-buttons">
             <button 
                class="btn btn-search"
                data-name="${buttonName}"
             >${buttonName}</button>
             <button
                data-name="${buttonName}"
                data-index="${i}"
                class="btn btn-delete fas fa-times"
             ></button> 
             </div>
        `;

        $('.recent-search').append(button);
    }

    localStorage.setItem('buttons', JSON.stringify(buttons));

}

loadButtons(); 
renderButtons();



// When x is clicked, remove the button 
function removeButton() {
    const buttonIdex = $(this).attr('data-index');

    //this is deleting the btn
    buttons.splice(buttonIdex, 1); 
    renderButtons();
    console.log('Button Index:', buttonIdex); 

}; 


// When the user searches, a btn is created 
function addButtons(value){ 
    buttons.push(value);
    renderButtons();
}; 

function searchGiphy(event){ 
    event.preventDefault();

    const value = $('#search').val();
    addButtons(value); 
}; 
 


//Events 
$(document).on('click', '.btn-delete', removeButton); 
$('#submit-btn').on('click', searchGiphy); 