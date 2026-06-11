const state = {

    currentPage: "page1",

    history: [],

    meeting: "",

    selectedMessenger: ""

};


// ================= TELEGRAM NOTIFICATIONS =================
// ВНИМАНИЕ: это прямой вариант отправки уведомлений в Telegram.
// BOT_TOKEN открыт в коде сайта. Используйте так только временно.
const TELEGRAM_BOT_TOKEN = "8660855957:AAFcILxB19Yn0LMbiJ3qK23A-CCxylO9sVw";
const TELEGRAM_CHAT_ID = "5085129941";


function getButtonLabel(button){

    return button.innerText
        .replace(/\s+/g, " ")
        .trim();

}


function getCurrentPageTitle(){

    const activePage =
        document.querySelector(".page.active");

    if(!activePage){

        return "";

    }

    return activePage.querySelector("h1")?.innerText ||
        activePage.querySelector(".quote")?.innerText ||
        "";

}


function sendTelegramNotification(eventName, details){

    if(!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID){

        return;

    }

    const info = details || {};

    const message = [
        "🔔 Нажатие на сайте",
        "",
        "Кнопка: " + (info.text || ""),
        "Страница: " + state.currentPage,
        "Заголовок: " + getCurrentPageTitle(),
        info.nextPage ? "Переход: " + info.nextPage : "",
        info.meeting ? "Выбор встречи: " + info.meeting : "",
        info.messenger ? "Мессенджер: " + info.messenger : "",
        state.meeting ? "Текущий выбор встречи: " + state.meeting : "",
        state.selectedMessenger ? "Текущий мессенджер: " + state.selectedMessenger : "",
        "Время: " + new Date().toLocaleString("ru-RU"),
        "Ссылка: " + window.location.href
    ]
    .filter(Boolean)
    .join("\n");

    const url =
        "https://api.telegram.org/bot" +
        TELEGRAM_BOT_TOKEN +
        "/sendMessage?chat_id=" +
        encodeURIComponent(TELEGRAM_CHAT_ID) +
        "&text=" +
        encodeURIComponent(message);

    // GET-запрос через Image не требует CORS и обычно работает даже на простом хостинге.
    const img = new Image();
    img.src = url;

}


function trackButtonClick(button){

    sendTelegramNotification(
        "button_click",
        {
            text:getButtonLabel(button),
            nextPage:button.dataset.next || "",
            meeting:button.dataset.meeting || "",
            messenger:button.dataset.messenger || "",
            buttonId:button.id || "",
            buttonClass:button.className || ""
        }
    );

}


function initTelegramButtonTracking(){

    document
        .querySelectorAll("button")
        .forEach(button=>{

            button.addEventListener(
                "click",
                ()=>{
                    trackButtonClick(button);
                },
                true
            );

        });

}

// ==========================================================


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


function resetFirstPage(){

    const envelope =
        document.querySelector(".envelope");

    const openButton =
        document.querySelector(".open-button");

    if(envelope){

        envelope.classList.remove("open");

    }

    if(openButton){

        openButton.classList.remove("hide");

    }

}


function showPage(pageId){

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    const targetPage =
        document.getElementById(pageId);

    if(!targetPage){

        return;

    }

    targetPage.classList.add("active");

    state.currentPage = pageId;

    if(pageId === "page1"){

        resetFirstPage();

    }

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

    // Замените username на реальный Telegram, если он отличается.
    telegram:
    "https://t.me/romankyrlig",

    // Замените номер на реальный WhatsApp в международном формате без +.
    whatsapp:
    "https://wa.me/77000000000?text=" +
        encodeURIComponent("Привет 😊"),

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

    window.location.href =
        messengerLinks[state.selectedMessenger];

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

    initTelegramButtonTracking();

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
