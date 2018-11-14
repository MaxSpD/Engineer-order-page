function createMap() {
    const searchControl = new ymaps.control.SearchControl();
    const location = document.querySelector('.current-location__text');
    const cross = document.querySelector('.current-location__img_disabled');
    new ymaps.Map(document.querySelector(".reg-form__map"), {
        center: [59.85194136, 30.29757877],
        zoom: 14,
        controls: ['geolocationControl', searchControl, 'fullscreenControl', 'zoomControl']
    });

    function setLocation() {
        document.querySelector('.location-container__inscription_disabled').className = "location-container__inscription text";
        location.onclick = null;
        location.type = "text";
        location.style.cursor = "text";
        location.style.flexGrow = 1;
        cross.className = "current-location__img cross";
        cross.addEventListener('click', removeLocation);
        searchControl.events.remove('resultselect', setLocation);
    }

    function removeLocation() {
        document.querySelector('.location-container__inscription').className = "location-container__inscription_disabled text";
        location.value = "Расположение объекта";
        location.type = "button";
        location.style.cursor = "pointer";
        location.style.flexGrow = 0;
        location.onclick = showMap;
        cross.className = "current-location__img_disabled cross";
        searchControl.events.add('resultselect', setLocation);
        cross.removeEventListener('click', removeLocation);
    }

    searchControl.events.add('resultselect', () => {
        location.value = searchControl.getRequestString();
        if (cross.className !== "current-location__img cross cross") {
            cross.className = "current-location__img cross";
        }
    });
    searchControl.events.add('resultselect', setLocation);

}

function showMap() {
    const map = document.querySelector(".reg-form__map");
    if (map.className === "reg-form__map map_disabled") {
        map.className = "reg-form__map map";
    } else {
        map.className = "reg-form__map map_disabled";
    }

}

function validateForm(form ,event) {
    event.preventDefault();
    let flag = 0;
    if (form.name.value === "") {
        document.querySelectorAll('.validation-img')[0].className = "validation-img validation-img_unsuccessful";
    } else {
        document.querySelectorAll('.validation-img')[0].className = "validation-img validation-img_successful";
        flag++;
    }
    if (form.number.value === "" || form.number.value.length >= 11) {
        document.querySelectorAll('.validation-img')[1].className = "validation-img validation-img_unsuccessful";
    } else {
        document.querySelectorAll('.validation-img')[1].className = "validation-img validation-img_successful";
        flag++;
    }
    if (form.location.value === "" || form.location.value === "Расположение объекта") {
        document.querySelector('.cross').className = "validation-img_unsuccessful cross";
    } else {
        flag++;
    }
    if (flag === 3) {
        newPage();
    }
}

function newPage() {
    document.querySelector('.logo_worker').className = 'logo_green-circle';
    document.querySelector('.title__h1').innerText = 'Заявка успешно отправлена';
    document.querySelector('.title__h1').className = 'title__h1_successful text';
    document.querySelector('.title__h2').innerText = 'Наш менеджер свяжется с вами в ближайшее время';
    document.querySelector('.title__h2').className = 'title__h2_successful text';
    document.querySelector('.title').className = 'title_successful';
    document.querySelector('.reg-form').remove();
    document.querySelector('.booklet').remove();
    document.querySelector('.service').remove();
    document.querySelector('.main-container').style.justifyContent = "center";
    const template = document.querySelector('.template').content.cloneNode(true);
    document.querySelector('.main-container').appendChild(template);
}

ymaps.ready(createMap);