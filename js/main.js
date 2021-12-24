$(document).ready(function () {
    let currentFloor = 2; // Переменная где записывается текущий этаж
    let floorPath = $('.home-img path'); // каждый отдельный этаж в SVG
    let counterUp = $('.counter-up'); /* Кнопка увеличения этажа */ 
    let counterDown = $('.counter-down'); /* Кнопка уменьшения этажа */ 
    let modal = $(".modal"); //переменная модалка
    let modalCloseButton = $(".modal-close-button"); //переменная крестик в модалке
    let viewFlatsButton = $(".view-flats"); //кнопка показать этаж 

    let roomLink = $('.flat-item a'); // переменная ссылка
    let roomPath = $('.flats path'); // переменная комната

    let navbarItemActive = $('.navbar-item.active');//активный элемент пункта меню
    let navbarItem = $('.navbar-item');//все элементы (пукнты меню)

    //При наведении мышью на пункт меню
    navbarItem.on('mouseover', function(){
        //У активного элемента убрать выделение
        navbarItemActive.removeClass('active');
    });

    //При уходе курсора с пункта меню
    navbarItem.on('mouseout', function(){
        navbarItemActive.addClass('active');
    });

    // При нажатии мышью на пункт меню
    navbarItem.on('click', function(){
        // сделать активным пунктом меню текущий нажатый пункт
        navbarItemActive = $(this);
    });

    // функция при наведении мышью на комнату
    roomPath.on('mouseover', function(){
        CurrentRoom = $(this).attr('data-room'); // получаем все svg с атрибутом data-room
        roomLink.removeClass("current-flat");// у всех ссылок удаляем подчеркивание и цвет
        roomPath.removeClass("current-room")// все svg делаем прозрачными
        $(`[data-room-link=${CurrentRoom}]`).toggleClass("current-flat"); // связываем ссылку и svg с помощью атрибутов
    });

    // функция при наведении мышью на ссылку комнату
    roomLink.on('mouseover', function() {
        CurrentRoom = $(this).attr('data-room-link') // получем все ссылки с комнатами по атрибуту data-room-link
        roomLink.removeClass("current-flat");  // У всех ссылок удаляем выделение
        roomPath.removeClass("current-room"); // все svg делаем прозрачными
        $(`[data-room=${CurrentRoom}]`).toggleClass("current-room"); // связываем комнату и ссылку с помощью атрибутов
    });
    

    // Функция при наведении мышью на этаж
    floorPath.on('mouseover', function() {
        floorPath.removeClass("current-floor");  // удаляем активный класс у этажей
        currentFloor = $(this).attr('data-floor'); // получаем значение текущего этажа
        $('.counter').text(currentFloor); // записываем значение этажа в счетчик справа
    });

    // Отслеживаем клик по кнопке вверх
    counterUp.on('click', function() {
        //Проверяем значение этажа, оно не должно быть больше 18
        if (currentFloor < 18){
            currentFloor ++; //Прибавляем один этаж
            usCurrentFloor = currentFloor.toLocaleString('en-US', {minimumIntegerDigits: 2,
                 useGrouping: false}) // Форматируем переменную с этажом, чтобы было 02 а не 2
            $('.counter').text(usCurrentFloor);  // Записываем значение этажа в счетчик справа
            floorPath.removeClass("current-floor"); //  Удаляем активный класс у этажей
            $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor") // Подсвечиваем текущий этаж
        }
    });

    //Отслеживание клика по кнопке вниз
    counterDown.on('click', function() {
        //Проверяем значение этажа, оно должно быть не меньше 2
        if (currentFloor > 2){
            currentFloor--; //вычитаем один этаж
            usCurrentFloor = currentFloor.toLocaleString('en-US', {minimumIntegerDigits: 2,
                 useGrouping: false}) // Форматируем переменную с этажом, чтобы было 02 а не 2
            $('.counter').text(usCurrentFloor); //записываем значение этажа в счетчик справа
            floorPath.removeClass("current-floor"); //  Удаляем активный класс у этажей
            $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor") // Подсвечиваем текущий этаж
        }
    })

    floorPath.on('click', toggleModal); // открытие/закрытие модалки при нажатии на этаж
    modalCloseButton.on('click', toggleModal); // открытие/закрытие модалки при нажатии на крестик
    viewFlatsButton.on('click', toggleModal); // открытие/закрытие модалки при нажатии на кнопку

    function toggleModal(){ //функция открыть / закрыть окно
        modal.toggleClass('is_open'); // навешивание класса open на модалку
    }
});