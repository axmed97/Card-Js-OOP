class CardValidator{
    constructor(){   
        this.numberPattern = /^\d+$/;
        this.cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        this.namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/
        this.cvvPattern = /^\d{3}$/;
        this.expirationPattern = /^\d{2}\/\d{2}$/;
    }   
    isNumberPattern(text){
        return this.numberPattern.test(text);
    }
    isCardNumberPattern(text){
        return this.cardNumberPattern.test(text);
    }
    isNamePattern(text){
        return this.namePattern.test(text);
    }
    isCvvPattern(text){
        return this.cvvPattern.test(text);
    }
    
    isExpirationPattern(text){
        return this.expirationPattern.test(text);
    }
}

class Card{
    constructor() {
        this.cardElement = document.querySelector('.card');
        this.nameElement = document.querySelector('.name');
        this.numberElement = document.querySelector('.number');
        this.expirationElement = document.querySelector('.expiration');
        this.cvvElement = document.querySelector('.cvv');
    }

    changeName(text){
        this.nameElement.textContent = text;
    }
    changeNumber(text){
        this.numberElement.textContent = text;
    }
    changeExpiration(text){
        this.expirationElement.textContent = text;
    }
    changeCvv(text){
        this.cvvElement.textContent = text;
    }
}

class CardInput{
    constructor(selector, next) {
        this.input = document.querySelector(selector);
        this.next = next;
        this.error = this.input.nextElementSibling;
        this.card = new Card();
        this.validator = new CardValidator();
    }

    setError = (message) => {
        this.error.textContent = message;
    }

    removeError = () =>{
        this.error.textContent = '';
    }

    get value(){
        return this.input.value;
    }

    set value(newValue){
        this.input.value = newValue;
    }
}

class CardNameInput extends CardInput{
    constructor(selector, next) {
        super(selector, next)
        this.input.oninput = this.changeHandler
    }

    validate = () => {
        if(this.value && !this.validator.isNamePattern(this.value)){
            this.setError('Name is not valid!')
        }else{
            this.removeError();
        }
    }

    changeHandler = () => {
        this.validate();
        this.card.changeName(this.value);
    }
}

class CardNumberInput extends CardInput{
    constructor(selector, next) {
        super(selector, next)
        this.input.oninput = this.changeHandler
    }

    validate = () => {
        if(this.value && !this.validator.isCardNumberPattern(this.value)){
            this.setError('Card number is not valid!')
        }else{
            this.removeError();
        }
    }

    changeHandler = () => {
        this.card.changeNumber(this.value);
        const length = this.value.length;
        if(length < 19 && length > 3 && this.validator.isNumberPattern(this.value.slice(-4))){
            this.value += '-';
        }

        if(length == 19){
            this.next.input.focus();
        }
        
        this.validate();
    }
}

class CardExpirationInput extends CardInput{
    constructor(selector, next) {
        super(selector, next)
        this.input.oninput = this.changeHandler
    }

    validate = () => {
        if(this.value && !this.validator.isExpirationPattern(this.value)){
            this.setError('Expiration date is not valid!')
        }else{
            this.removeError();
        }
    }

    changeHandler = () => {
        this.card.changeExpiration(this.value);
        const length = this.value.length;
        
        if(length === 2 && this.validator.isNumberPattern(this.value)){
            this.value += '/';
        }
        this.validate();

        if(length === 5){
            this.next.input.focus();
        }
    }
}

class CardCvvInput extends CardInput{
    constructor(selector, next) {
        super(selector, next)
        this.input.oninput = this.changeHandler
    }

    validate = () => {
        if(this.value && !this.validator.isCvvPattern(this.value)){
            this.setError('Cvv code is not valid!')
        }else{
            this.removeError();
        }
    }

    changeHandler = () => {
        this.card.changeCvv(this.value);

        this.validate();
    }
}

class Form{
    constructor(){
        this.name = new CardNameInput('.card-name-input')
        this.cvv = new CardCvvInput('.card-cvv-input')
        this.expiration = new CardExpirationInput('.card-expiration-input', this.cvv);
        this.number = new CardNumberInput('.card-number-input', this.expiration);
    }
}

const form = new Form();