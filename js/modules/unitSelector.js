export default class UnitSelector {

    constructor(selectedUnit) {

        this.selectedUnit = selectedUnit;

    }

    elements = {

        selectorButtonImperial: document.querySelector("#unit-imperial"),
        selectorButtonMetric: document.querySelector("#unit-metric"),
        selectorButtonArray: document.querySelectorAll(".selector-button"),
        selector: document.querySelector(".unit-select-detail"),
        summary: document.querySelector(".unit-select-summary"),
        selectorText: document.querySelector(".unit-select-summary-text")

    } 

    closeSelectorPopup() {

        this.elements.selector.removeAttribute("open");

    }

    changeSelectorText(text) {

        this.elements.selectorText.textContent = text;

    }

    highlightSelectorText(id) {

        if (id === this.elements.selectorButtonImperial.id || id === this.elements.selectorButtonMetric.id) {
            
            this.elements.selectorText.setAttribute("style", "background: rgb(149, 136, 49);");

        } else {

            this.elements.selectorText.removeAttribute("style");

        }

    }

    highlightSelectedButton() {

        if (this.selectedUnit.get === 0) {

            this.elements.selectorButtonMetric.parentElement.removeAttribute("style");
            this.elements.selectorButtonImperial.parentElement.setAttribute("style", "background: rgb(149, 136, 49);");

        } else {

            this.elements.selectorButtonImperial.parentElement.removeAttribute("style");
            this.elements.selectorButtonMetric.parentElement.setAttribute("style", "background: rgb(149, 136, 49);");

        }

    }

}