
function rewriteAppendChild() {
    console.log('rewriteAppendChild')
    let newAppendChild = Node.prototype.appendChild
    Node.prototype.appendChild = function () {
        if (arguments[0].innerHTML && arguments[0].innerHTML.indexOf('debugger') != -1) {
            arguments[0].innerHTML = ''
        }
        return newAppendChild.apply(this, arguments)
    }
}

function rewriteFunction() {
    console.log('rewriteFunction')
    let newFunction = Function
    Function.prototype.constructor = function () {
        if (arguments[0].indexOf('debugger') != -1) {
            return newFunction('')
        }
        return newFunction(arguments[0])
    }

}

function rewriteSetTimeout() {
    console.log('rewriteSetTimeout')
    let newSetTimeout = setTimeout
    setTimeout = function () {
        if (arguments[0].indexOf('debugger') != -1) {
            return newSetTimeout('')
        }
        return newSetTimeout(arguments[0], arguments[1])
    }
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: rewriteAppendChild
    });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: rewriteFunction
    });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: rewriteSetTimeout
    });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: rewriteSetInterval
    });
});
