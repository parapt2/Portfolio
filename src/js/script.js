// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';
import JustValidate from 'just-validate';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

import "/src/sass/style.scss";


const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});


const counters = document.querySelectorAll('.skills__ratings-counter'),
    lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});


try {
    const validatorTouch = new JustValidate('.contacts__form', {
        errorLabelStyle: {
            paddingTop: '3px',
            color: '#d6247c',
            fontSize: '10px',
        },
        errorFieldCssClass: 'input-error',
    });

    validatorTouch
        .addField('#name', [
            {
                rule: 'required',
            },
            {
                rule: 'minLength',
                value: 1,
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
            },
            {
                rule: 'email',
            },
        ])
        .addField('#message', [
            {
                rule: 'required',
            },
            {
                rule: 'minLength',
                value: 5,
            },
        ], {
            errorsContainer: document.querySelector('#message').parentElement.querySelector('.error-message'),
        })
        .addField('#checkbox', [
            {
                rule: 'required',
            },
        ], {
            errorsContainer: document.querySelector('#checkbox').parentElement.parentElement.querySelector('.checkbox-error-message'),
        })
        .onSuccess((event) => {
            const form = event.currentTarget;
            const formData = new FormData(form);

            fetch("https://formspree.io/f/mpqolloz", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then((res) => {
                    if (res.ok) {
                        form.reset();
                        alert("Message sent!");
                    } else {
                        alert("Something went wrong 😢");
                    }
                })
                .catch(() => {
                    alert("Network error");
                });
        });
} catch (e) { }
