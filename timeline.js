const pace = 100;
const dataLink = "https://timeline-5237.restdb.io/rest/timeline-data";

function getData() {   
    fetch(dataLink, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=uf-8",
            "x-apikey": "5dcad81864e7774913b6ebd3",
            "cache-control": "no-cache"
        }
    }).then(result => result.json()).then(res => createInitialTimeline(res));
}

getData();

function createInitialTimeline(dataCircles) {
    
    const initialTimelineMain = Math.floor(dataCircles.length / 2);
    
    dataCircles.forEach((value, index) => {

        let circle = `<div id=${value.year} class="circle">${value.year}</div>`;

        if (index === initialTimelineMain) {
            circle = `<div id=${value.year} class="circle main">${value.year}</div>`;
        } else if (index === initialTimelineMain - 1) {
            circle = `<div id=${value.year} class="circle prev">${value.year}</div>`;
        } else if (index === initialTimelineMain + 1) {
            circle = `<div id=${value.year} class="circle next">${value.year}</div>`;
        }

        $('.timeline_circles').append(circle);

        $('.circle').get(index).style.left = `${index * pace }px`;
        
    });

    $('.timeline_circles').css( { 
        transition: "transform 1s",
        transform:  "translateX(" + -200 + "px)" 
    });
    setTimeout( function() {  $('.timeline_circles').css( { transition: "none" } ) }, 1000 );

}

$(document).on("click", ".circle", function () {
    if($(this).hasClass('main')){
        return;
    }

    const currentValueRaw = $('.timeline_circles').css("transform");
    let lastIndexCommma = currentValueRaw.lastIndexOf(",");
    let newString = currentValueRaw.substring(0, lastIndexCommma);
    let lastIndexComma2 = newString.lastIndexOf(",");
    const currentValue = parseInt(newString.substring(lastIndexComma2 + 1).trim());

    if($(this).hasClass('prev')){
        adjustTimeline(currentValue + 100);
        resetMain(this);
    }

    if($(this).next().hasClass('prev')){
        adjustTimeline(currentValue + 200);
        resetMain(this);
    }

    if($(this).next().next().hasClass('prev')){
        adjustTimeline(currentValue + 300);
        resetMain(this);
    }

    if($(this).hasClass('next')){
        adjustTimeline(currentValue - 100);
        resetMain(this);
    }

    if($(this).prev().hasClass('next')){
        adjustTimeline(currentValue - 200);
        resetMain(this);
    }

    if($(this).prev().prev().hasClass('next')){
        adjustTimeline(currentValue - 300);
        resetMain(this);
    }
});


function adjustTimeline(size){
    $('.timeline_circles').css( { 
        transition: "transform 1s",
        transform:  "translateX(" + size + "px)" 
    });
    setTimeout( function() {  $('.timeline_circles').css( { transition: "none" } ) }, 1000 );
}

function resetMain(newMain) {

    $('.circle').removeClass('main');
    $('.circle').removeClass('prev');
    $('.circle').removeClass('next');

    setTimeout(() => {
        $(newMain).text(newMain.id);
        if($(newMain).next().length > 0){
            $(newMain).next().text(newMain.nextSibling.id);
        }
        if($(newMain).prev().length > 0){
            $(newMain).prev().text(newMain.previousSibling.id);
        }
    }, 300);

    $(newMain).addClass('main');
    $(newMain).next().addClass('next');
    $(newMain).prev().addClass('prev');

}


