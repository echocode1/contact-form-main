document.addEventListener('DOMContentLoaded', () => {

    /* ---->event listener to enable key arrow up, down & enter assessibility <---- */ 
    const contactForm = document.querySelectorAll('.form-main__container');
    contactForm.forEach( (formElem, index) => {

        formElem.addEventListener('keydown', (event) => {
            let combinedElem =Array.from (formElem.querySelectorAll
            ('#first-name, #last-name, #email-address,#radio1, #radio2, #message, #consent-checkbox, #submit'))
            let focusedElem = combinedElem.indexOf(document.activeElement);
           
            switch(event.key){
                case 'ArrowDown':
                    if (focusedElem < combinedElem.length - 1){
                        event.preventDefault();
                        combinedElem[focusedElem + 1].focus();
                    }else{
                       combinedElem[0].focus();
                    }
                    break;
                case "ArrowUp" :
                    if(focusedElem > 0){
                        event.preventDefault();
                        combinedElem[focusedElem - 1].focus();
                    }else{
                        combinedElem[combinedElem.length - 1].focus();
                    }
                    break;
                default:
                break;
            }
        })
    })
   let submit = document.getElementById('submit');
   submit.addEventListener('click', submitForm);
   radioChange();
})

/* ---->function to validate email <----*/
function validateEmail(){
    let validate = document.getElementById('email-address');
    return /[a-z0-9]+@gmail.com/.exec((validate.value))
}

/* ----> function to change the background color radio is cheched <----*/
function radioChange(){
    let radio1 = document.getElementById('radio1');
    let radio2 = document.getElementById('radio2');
    radio1.addEventListener('change', (event) => {
        if(event.target.checked ) {
            document.getElementById('query1').style.backgroundColor = 'hsl(148, 38%, 91%)',
            document.getElementById('query2').style.backgroundColor = '';
        }
    })
    radio2.addEventListener('change', (event) => {
        if(event.target.checked ){
            document.getElementById('query2').style.backgroundColor = 'hsl(148, 38%, 91%)',
            document.getElementById('query1').style.backgroundColor = '';
        }
    })
}

/* ----> function to validate all form section <---- */ 
function appendForm(){
    let isValid = true;
    let form = document.querySelectorAll('.form-main__container');
    form.forEach(elem => {
        
        let firstName = elem.querySelector('#first-name');
        let lastName = elem.querySelector('#last-name');
        let email = elem.querySelector('#email-address');
        let radio1 = elem.querySelector('#radio1');
        let radio2 = elem.querySelector('#radio2');
        let message = elem.querySelector('#message');
        let checkbox = elem.querySelector('#consent-checkbox');

        if(firstName.value === ''){
            document.getElementById('first-name__guide').style.display = 'block';
            firstName.style.border = '1px solid hsl(0, 66%, 54%)'
            isValid = false;
        }else{
            document.getElementById('first-name__guide').style.display = '';
        }

        if(lastName.value === ''){
            document.getElementById('last-name__guide').style.display = 'block';
            lastName.style.border = '1px solid hsl(0, 66%, 54%)'
            isValid = false;
        }else{
            document.getElementById('last-name__guide').style.display = '';
        }

        if(email.value === ''){
            document.getElementById('email-address__guide').style.display = 'block';
            email.style.border = '1px solid hsl(0, 66%, 54%)'
            isValid = false;
        }else{
            if(validateEmail()){
                document.getElementById('email-address__guide').style.display = '';
            }else{
                document.getElementById('email-address__guide').style.display = 'block';
                isValid = false;
            }
        }

        if(radio1.checked || radio2.checked){
            document.getElementById('query__guide').style.display = '';
        }else{
            document.getElementById('query__guide').style.display = 'block';
            isValid = false ;
        }

        if(message.value === ''){
            document.getElementById('message-guide').style.display = 'block';
            message.style.border = '1px solid hsl(0, 66%, 54%)'
            isValid = false;
        }else{
            document.getElementById('message-guide').style.display = '';
        }

        if(checkbox.checked){
            document.getElementById('consent-checkbox__guide').style.display = '';
            checkbox.style.color = 'hsl(169, 82%, 27%)';
            checkbox.style.backgroundColor = 'hsl(169, 82%, 27%)';
        }else{
            document.getElementById('consent-checkbox__guide').style.display = 'block';
            isValid = false ;
        }
    })
    return isValid;
}

/* ----> function to execute submit once all form-section is filled <---- */ 
function submitForm(event){
    if(appendForm()){  
        let success = document.querySelector('.success__message')
        success.style.display = "block";
        
        let resetValues =document.querySelectorAll
        ('#first-name, #last-name, #email-address, #message,#submit');
        resetValues.forEach(e => {
            e.value ='' ;
            e.style.border = '1.5px solid hsl(186, 15%, 59%)'
        } );

        let unchecked = document.querySelectorAll('.radio, #consent-checkbox');
        unchecked.forEach(e => e.checked = false)

        document.querySelectorAll('.query').forEach(e => e.style.backgroundColor = '')
    }
}