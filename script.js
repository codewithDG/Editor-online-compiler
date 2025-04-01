// output show karna ka liya iFrame ka use karta hai

// let iFrame=document.querySelector("#frame");

// // html ko add karna ka liya ya use karta hia
// iFrame.contentDocument.body.innerHTML="<h1>DEEPAK</h1>";

// // style ko add karna ka liya ya use karta hia
// iFrame.contentDocument.head.innerHTML="<h1>DEEPAK</h1>";

// // script add karna ka liya ya use karta hia
// iFrame.contentWindow.eval('let a=10;let b=10; alert(a+b);');

let iFrame = document.querySelector("#frame");
let allInput = document.querySelectorAll(".left textarea");
let HtmlCode, CssCode, JsCode;

let debounceTimer;

// Debounce function
function debounce(func, delay) {
    return function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    };
}

allInput.forEach((ele, key) => {
    ele.addEventListener("keyup", debounce(() => {
        if (key === 0) {
            HtmlCode = ele.value;
            iFrame.contentDocument.body.innerHTML = HtmlCode; // HTML injection into iframe
        }
        if (key === 1) {
            CssCode = ele.value;
            iFrame.contentDocument.head.innerHTML = `<style>${CssCode}</style>`; // Injecting CSS
        }
        if (key === 2) {
            JsCode = ele.value;
            try {
                iFrame.contentWindow.eval(JsCode); // Executing JavaScript inside the iframe
            } catch (error) {
                console.error("JavaScript execution error:", error); // Handle any JS errors
            }
        }
    }, 1000)); // 500ms delay after the last keyup
});
