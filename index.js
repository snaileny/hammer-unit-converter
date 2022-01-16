
(function() {    
        
let selectedUnit = 0;

function uiManager() {

    const labelList = document.querySelectorAll("label");
    const elementsWithLabel = document.querySelectorAll(".with-label");
    const inputList = document.querySelectorAll("input[type=number]");
    let historyElementList = document.querySelectorAll("li:not(.popup-list-element)");

    const saveButton = document.querySelector("#save-history");
    const clearButton = document.querySelector("#clear-history");
    const selectorText = document.querySelector("#btn-txt");
    const unitSelectLabel = document.querySelector(".unit-select-label");
    const historyLabel = document.querySelector(".history-label")
    
    elementsWithLabel.forEach(function(elem) {

        elem.addEventListener("click", function(e) {

            let targetId = e.target.id;
            labelList.forEach(function(label) {

                if (label.htmlFor === targetId) {
    
                    label.setAttribute("style", "color: rgb(196, 181, 80);");
    
                } else if (targetId === selectorText.id) {

                    label.removeAttribute("style");
                    unitSelectLabel.setAttribute("style", "color: rgb(196, 181, 80);");

                } else if (targetId === "clear-history") {

                    label.removeAttribute("style");
                    historyLabel.setAttribute("style", "color: rgb(196, 181, 80);");          

                } else {

                    label.removeAttribute("style");
                    selectorText.removeAttribute("style");

                }

            });
    
        });

    });

    inputList.forEach(function(input) {

        saveButton.classList.add("disabled");

        input.addEventListener("keyup", function() {

            if (input.value.length === 0) {

                saveButton.classList.add("disabled");
    
            } else {
    
                saveButton.classList.remove("disabled");
    
            }

        });

    });

    clearButton.classList.add("disabled")
    saveButton.addEventListener("click", function() {

        if(![...saveButton.classList].includes("disabled")) {

            clearButton.classList.remove("disabled");

            clearButton.addEventListener("click", function() {

                historyElementList = document.querySelectorAll("li:not(.popup-list-element)");

                if(historyElementList.length === 0) {

                    clearButton.classList.add("disabled"); 

                }

            });

        } else {

            clearButton.classList.add("disabled");

        }

    });

}

function unitSelector() {

    const selector = document.querySelector("#unit-select");
    const selectorText = document.querySelector("#btn-txt");
    const selectorPopup = document.querySelector(".unit-select-popup");
    const selectorUnitImperial = document.querySelector("#unit-imperial");
    const selectorUnitMetric = document.querySelector("#unit-metric");

    const labelList = document.querySelectorAll(".imperial-metric");
    const outputList = document.querySelectorAll(".output");
    const inputList = document.querySelectorAll("input[type=number]");

    const keyupEvent = new KeyboardEvent("keyup");

    document.addEventListener("click", function(e) {

        let targetId = e.target.id;

        if (targetId === selector.id || targetId === selectorText.id) {

            if (selectorPopup.style.visibility === "visible") {
            
                selectorPopup.setAttribute("style", "visibility: hidden;");
                selectorText.removeAttribute("style");
    
            } else {
    
                selectorPopup.setAttribute("style", "visibility: visible;");
                selectorText.setAttribute("style", "background: rgb(149, 136, 49);");
                
    
                switch(selectedUnit) {
    
                    case 0:
                        selectorUnitImperial.setAttribute("style", "background: rgb(149, 136, 49);");
                        selectorUnitMetric.removeAttribute("style");
                        break;
                
                    case 1:
                        selectorUnitMetric.setAttribute("style", "background: rgb(149, 136, 49);");
                        selectorUnitImperial.removeAttribute("style");
                        break;
        
                    default:
                        selectorUnitImperial.setAttribute("style", "background: rgb(149, 136, 49);");
                        selectorUnitMetric.removeAttribute("style");
                
                }
    
            }

        } else {

            selectorPopup.setAttribute("style", "visibility: hidden;");

        }

    });

    selectorUnitImperial.addEventListener("click", function() {

        selectedUnit = 0;

        selector.value = "imperial";
        selectorText.innerText = "Imperial";

        outputList.forEach(function(output) {

            output.placeholder = "Inches"

        })

        labelList.forEach(function(label) {

            label.innerText = "Imperial";

        });

        inputList.forEach(function(input) {

            input.dispatchEvent(keyupEvent);

        }); 

        selectorPopup.setAttribute("style", "visibility: hidden;");

    });

    selectorUnitMetric.addEventListener("click", function() {

        selectedUnit = 1;

        selector.value = "Metric";
        selectorText.innerText = "Metric";

        outputList.forEach(function(output) {

            output.placeholder = "Centimeters"

        });

        labelList.forEach(function(label) {

            label.innerText = "Metric";

        });

        inputList.forEach(function(input) {

            input.dispatchEvent(keyupEvent);

        });

        selectorPopup.setAttribute("style", "visibility: hidden;");

    });

}

function calculateUnits(userInput, type) {

    let unit_output = 1;

    if(selectedUnit === 0) {

        switch(type) {

            case 1: //map scale
                unit_output = userInput * 0.75;
                return Math.round(unit_output);
            
            case 3: //entity scale
                unit_output = userInput * 1;
                return Math.round(unit_output);
            
            case 5: //skybox scale
                unit_output = userInput * 12;
                return Math.round(unit_output);
            
            default:
                return 0;
    
        }

    } else {

        switch(type) {

            case 1: //map scale
                unit_output = userInput * 1.905;
                return Math.round(unit_output);
            
            case 3: //entity scale
                unit_output = userInput * 2.54;
                return Math.round(unit_output);
            
            case 5: //skybox scale
                unit_output = userInput * 30.48;
                return Math.round(unit_output);

            default:
                return 0;
    
        }
    }
}

function calculateGrids(userInput, type) {

    let grid_output = 1;

    if(selectedUnit === 0) {

        switch(type) {

            case 2: //map scale
                grid_output = userInput / 0.75;
                return Math.round(grid_output);
            
            case 4: //entity scale
                grid_output = userInput / 1;
                return Math.round(grid_output);
            
            case 6: //skybox scale
                grid_output = userInput / 12;
                return Math.round(grid_output);
            
            default:
                return 0;
    
        }

    } else {

        switch(type) {

            case 2: //map scale
                grid_output = userInput / 1.905;
                return Math.round(grid_output);
            
            case 4: //entity scale
                grid_output = userInput / 2.54;
                return Math.round(grid_output);
            
            case 6: //skybox scale
                grid_output = userInput / 30.48;
                return Math.round(grid_output);

            default:
                return 0;
    
        }
    }

}

function inputManager() {

    const inputList = document.querySelectorAll("input[type=number]");

    inputList.forEach(function(unitInput) {

        unitInput.addEventListener("keyup", function(e) {

            let userInput = e.target.value;
            let targetId = Number(e.target.id);

            const userInputRegex = /[0-9]/;
            const maxUnit = 327680;
            const maxGrid = 32768;

            switch(targetId) {

                case 1:
                case 3:
                case 5:
                    if (userInputRegex.test(userInput) && userInput < maxGrid) {

                        let result = calculateUnits(userInput, targetId);
                        let newElementId = `[id='${targetId + 1}']`; 
                        let newElement = document.querySelector(newElementId);
                        
                        newElement.value = result;

                    } else {

                        let newElementId = `[id='${targetId + 1}']`; 
                        let newElement = document.querySelector(newElementId);
                        newElement.value = "";
                    }
                    break;

                case 2:
                case 4:
                case 6:
                    if (userInputRegex.test(userInput) && userInput < maxUnit) {

                        let result = calculateGrids(userInput, targetId);
                        let newElementId = `[id='${targetId - 1}']`; 
                        let newElement = document.querySelector(newElementId);
                        
                        newElement.value = result;

                    } else {
            
                        let newElementId = `[id='${targetId - 1}']`; 
                        let newElement = document.querySelector(newElementId);
                        newElement.value = "";
            
                    }
                    break;
                    
                default:
                    return 0;

            }

        });

    });

}

function historyManager() {

    const gridInputList = document.querySelectorAll(".grid-input");
    const saveButton = document.querySelector("#save-history");
    const clearButton = document.querySelector("#clear-history");

    let historyList = [];

    let gridInputType;
    let gridInputId;
    let unitInput;
    let unitInputId;
    let unitInputType;

    let result;
    
    saveButton.addEventListener("click", function() {

        if (![...saveButton.classList].includes("disabled")) {

        gridInputList.forEach(function(gridInput) {
    
            gridInputId = Number(gridInput.id);
            unitInputId = `[id='${gridInputId + 1}']`;
            unitInput = document.querySelector(unitInputId);
    
            switch(Number(gridInputId)) {
        
                case 1:
                    gridInputType = "MS";
                    break;
    
                case 3:                        
                    gridInputType = "ES";
                    break;
    
                case 5:                   
                    gridInputType = "S";
                    break;
    
                }
    
            if (gridInput.value.length !== 0) {
    
                if (selectedUnit === 0) {
    
                    unitInputType = "inch";
        
                    result = gridInput.value + gridInputType + " = " + unitInput.value + unitInputType;
                    historyList.push(result);
        
                } else {
        
                    unitInputType = "cm";
        
                    result = gridInput.value + gridInputType + " = " + unitInput.value + unitInputType;
                    historyList.push(result);
        
                }
                
            }
        
        });

        const historyListSection = document.querySelector(".history-section");
        const historyElementList = document.createElement("ol");
    
        historyList.forEach(function(elem) {

            const historyElement = document.createElement("li");
            historyElement.innerText = elem;
            historyElementList.appendChild(historyElement);

        });
    
        historyListSection.appendChild(historyElementList);
        historyList.length = 0;
    
        }

    });

    
    clearButton.addEventListener("click", function() {
    
        const historyLastList = document.querySelector("ol:last-of-type:not(.popup-list)");
        const historyElementList = document.querySelectorAll("li:not(.popup-list-element)");

        if (![...clearButton.classList].includes("disabled")) {

            historyLastList.innerHTML = "";
            historyLastList.remove();
            
        } 
    
    });

}

document.addEventListener('DOMContentLoaded', function() {

    uiManager();
    unitSelector();
    inputManager();
    historyManager();

});

})();
