const state = {

    currentPage: "page1",

    history: [],

    meeting: "",

    selectedMessenger: ""

};


const progressMap = {

    page1:10,
    page2:20,
    page3:30,
    page4:40,
    page5:50,
    page6:60,
    page7:70,
    page8:80,
    page9:90,
    page10:100

};


const pages =
document.querySelectorAll(".page");

const progressFill =
document.querySelector(".progress-fill");

const backButton =
document.getElementById("backButton");


function updateProgress(){

    progressFill.style.width =
        progressMap[state.currentPage] + "%";

}


function updateBackButton(){

    if(state.history.length===0){

        backButton.style.visibility="hidden";

    }
    else{

        backButton.style.visibility="visible";

    }

}


function showPage(pageId){

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    document
        .getElementById(pageId)
        .classList
        .add("active");

    state.currentPage = pageId;

    updateProgress();

    updateBackButton();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


function historyBack(){

    if(state.history.length===0){

        return;

    }

    const previousPage =
        state.history.pop();

    showPage(previousPage);

}
document
.querySelectorAll("[data-next]")
.forEach(button=>{

    button.addEventListener(

        "click",

        ()=>{

            const nextPage =
                button.dataset.next;

            state.history.push(
                state.currentPage
            );

            if(state.currentPage==="page1"){

                const envelope =
                    document.querySelector(".envelope");

                const openButton =
                    document.querySelector(".open-button");

                openButton.classList.add("hide");

                envelope.classList.add("open");

                setTimeout(()=>{

                    showPage(nextPage);

                },1100);

                return;

            }


            showPage(nextPage);

        }

    );

});
const meetingText = {

    coffee:
        "Кажется, чашка кофе была бы отличным началом 😊",

    walk:
        "Прогулки — один из лучших способов узнать друг друга 🌿",

    icecream:
        "Мороженое и разговоры обо всём звучат очень уютно 🍨",

    cafe:
        "Уютное кафе и приятная компания — отличный вариант ☕",

    unusual:
        "Люблю необычные идеи 😊",

    chance:
        "Иногда самые интересные решения принимает случай 🎲"

};


function updateMeetingText(){

    const textElement =
        document.getElementById("meetingText");

    if(!textElement){

        return;

    }

    textElement.innerText =
        meetingText[state.meeting] ||

        "И если ты дочитала до этого места, значит, мне уже немного повезло 😊";

}


document
.querySelectorAll(".meeting-button")
.forEach(button=>{

    button.addEventListener(

        "click",

        ()=>{

            state.meeting =
                button.dataset.meeting;

            updateMeetingText();

        }

    );

});


const messengerLinks = {

    telegram:
    "https://t.me/USERNAME",

    whatsapp:
    "https://wa.me/77000000000?text=Привет😊",

    instagram:
    "https://instagram.com/romankyrlig"

};


let messengerOpened = false;


function openMessenger(){

    if(messengerOpened){

        return;

    }

    if(!state.selectedMessenger){

        return;

    }

    messengerOpened = true;

    window.open(

        messengerLinks[state.selectedMessenger],

        "_blank"

    );

}


document
.querySelectorAll(".messenger-button")
.forEach(button=>{

    button.addEventListener(

        "click",

        ()=>{

            messengerOpened = false;

            state.selectedMessenger =
                button.dataset.messenger;

            state.history.push(
                state.currentPage
            );

            showPage("page10");

            setTimeout(

                ()=>{

                    openMessenger();

                },

                5000

            );

        }

    );

});
const openNowButton =
document.getElementById(
    "openNowButton"
);


if(openNowButton){

    openNowButton.addEventListener(

        "click",

        openMessenger

    );

}


function init(){

    updateProgress();

    updateBackButton();

    showPage("page1");

}


document.addEventListener(

    "DOMContentLoaded",

    init

);


console.log(

    "Invitation v1.6 loaded"

);


backButton.addEventListener(

    "click",

    historyBack

);
