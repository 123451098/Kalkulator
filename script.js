document.addEventListener('DOMContentLoaded', function(){    
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll(".buttons button");
    const operators = ["%", "*", "/", "+", "-", "^"];

    buttons.forEach((button) => {
        button.addEventListener("click", function(){
            const value = this.getAttribute('data-value');
            if (value === 'AC'){
                display.value = '';
            } else if (value === 'DEL') {
                display.value = display.value.slice(0, -1);
            }else if (value === '='){
                try{
                    display.value = evaluate(display.value);
                }catch (error){
                    display.value = 'Error';
                }
            } else if (value === 'π'){
                display.value += Math.PI;
            } else if (value === 'sin' || value === 'cos' || value === "tan" || value === '√'){
                display.value += value + '(';
            } else if (value === '^') {
                display.value += '**';
            } else {
                display.value += value;
            }
        });
    });

    function evaluate(expression) {
        expression = expression.replace(/π/g, Math.PI);
        expression = expression.replace(/√\(/g, 'Math.sqrt(');
        expression = expression.replace(/sin\(/g, 'Math.sin(');
        expression = expression.replace(/cos\(/g, 'Math.cos(');
        expression = expression.replace(/tan\(/g, 'Math.tan(');
        return Function('"use strict"; return (' + expression + ')')(); 
    }
});

