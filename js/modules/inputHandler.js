export default class InputHandler {

    constructor(selectedUnit) {

        this.selectedUnit = selectedUnit;

    }

    static inputTypes = {

        map_scale_grid: "map_scale_unit",
        entity_scale_grid: "entity_scale_unit",
        skybox_grid: "skybox_unit",
        map_scale_unit: "map_scale_grid",
        entity_scale_unit: "entity_scale_grid",
        skybox_unit: "skybox_grid"

    }

    static inputRegex = /^\d+$/;
    
    elements = {

        unitLabelArray: document.querySelectorAll(".unit-label"),
        unitInputArray: document.querySelectorAll(".unit-input"),
        gridLabelArray: document.querySelectorAll(".grid-label"),
        gridInputArray: document.querySelectorAll(".grid-input"),
        inputArray: document.querySelectorAll("input[type=text]")

    }

    validateValue(value) {

        if (InputHandler.inputRegex.test(value)) {

            return true;

        } else {

            return false;

        }

    }

    allInputsEmpty() {

        let count = 0;

        this.elements.inputArray.forEach((element) => {

            if (element.value === "" || !this.validateValue(element.value)) {

                count++;

            }

        });

        if (count === this.elements.inputArray.length) {

            return true;

        } else {

            return false;

        }

    }
    
    getInputValueById(id) {

        if (id) {

            const el = document.querySelector("#" + id);

            if (this.validateValue(el.value)) {

                return el.value;

            } else {

                return "";

            }

        }

    }

    getInputValues() {

        let obj = {};

        this.elements.inputArray.forEach((element) => {

            if (this.validateValue(element.value)) {

                obj[element.id] = element.value;

            }

        });

        return obj;

    }

    setInputValueById(id, value, opposite) {

        let oppositeId, element;

        if (opposite) {

            for (let type in InputHandler.inputTypes) {

                if (id === type) {

                    oppositeId = InputHandler.inputTypes[id];
                    element = document.querySelector("#" + oppositeId);

                }

            }

        } else {

            for (let inputId of this.elements.inputArray) {

                if (id === inputId) {

                    element = document.querySelector("#" + id);

                }

            }

        }

        if (value) {
                
            if (this.validateValue(value)) {

                element.value = value;
    
            } else {
    
                element.value = "";
    
            }

        } else {

            element.value = "";

        }

    }

}