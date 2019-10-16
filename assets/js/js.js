console.log($)

//intial values 
let buttons = ['Cats', 'Dogs'];

const APIKey = 'vEQyliGF7tOjjUCPmVlRFfY9FNRG2iz0';
const endPoint = 'http://api.giphy.com/v1/gifs/search?api_key=vEQyliGF7tOjjUCPmVlRFfY9FNRG2iz0';


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
function addButtons(value) {
    buttons.push(value);
    renderButtons();
};




function renderGiphy(giphys) {

    for (let i = 0; i < giphys.length; i++) {
        const giphy = giphys[i];

        const images = giphy.images; 

        // This is creating what the giphys look like on the screen 
        const giphyTemplate = `

        <div class="giphy">
            <div class="giphy-image">
                 <img 
                    src="${images.original_still.url}" 
                    data-still="https://media0.giphy.com/media/eYilisUwipOEM/giphy_s.gif" 
                    data-animate="https://media0.giphy.com/media/eYilisUwipOEM/giphy.gif" 
                    data-state="still">
                 <i class="fa fa-play img-play"></i>
            </div>
            <div class="giphy-info">
                 <p>Rating: g</p>
                 <p>Posted A Year Ago</p>
            </div>

            <div class="giphy-footer" data-link="https://giphy.com/embed/eYilisUwipOEM"> 
                 <p>Copy Link <i class="fa fa-link"></i></p>
            </div>
        </div>
        
        `;

    }
}


// This is fetching the searched Giphy 
function fetchGiphy(value) {

    const url = endPoint + '&q=' + value;

    $.ajax({ url })
        .then(function (response) {
            const giphys = response.data;

            renderGiphy(giphys);
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });

};





function searchGiphy(event) {
    event.preventDefault();

    const value = $('#search').val();
    addButtons(value);
    fetchGiphy(value);

    console.log('Value:', value);
};



//Events 
$(document).on('click', '.btn-delete', removeButton);
$('#submit-btn').on('click', searchGiphy); 