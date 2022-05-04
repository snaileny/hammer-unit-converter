function applyOn(array, func, args) {

    for (let element of array) {

        func.apply(element, args);

    }

}

function changeTextContent(text, element) {

    if (!element) {
        //for apply or call
        this.textContent = text;

    } else if (element) {

        element.textContent = text;

    }

}

function changePlaceholder(text, element) {

    if (!element) {
        //for apply or call
        this.placeholder = text;

    } else if (element) {

        element.placeholder = text;

    }

}

function dispatchKeyboardEvent(event, element) {

    if (!element) {
        //for apply or call
        this.dispatchEvent(event);

    } else if (element) {

        element.dispatchEvent(event);

    }

}

export {applyOn, changeTextContent, changePlaceholder, dispatchKeyboardEvent};

