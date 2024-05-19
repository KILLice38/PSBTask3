"use strict"

document.addEventListener('DOMContentLoaded', (e) => {
    
    document.querySelector('#start').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#fullTime').innerHTML = '';

        // Отключение кнопки на время работы программы, чтобы асинхронная функция не сломалась 
        document.querySelector('#start').disabled = true;

        // Поиск постоянных элементов на странице
        const numberOfCats = document.querySelector('#numberOfCats').value,
          bowlVolume = document.querySelector('#bowlVolume').value,
          neededFood = document.querySelector('#neededFood').value,
          bowlRefillTime = parseInt(document.querySelector('#bowlRefillTime').value),
          timeForEating = parseInt(document.querySelector('#timeForEating').value);
        
        // Поиск переменных элементов на странице - результатов
        let status = document.querySelector('#status'),
            fullTime = document.querySelector('#fullTime');

        status.innerHTML = '';

        // Переменные
        let currentTime = 0,
            foodInBowl = bowlVolume, 
            hungryCats = [];

        for (let i = 0; i < numberOfCats; i++) {
            hungryCats[i] = i + 1;
        }

        // Валидация 
        if (neededFood > bowlVolume) {
            status.innerHTML = 'Ошибка! Объем миски меньше, чем необходимо коту, чтобы наесться!';
            return;
        }


        // Формирование блоков в блоке #status
        function firstStatus() {
            hungryCats.forEach((item, i) => {
                let div = document.createElement('div');
                div.className = 'catActivity';
                div.innerHTML = `Котик под номером ${item} гуляет`;
                status.append(div);
            });
            let grandmothersActivity = document.createElement('div');
                grandmothersActivity.className = 'grandmotherActivity';
                grandmothersActivity.innerHTML = `Бабушка занимается делами`;
                status.append(grandmothersActivity);
        };

        firstStatus();

        // Замена текста в блоках #status, эмуляция в секундах
        function addStatus(activity, character, delay) {
            return new Promise(resolve => {
                setTimeout(() => {
                    character.innerHTML = `${activity}`;
                    resolve();
                }, delay * 1000);
            })
            
        };

        // Основная функция выполнения задачи
        async function feedCats() {
            if (neededFood > bowlVolume) return;
            while (hungryCats.length > 0) {
                let eatingCat = hungryCats.shift();
                document.querySelectorAll('.catActivity')[eatingCat - 1].innerHTML = `Котик ${eatingCat} подошел к миске`;
                if (foodInBowl < neededFood) {
                    document.querySelector('.grandmotherActivity').innerHTML = 'Бабушка наполняет миску';
                    await (addStatus('Бабушка занимается делами', document.querySelector('.grandmotherActivity'), bowlRefillTime));
                    foodInBowl = bowlVolume;
                    currentTime += bowlRefillTime;
                }
    
                foodInBowl -= neededFood;
                currentTime += timeForEating;
                await (addStatus(`Котик ${eatingCat} отошел от миски`, document.querySelectorAll('.catActivity')[eatingCat - 1], timeForEating));
            };
            fullTime.innerHTML = `Всего было затрачено времени: ${currentTime} секунд`;
            document.querySelector('#start').disabled = false;

        }

        feedCats();

    })

});