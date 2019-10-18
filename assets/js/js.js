//intial values 
let buttons = ["cats", "dogs"];

const APIKey = 'vEQyliGF7tOjjUCPmVlRFfY9FNRG2iz0';
const endPoint = 'http://api.giphy.com/v1/gifs/search?api_key=vEQyliGF7tOjjUCPmVlRFfY9FNRG2iz0';


// This is loading all newly created buttons when page re-loads 
function loadButtons() {
    const listButtons = JSON.parse(localStorage.getItem('buttons'));

    localbuttons = listButtons;
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



// This is creating the giphy template 
function createGiphyTemplate(giphy) {

    const images = giphy.images; 

   const template =  `

        <div class="giphy">
            <div class="giphy-image">
                 <img 
                    src="${images.original_still.url}" 
                    data-still="${images.original_still.url}" 
                    data-animate="${images.original.url}" 
                    data-state="still">
                 <i class="fa fa-play img-play"></i>
            </div>
            <div class="giphy-info">
                 <p>Rating: g</p>
                 <p>Posted A Year Ago</p>
            </div>

            <div class="giphy-footer" data-link="${giphy.embed_url}"> 
                 <p>Copy Link <i class="fa fa-link"></i></p>
            </div>
        </div>
        
        `;

        return template; 
}; 


function renderGiphy(giphys) {

    $('.giphy-content').empty(); 

    for (let i = 0; i < giphys.length; i++) {
        const giphy = giphys[i];

        const giphyTemplate = createGiphyTemplate(giphy); 
        $('.giphy-content').append(giphyTemplate); 

    }
}



// This is fetching the searched Giphy 
function fetchGiphy(value) {

    const url = endPoint + '&q=' + value;

    $.ajax({ url })
        .then(function (response) {
            const giphys = response.data;

            renderGiphy(giphys);
            console.log('Giphy:', giphys);
        })
        .catch(function (error) {
            console.log(error);
        });

};



function searchGiphy(event) {
    console.log(`this was clicked`);
    
    event.preventDefault();

    const value = $('#search').val();
    addButtons(value);
    fetchGiphy(value);

    console.log('Value:', value);
};

// This is playing the giphy when clicked 
function imgCardclick() {
   const giphyCard = $(this); 
    
   const img = giphyCard.find('img'); 
   const icon = giphyCard.find('i'); 

   const still = img.attr('data-still'); 
   const animate = img.attr('data-animate'); 
   const state = img.attr('data-state'); 

    if (state === 'still') {
        img.attr({
            src: animate, 
            'data-state': 'animate'
        }); 

        icon.removeClass('img-play'); 

    } else {
        img.attr({
            src: still, 
            'data-state': 'still'
        }); 
        icon.addClass('img-play'); 
    }

}


function clipToClipBoard(value) {
    const tempElement = $('<input>'); 
    $('body').append(tempElement); 

    tempElement.val(value).select(); 
    document.execCommand('copy'); 
    tempElement.remove(); 
}

function copyLink() {

    const link = $(this).attr('data-link'); 
    clipToClipBoard(link); 
}


// When the user clicks on a button, the page will load those giphys 
function searchGiphyButton() {
    const buttonName = $(this).attr('data-name'); 
    const parent = $(this).parent(); 
    
    $('.btn').parent().removeClass('active'); 
    parent.addClass('active'); 

    fetchGiphy(buttonName); 
}



//Events 
$(document).on('click', '.btn-delete', removeButton);
$(document).on("click", '.giphy-image', imgCardclick); 
$(document).on("click", '.giphy-footer', copyLink); 
$(document).on("click", '.btn-search', searchGiphyButton); 


$('#submit-btn').on('click', searchGiphy); 
