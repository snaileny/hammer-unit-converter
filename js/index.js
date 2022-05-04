import UnitSelector from "/js/modules/unitSelector.js"; 
import InputHandler from "/js/modules/inputHandler.js";
import HistoryManager from "/js/modules/historyManager.js";
import Converter from "/js/converter.js";
import {applyOn, changeTextContent, changePlaceholder, dispatchKeyboardEvent} from "/js/helpers.js";

document.addEventListener('DOMContentLoaded', () => {

    const selectedUnit = (() => {

        let _unit = 0; //imperial = 0, metric = 1

        return {

            get get() {
                return _unit;
            },

            setToImperial() {
                _unit = 0; 
            },

            setToMetric() {
                _unit = 1; 
            }

        }

    })();

    const unitSelector = new UnitSelector(selectedUnit);
    const inputHandler = new InputHandler(selectedUnit);
    const historyManager = new HistoryManager(selectedUnit);
    const keyupEvent = new KeyboardEvent("keyup");

    historyManager.updateSaveButtonState();
    historyManager.updateClearButtonState();

    document.addEventListener("click", (e) => {

        unitSelector.highlightSelectorText(e.target.id);

    });

    unitSelector.elements.selector.addEventListener("click", () => {

        unitSelector.highlightSelectedButton();

    });

    unitSelector.elements.selectorButtonImperial.addEventListener("click", () => {

        selectedUnit.setToImperial();
        unitSelector.closeSelectorPopup();
        unitSelector.changeSelectorText("Imperial");
        applyOn(inputHandler.elements.unitLabelArray, changeTextContent, ["Imperial"]);
        applyOn(inputHandler.elements.unitInputArray, changePlaceholder, ["Inches"]);
        applyOn(inputHandler.elements.gridInputArray, dispatchKeyboardEvent, [keyupEvent]);

    });

    unitSelector.elements.selectorButtonMetric.addEventListener("click", () => {

        selectedUnit.setToMetric();
        unitSelector.closeSelectorPopup();
        unitSelector.changeSelectorText("Metric");
        applyOn(inputHandler.elements.unitLabelArray, changeTextContent, ["Metric"]);
        applyOn(inputHandler.elements.unitInputArray, changePlaceholder, ["Centimeters"]);
        applyOn(inputHandler.elements.gridInputArray, dispatchKeyboardEvent, [keyupEvent]);

    });

    inputHandler.elements.inputArray.forEach((input) => {

        input.addEventListener("keyup", (e) => {

            const targetId = e.target.id;
            const userInput = inputHandler.getInputValueById(targetId);
            const result = Converter.convert(userInput, targetId, selectedUnit.get);
            inputHandler.setInputValueById(targetId, result, true);

            //change button state on every key press
            const inputEmpty = inputHandler.allInputsEmpty();
            historyManager.updateSaveButtonState(inputEmpty);

        });

    });

    historyManager.elements.historyButtonSave.addEventListener("click", () => {

        if (!inputHandler.allInputsEmpty()) {

            const userInput = inputHandler.getInputValues();
            historyManager.saveToSessionStorage(userInput);
            historyManager.updateClearButtonState();
            historyManager.updateHistory();
            console.log(JSON.stringify(sessionStorage));

        }

    });

    historyManager.elements.historyButtonClear.addEventListener("click", () => {

        if (!historyManager.sessionStorageEmpty()) {

            historyManager.clearSessionStorage();
            historyManager.updateClearButtonState();
            historyManager.updateHistory();
            console.log(JSON.stringify(sessionStorage));

        }

    });

});