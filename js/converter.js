export default class Converter {

    static gridInputIds = {

        map_scale_grid: "map_scale_grid",
        entity_scale_grid: "entity_scale_grid",
        skybox_grid: "skybox_grid"

    }

    static unitInputIds = {

        map_scale_unit: "map_scale_unit",
        entity_scale_unit: "entity_scale_unit",
        skybox_unit: "skybox_unit"

    }

    static imperialValues = {

        map_scale: 0.75,
        entity_scale: 1,
        skybox: 12

    }

    static metricValues = {

        map_scale: 1.905,
        entity_scale: 2.54,
        skybox: 30.48

    }

    static convert(userInput, inputId, unitSelection) {

        if (this.unitInputIds.hasOwnProperty(inputId)) {

            return this.convertUnitToGrid(userInput, inputId, unitSelection);

        } else if (this.gridInputIds.hasOwnProperty(inputId)) {

            return this.convertGridToUnit(userInput, inputId, unitSelection);
            
        }

    }

    static convertUnitToGrid(userInput, inputId, unitSelection) {
                        
        let output;

        if (unitSelection === 0) {

            switch(inputId) {

                case this.unitInputIds.map_scale_unit: 
                    output = userInput / this.imperialValues.map_scale;
                    return Math.round(output);
                
                case this.unitInputIds.entity_scale_unit: 
                    output = userInput / this.imperialValues.entity_scale;
                    return Math.round(output);
                
                case this.unitInputIds.skybox_unit: 
                    output = userInput / this.imperialValues.skybox;
                    return Math.round(output);
                
                default:
                    return 0;
        
            }             

        } else {

            switch(inputId) {

                case this.unitInputIds.map_scale_unit: 
                    output = userInput / this.metricValues.map_scale;
                    return Math.round(output);
                
                case this.unitInputIds.entity_scale_unit: 
                    output = userInput / this.metricValues.entity_scale;
                    return Math.round(output);
                
                case this.unitInputIds.skybox_unit: 
                    output = userInput / this.metricValues.skybox;
                    return Math.round(output);
                
                default:
                    return 0;
            
            }

        }

    }

    static convertGridToUnit(userInput, inputId, unitSelection) {

        let output;

        if (unitSelection === 0) {

            switch(inputId) {

                case this.gridInputIds.map_scale_grid:
                    output = userInput * this.imperialValues.map_scale;
                    return Math.round(output);
                
                case this.gridInputIds.entity_scale_grid:
                    output = userInput * this.imperialValues.entity_scale;
                    return Math.round(output);
                
                case this.gridInputIds.skybox_grid:
                    output = userInput * this.imperialValues.skybox;
                    return Math.round(output);
                
                default:
                    return 0;
            
            }

        } else {

            switch(inputId) {

                case this.gridInputIds.map_scale_grid:
                    output = userInput * this.metricValues.map_scale;
                    return Math.round(output);
                
                case this.gridInputIds.entity_scale_grid:
                    output = userInput * this.metricValues.entity_scale;
                    return Math.round(output);
                
                case this.gridInputIds.skybox_grid:
                    output = userInput * this.metricValues.skybox;
                    return Math.round(output);
                
                default:
                    return 0;

            }

        }

    }

}