const requiredFields = ['firstNameStudent', 'lastNameStudent', 'dateBirthday', 'phone', 'idNumber'];
const PHONE_PATTERN = /^\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}/;
const NAME_PATTERN = /^[A-Za-z]{2,}$/;
const ID_NUMBER = /[0-9]{6}/;
const DATA_BIRTHDAY = /[0-9]{2}\.[0-9]{2}\.[0-9]{4}/;
const patternsFields = {
    'lastNameStudent': {
        pattern: NAME_PATTERN,
        errorMessage: 'Second name must include characters only'
    },
    'firstNameStudent': {
        pattern: NAME_PATTERN,
        errorMessage: 'Name must include characters only'
    },
    'phone': {
        pattern: PHONE_PATTERN,
        errorMessage: 'Invalid phone number. Enter the number in the format +1(xxx)-xx-xx'
    },
    'idNumber':{
        pattern: ID_NUMBER,
        errorMessage: 'Group number entered incorrectly'
    }
};

window.addEventListener('load', () => {
    const inputs = Array.from(document.querySelectorAll('#studentForm input'));
    const VALIDATION_MESSAGE_ATTRIBUTE = 'valid-error';

    function setValidation(inputs) {
        inputs.filter(input => requiredFields.includes(input.name))
            .forEach(input => input.required = true);

        //

        // не очень очевидная проверка, но если взять поле, которого в объекте нет, то вернется undefined, что даст false
        inputs.filter(input => patternsFields[input.name])
            .forEach(input => {
                const inputValidation = patternsFields[input.name];
                // устаналиваем в паттерн свойство source объекта "типа" RegExp, чтобы валидация была адекватная
                input.pattern = inputValidation.pattern.source;
                // а вот тут мы нагло устанавливаем атрибут с сообщением об ошибке, потом мы его будем выводить в сообщение
                input.setAttribute(VALIDATION_MESSAGE_ATTRIBUTE, inputValidation.errorMessage);
            });
    }

    const errors = {

    };

    function validate(inputEvent) {
        const input = inputEvent.target;
        const inputValue = input.value;
        const inputName = input.name;
        const inputErorr = errors[input.name];

        const isEmpty = (input.required && !inputValue) || (inputName == 'phone' && inputValue == '+7(___)___-__-__');
        const invalidData = input.pattern && !RegExp(input.pattern).test(inputValue);
        // "хитрая" проверка валидации - сработает тот case который удовлетворяет условие первым
        switch (true) {
            case isEmpty:
                createError('This field is required');
                break;
            case invalidData:
                createError(input.getAttribute(VALIDATION_MESSAGE_ATTRIBUTE));
                break;
            default:
                inputErorr?.remove();
                errors[input.name] = null;
                break;
        }

        function createError(text) {
            // создаем новый элемент, если нету ошибки
            const errorElement = errors[input.name] ?? document.createElement('p');
            // обновляем сообщение
            errorElement.innerText = text;

            // если элемент уже есть, нам больше ничего не нужно делать, выходим
            if (errors[input.name]) return;

            errorElement.classList.add('input-error');
            input.parentNode.appendChild(errorElement);
            errors[input.name] = errorElement;
        }
    }

    function setCursorPosition(pos, e) {
        e.focus();
        if (e.setSelectionRange) e.setSelectionRange(pos, pos);     
        else if (e.createTextRange) {
          var range = e.createTextRange();
          range.collapse(true);
          range.moveEnd("character", pos);
          range.moveStart("character", pos);
          range.select()
        }
    }
    
      function mask(e) {
        //console.log('mask',e);
        var matrix = this.placeholder,// .defaultValue
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        def.length >= val.length && (val = def);
        matrix = matrix.replace(/[_\d]/g, function(a) {
          return val.charAt(i++) || "_"
        });
        this.value = matrix;
        i = matrix.lastIndexOf(val.substr(-1));
        i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
        setCursorPosition(i, this)
    }

    inputs.find(input => input.name === 'phone').addEventListener('focus',()=>{
        var input = document.querySelector("#phone");
        input.addEventListener("input", mask, false);
        setCursorPosition(3, input);
        });

    setValidation(inputs);
    inputs.forEach(input => input.addEventListener('blur', validate));
});