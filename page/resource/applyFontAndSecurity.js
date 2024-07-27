/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * This page security will disbaled the keys: ctrl + U, ctrl + S 
 * Also restrict dev tool
 * @returns {undefined}
 * Use This function carefully.
 * Its not supported inspect window.
 * Design By Nitesh
 * return windowsSize,orientation 
 * Supported broswer Safari, Firefox, Edge, Chrome, IE, Opera Etc.
 */
var oldDocumentData;
(function () {
    const devtools = {isOpen: false, orientation: undefined};
    const threshold = 200;
    const emitEvent = (isOpen, orientation) => {
        window.dispatchEvent(new CustomEvent("devtoolschange", {detail: {isOpen, orientation}}));
    };
    const main = ({ emitEvents = true } = {}) => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold ? "vertical" : "horizontal";
        if (!(heightThreshold && widthThreshold) && ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
            if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) {
                emitEvent(true, orientation);
            }
            devtools.isOpen = true;
            devtools.orientation = orientation;            
        } else {
            if (devtools.isOpen && emitEvents) {
                emitEvent(false, undefined);
            }
            devtools.isOpen = false;
            devtools.orientation = undefined;
    }
    };
    main({emitEvents: false});
    setInterval(main, 500);
    if (typeof module !== "undefined" && module.exports) {
        module.exports = devtools;
    } else {
        window.devtools = devtools;
    }
})();
var contextPath = "";
var isServiceMode = false;
try {
    contextPath = document.getElementById('applyWebSecurity').value;
    isServiceMode = (isNotEmpty(contextPath) && contextPath);
    if (isServiceMode) {
        document.addEventListener('contextmenu', event => event.preventDefault());
    }

} catch (error) {
    console.log(error);
}

window.addEventListener('devtoolschange', event => {
   event.detail.isOpen ? removeBodyElement() : getAllElements();
   event.detail.orientation ? event.detail.orientation : '';
});


function removeBodyElement() {
    if (isServiceMode) {
        oldDocumentData=document.body.innerHTML;
        document.body.innerHTML = "!Not supporting this operation";
    }
    
}
function getAllElements() {
    if (isServiceMode) {
        document.body.innerHTML=oldDocumentData;
    }
    
}
document.onkeydown = function (e) {
    if ((isServiceMode && e.ctrlKey) &&
            (e.keyCode === 67 ||
                    e.keyCode === 86 ||
                    e.keyCode === 85 ||
                    e.which === 3 ||
                    e.which === 83 ||
                    e.keyCode === 117)) {
        alert('Sorry this action is not allowed');
        return false;
    } else {
        return true;
    }
};
function isNotEmpty(txt) {
    if (txt === undefined) {
        return false;
    }
    if (txt === null || txt === 'null' || txt.toString().trim() === '') {
        return false;
    }
    return  true;
}