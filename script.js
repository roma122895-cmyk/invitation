let selectedMessenger = null;
document.addEventListener('DOMContentLoaded', ()=>{
// ======================
// СОСТОЯНИЕ
// ======================

const state = {

    currentPage: "page1",

    meeting: null,

    history: []

};


// ======================
// ЭЛЕМЕНТЫ
// ======================

const pages = document.querySelectorAll(".page");

const backButton = document.getElementById("backButton");

const progressFill = document.querySelector(".progress-fill");


// ======================
// ПРОГРЕСС
// ======================

const progressMap = {

    page1:10,
    page2:20,
    page3:30,
    page4:40,
    page7:50,
    page5:60,
    page6:75,
    page9:90,
    page10:100

};


// ======================
// ПОКАЗАТЬ СТРАНИЦУ
// ======================

function showPage(pageId, addHistory=true){

    if(addHistory){

        state.history.push(state.currentPage);

    }

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    document
        .getElementById(pageId)
        .classList
        .add("active");

    state.currentPage = pageId;

    updateBackButton();

    updateProgress();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


// ======================
// НАЗАД
// ======================

function historyBack(){

    if(state.history.length===0)
        return;

    let prevPage = state.history.pop();

    showPage(prevPage,false);

}


backButton.addEventListener("click",historyBack);


// ======================
// КНОПКА НАЗАД
// ======================

function updateBackButton(){

    if(

        state.currentPage==="page1" ||

        state.currentPage==="page8" ||

        state.currentPage==="page10"

    ){

        backButton.style.display="none";

    }

    else{

        backButton.style.display="block";

    }

}


// ======================
// ПРОГРЕСС БАР
// ======================

function updateProgress(){

    let value = progressMap[state.currentPage] || 100;

    progressFill.style.width = value + "%";

}
// ======================
// КНОПКИ ПЕРЕХОДОВ
// ======================

document.querySelectorAll("[data-next]").forEach(button => {

    button.addEventListener("click", () => {

        const nextPage = button.dataset.next;
        if(state.currentPage==="page1"){document.querySelector(".envelope").classList.add("open"); setTimeout(()=>showPage(nextPage),800); return;}

        showPage(nextPage);

    });

});


// ======================
// ВЫБОР ВСТРЕЧИ
// ======================

document.querySelectorAll(".meeting-button").forEach(button => {

    button.addEventListener("click", () => {

        state.meeting = button.dataset.meeting;

        updateMeetingText();

        showPage("page6");

    });

});


// ======================
// ТЕКСТ НА PAGE6
// ======================

function updateMeetingText(){

    const text = document.getElementById("meetingText");

    switch(state.meeting){

        case "coffee":

            text.innerHTML =
            "И, кстати, идея выпить вместе кофе мне очень нравится 😊";

            break;


        case "walk":

            text.innerHTML =
            "Кажется, у нас уже появилась идея для первой прогулки 😊";

            break;


        case "icecream":

            text.innerHTML =
            "Мороженое и душевные разговоры звучат очень уютно 😊";

            break;


        case "cafe":

            text.innerHTML =
            "Уютное кафе и хорошая компания — отличный вариант 😊";

            break;


        case "unusual":

            text.innerHTML =
            "Люблю необычные идеи, думаю, нам будет интересно 😊";

            break;


        case "chance":

            text.innerHTML =
            "Иногда самые интересные события происходят случайно 😊";

            break;


        default:

            text.innerHTML =
            "И если ты дочитала до этого места, значит, мне уже немного повезло 😊";

    }

}


// ======================
// МЕССЕНДЖЕРЫ
// ======================

document.querySelectorAll(".messenger-button").forEach(button => {

    button.addEventListener("click", () => {

        selectedMessenger = button.dataset.messenger;

        showPage("page10");

        setTimeout(() => {

            openMessenger(selectedMessenger);

        }, 5000);

    });

});
// СТАРТ

showPage("page1", false);

});
function openMessenger(messenger){

    if(messenger==="telegram"){

        window.open(
            "https://t.me/morgan_124?text=" +
            encodeURIComponent(
                "Привет 😊\n\nКажется, я успешно прошла твой маленький квест.\n\nНу что, продолжим знакомство уже здесь?\n\nИли свой текст)))"
            ),
            "_blank"
        );

    }

    if(messenger==="whatsapp"){

        window.open(
            "https://wa.me/77753468810?text=" +
            encodeURIComponent(
                "Привет 😊\n\nКажется, я успешно прошла твой маленький квест.\n\nНу что, продолжим знакомство уже здесь? \n\nИли свой текст))) "
            ),
            "_blank"
        );

    }

    if(messenger==="instagram"){

        window.open(
            "https://instagram.com/romankyrlig",
            "_blank"
        );

    }

}

document.addEventListener("DOMContentLoaded",()=>{const b=document.getElementById("openNowButton"); if(b){b.addEventListener("click",()=>openMessenger(selectedMessenger));}});
document.addEventListener('DOMContentLoaded',()=>{
const btn=document.querySelector('#page1 [data-next]');
const env=document.querySelector('.envelope');
if(btn&&env){
btn.addEventListener('click',(e)=>{
e.preventDefault();
env.classList.add('open');
setTimeout(()=>showPage('page2'),900);
},{once:true});
}
});

document.addEventListener('DOMContentLoaded',()=>{
const openBtn=document.querySelector('#page1 [data-next]');
const env=document.querySelector('.envelope');
if(openBtn && env){
openBtn.addEventListener('click',(e)=>{
env.classList.add('open');
});
}
});
