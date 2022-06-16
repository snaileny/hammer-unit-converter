export default class HistoryManager {

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

    static inputTypeAbbrs = {

        map_scale_grid: "MS",
        entity_scale_grid: "ES",
        skybox_grid: "S"

    }

    elements = {

        historyButtonSave: document.querySelector("#history-save-button"),
        historyButtonClear: document.querySelector("#history-clear-button"),
        historyContainer: document.querySelector(".history-section")

    }

    updateSaveButtonState(inputEmpty = true) {

        const saveButton = this.elements.historyButtonSave;

        if (inputEmpty === false) {

            saveButton.setAttribute("data-enabled", "true");

        } else if (inputEmpty === true) {

            saveButton.setAttribute("data-enabled", "false");

        } else {

            saveButton.setAttribute("data-enabled", "false");

        }

    }

    updateClearButtonState() {

        const clearButton = this.elements.historyButtonClear;
        const historyEmpty = this.localStorageEmpty();
        
        if (historyEmpty === false) {

            clearButton.setAttribute("data-enabled", "true");

        } else if (historyEmpty === true) {

            clearButton.setAttribute("data-enabled", "false");

        } else {

            clearButton.setAttribute("data-enabled", "false");

        }

    }

    saveTolocalStorage(inputObj) {

        for (let input in inputObj) {

            localStorage.setItem(input, inputObj[input]);

        }

    }

    clearlocalStorage() {

        for (let input in HistoryManager.inputTypes) {

            localStorage.removeItem(input);

        }

    }

    getValuesFromlocalStorage() {

        let obj = {};

        for (let key in HistoryManager.inputTypes) {

            const value = localStorage.getItem(key);

            if (value) {

                obj[key] = value;

            }

        }

        return obj;

    }

    localStorageEmpty() {

        const localKeys = Object.keys(localStorage);
        const inputArr = Object.keys(HistoryManager.inputTypes);

        for (let key of localKeys) {

            if (inputArr.includes(key)) {

                return false;

            }

        }

        return true;

    }

    updateHistory() {

        if (!this.localStorageEmpty()) {

            const unit = this.selectedUnit.get;
            const valueObj = this.getValuesFromlocalStorage();
            const ol = document.createElement("ol");
            let unitAbbr, template = "";

            this.selectedUnit.get === 0 ? unitAbbr = "in" : unitAbbr = "cm";

            for (let key in valueObj) {

                const unitValue = valueObj[key];
                const gridValue = valueObj[HistoryManager.inputTypes[key]];
                const gridAbbr = HistoryManager.inputTypeAbbrs[HistoryManager.inputTypes[key]];

                if (unitValue &&  gridValue && gridAbbr) {
        
                    template +=
                    `
                    <li>${gridValue + " " + gridAbbr + " = " + unitValue + " " + unitAbbr}</li>
                    `

                }

            }

            ol.innerHTML = template;
            this.elements.historyContainer.append(ol);

        } else {

            this.elements.historyContainer.innerHTML = ""; 

        }

    }

}