/*
Here is the cases

On category change
Value in first form is source value and value in second form is target value

On Unit change 
If first form unit change then value in second form is source value and value in first form is target value
If second form unit change then valuer in first form is source value and value in second form is target value

On value change (User input some value)
On value enter in first form input value in second form input got change
On value enter in second form input value in firt form input got change

*/

(function(){
    var  keysAllowedArray = [189];
    var fixedDecimal = 14;
    var lastValueFirstInput = 1;
    var lastValueSecondInput = 1;
    var lastSeparatorValue = ",";
    var lastDecimalSeparatorValue = ".";
    function UpdateUnitMenu(propMenu, unitMenu){
        FillMenuWithArray(unitMenu, unitData[propMenu.value]);
        if(document.form_A.unit_input.value){
            CalculateUnit(document.form_A, document.form_B);
        }
    }
    function onFirstFormValueChange(event){
        var value = replaceSeparator(this.value);
        if ( !isNaN(value) || value == 0){
            this.value = addThousandSeparator(parseFloat(value));
        }
    };
    function onSecondFormValueChange(event){
        var value = replaceSeparator(this.value);
        if ( !isNaN(value) || value == 0){
            this.value = addThousandSeparator(parseFloat(value));
        }
    };
    function onFirstFormValueKeyUp(event){
        if(keysAllowedArray.indexOf(event.keyCode) > -1){
            return false
        }
        if(document.form_A.unit_input.value){
            CalculateUnit(document.form_A, document.form_B);
        }
    }
    function onFirstFormUnitChange(){
        if(document.form_A.unit_input.value){
            CalculateUnit(document.form_B, document.form_A);
        }
    }
    function onSecondFormValueKeyUp(event){
        if(keysAllowedArray.indexOf(event.keyCode) > -1){
            return false
        }
        if(document.form_B.unit_input.value){
            CalculateUnit(document.form_B, document.form_A);
        }
    }
    function onSecondFormUnitChange(){
        if(document.form_B.unit_input.value){
            CalculateUnit(document.form_A, document.form_B);
        }
    }

    function onSeparatorChange () {
        if(this.value === ","){
            document.form_C.decimal_separator.options[1].hidden=true;
            document.form_C.decimal_separator.options[0].hidden=false;
            if(this.value === document.form_C.decimal_separator.value){
                document.form_C.decimal_separator.selectedIndex = 1;
            } 
        }else if(this.value === "."){
            document.form_C.decimal_separator.options[0].hidden=true;
            document.form_C.decimal_separator.options[1].hidden=false;
            if(this.value === document.form_C.decimal_separator.value){
                document.form_C.decimal_separator.selectedIndex = 0;
            }
        } else {
            document.form_C.decimal_separator.options[1].hidden=false;
            document.form_C.decimal_separator.options[0].hidden=false;
        }
        var formAInputValue= replaceSeparator(document.form_A.unit_input.value);
        var formBInputValue= replaceSeparator(document.form_B.unit_input.value);
        lastSeparatorValue  = this.value;
        document.form_A.unit_input.value = addThousandSeparator(formAInputValue);
        document.form_B.unit_input.value = addThousandSeparator(formBInputValue);
        lastValueFirstInput = document.form_A.unit_input.value;
        lastValueSecondInput = document.form_B.unit_input.value;
    }

    function onDecimalChange () {
        if(this.value === ","){
            document.form_C.separator.options[0].hidden=true;
            document.form_C.separator.options[1].hidden=false;
            if(this.value === document.form_C.separator.value){
                document.form_C.separator.selectedIndex = 1;
            } 
        }else {
            document.form_C.separator.options[1].hidden=true;
            document.form_C.separator.options[0].hidden=false;
            if(this.value === document.form_C.separator.value){
                document.form_C.separator.selectedIndex = 0;
            }
        }
        
        var formAInputValue= replaceSeparator(document.form_A.unit_input.value);
        var formBInputValue= replaceSeparator(document.form_B.unit_input.value);
        lastDecimalSeparatorValue  = this.value;
        document.form_A.unit_input.value = addThousandSeparator(formAInputValue);
        document.form_B.unit_input.value = addThousandSeparator(formBInputValue);
        lastValueFirstInput = document.form_A.unit_input.value;
        lastValueSecondInput = document.form_B.unit_input.value;
    }
    window.onload = function(){
        document.form_A.unit_menu.onchange = onFirstFormUnitChange;
        document.form_A.unit_input.onkeyup = onFirstFormValueKeyUp;
        document.form_A.unit_input.onchange = onFirstFormValueChange;
        document.form_B.unit_menu.onchange = onSecondFormUnitChange;
        document.form_B.unit_input.onkeyup = onSecondFormValueKeyUp;
        document.form_B.unit_input.onchange = onSecondFormValueChange;
        document.form_C.separator.onchange = onSeparatorChange;
        document.form_C.decimal_separator.onchange = onDecimalChange
    }
    function FillMenuWithArray(myMenu, unitsObject){
        var unitMenutTextArray = Object.keys(unitsObject); 
        myMenu.length = unitMenutTextArray.length;
        unitMenutTextArray.forEach(function(value, index){
            myMenu.options[index].text = value;
            if(unitsObject[value].factor){
                myMenu.options[index].value = unitsObject[value].factor;                
            }
        });
    }

    function CalculateUnit(sourceForm, targetForm){
        var sourceValue = sourceForm.unit_input.value;
        sourceValue = parseFloat(sourceValue);
        if ( !isNaN(sourceValue) || sourceValue == 0){
            ConvertFromTo(sourceForm, targetForm);
        } else {
            alert("What you gave me cannot be converted or is zero!");
        }
    }
    
    function ConvertFromTo(sourceForm, targetForm){
        if(targetForm.unit_menu.selectedIndex > -1 && sourceForm.unit_menu.selectedIndex > -1){
            var propValue = document.property_form.the_menu.value;
            var sourceFactor = sourceForm.unit_menu.value;
            var sourceText = sourceForm.unit_menu.options[sourceForm.unit_menu.selectedIndex].text;
            var targetFactor = targetForm.unit_menu.value;
            var targetText = targetForm.unit_menu.options[targetForm.unit_menu.selectedIndex].text;
            var result = replaceSeparator(sourceForm.unit_input.value);
            
            if (propValue == "Temperature"){
                result = parseFloat(result) + unitData[propValue][sourceText].increment;
            }
            
            result = result * sourceFactor;
            result = result / targetFactor;
            
            if (propValue == "Temperature"){
                if(unitData[propValue][targetText]){
                    result = parseFloat(result) - unitData[propValue][targetText].increment;
                }
            }            
            targetForm.unit_input.value = addThousandSeparator(result);
            lastValueFirstInput = document.form_A.unit_input.value;            
            lastValueSecondInput = document.form_B.unit_input.value;                       
            console.log("ConvertFromTo:",lastValueSecondInput,lastValueFirstInput);
            
        }
    }

    function addThousandSeparator(number) {
        
        if(number <= 9999){
            var valueWithDecimalSeparator = parseFloat(number.toFixed(fixedDecimal)).toString().replace(".",lastDecimalSeparatorValue); 
            return valueWithDecimalSeparator;
        }
        var isInteger = Number.isInteger(number);
        var strRegExp = /\B(?=(\d{3})+(?!\d).)/g;
        if(isInteger) {
            strRegExp = /\B(?=(\d{3})+(?!\d))/g;
        }
        
        var fixedDecimalNumber = parseFloat(number.toFixed(fixedDecimal));
        var valueWithSeparator = fixedDecimalNumber.toString().replace(strRegExp, lastSeparatorValue);  
        if(!isInteger){
            return valueWithSeparator.replace(/\.([^\.]*)$/,lastDecimalSeparatorValue+"$1");               
        }
        return valueWithSeparator;
    }

    function replaceSeparator(numberString) {
        var strRe = lastSeparatorValue?"\\"+lastSeparatorValue:lastSeparatorValue;
        var re = new RegExp(strRe, "g");
        numberString = numberString.replace(re,"");
        numberString.replace(lastDecimalSeparatorValue, ".");
        console.log("replaceSeparator:",parseFloat(numberString.replace(lastDecimalSeparatorValue, ".")));        
        return parseFloat(numberString.replace(lastDecimalSeparatorValue, "."));
    }

    function ClearForm(){
        document.form_A.unit_input.value = "1";
        document.form_B.unit_input.value = "1";
    }

    function onSliderChange() {
        var output = document.getElementById("lbldecimalslider");
        output.innerHTML = this.value;
        fixedDecimal = this.value;
        document.form_A.unit_input.value = addThousandSeparator(replaceSeparator(lastValueFirstInput));
        document.form_B.unit_input.value = addThousandSeparator(replaceSeparator(lastValueSecondInput));
    }
    window.ClearForm = ClearForm;
    window.FillMenuWithArray = FillMenuWithArray;
    window.UpdateUnitMenu = UpdateUnitMenu;
    window.CalculateUnit = CalculateUnit;
    window.onSliderChange = onSliderChange;
})();