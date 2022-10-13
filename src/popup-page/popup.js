// import React, {FC, useCallback, useEffect, useState} from 'react';
// import { createRoot } from 'react-dom/client';

var isExtensionOn = false;
var checkbox = document.getElementById("check");
var popup = document.getElementById("popup");

function setStatus() {
    var checkbox = document.getElementById("check");
    if (checkbox.checked) {
        isExtensionOn = false;
    } else if (checkbox.checked === false) {
        isExtensionOn = true;
        popup.innerHTML = "";
    } else {
        alert("Error");
    }
}


document.addEventListener('DOMContentLoaded', function () {
    
    setStatus();
    if(isExtensionOn) {
        chrome.alarms.create("song", 
            {
                periodInMinutes: 0.1
            });
    }
});

checkbox.addEventListener("change", function () {
    chrome.alarms.clear("song");

    setStatus();
    if(isExtensionOn) {
        chrome.alarms.create("song", 
            {
                periodInMinutes: 0.1
            });
    };
});

chrome.alarms.onAlarm.addListener(function() {
    chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        const currentTabID = tabs.length === 0 ? 0 : tabs[0].id; 
        chrome.tabs.sendMessage(currentTabID, {
            "type": "lyrics",
        }, async response => {
            popup.innerHTML = response;
        });
    });
});






// interface IProps {

// }

// function NewlineText(props:any) {
//     const text = props.text;
//     return text.split('\n').map((str: any) => <p>{str}</p>);
// }

// const checkbox = document.querySelector("input[name=checkbox]")!;

// export const Popup: FC<IProps> = () => {

//     const [content, setContent] = useState('Getting Lyrics...');

//     useEffect(() => {
//         chrome.tabs.query({currentWindow: true, active: true}, tabs => {
//             const currentTabID = tabs.length === 0 ? 0 : tabs[0].id!; 
//             chrome.tabs.sendMessage(currentTabID, {
//                 "type": "lyrics",
//             }, async response => {
//                 setContent(response);
//             });
//         });
//     }, []);

//     useEffect(() => {
//         checkbox.addEventListener('change', (event) => {
//             chrome.tabs.query({currentWindow: true, active: true}, tabs => {
//                 const currentTabID = tabs.length === 0 ? 0 : tabs[0].id!; 
//                 chrome.tabs.sendMessage(currentTabID, {
//                     "type": "status",
//                     "checkbox": event.target,
//                 }, async response => {
//                     if(response === "off")
//                         setContent("off");
//                 });
//             });
//         });
//     }, [checkbox]);
    

//     return (
//         <div className="App">
//             <NewlineText text={content} />
//         </div>
//     );
// }

// const container = document.getElementById('popup');
// const root = createRoot(container!);
// root.render(<Popup />);



