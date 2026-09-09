// ========== ДАННЫЕ РЕЦЕПТОВ ==========
const recipes = {
    'Омлет с беконом': {
        category: 'завтрак',
        time: '15 минут',
        servings: 2,
        ingredients: [
            '4 яйца',
            '100г бекона',
            '50г сыра',
            '2 столовые ложки сливочного масла',
            'Соль и перец по вкусу'
        ],
        instructions: [
            'Нарежьте бекон кубиками и обжарьте на сковороде до хрустящести',
            'Взбейте яйца с солью и перцем',
            'Добавьте масло на сковороду и дайте ему растопиться',
            'Вылейте яйца и готовьте 3-4 минуты',
            'Посыпьте сыром и беконом, сложите пополам',
            'Готовьте еще 1-2 минуты и подавайте горячим'
        ]
    },
    'Паста Карбонара': {
        category: 'обед',
        time: '25 минут',
        servings: 4,
        ingredients: [
            '400г спагетти',
            '200г гуанчиала или панчетты',
            '4 яйца',
            '100г пармезана',
            'Черный перец',
            'Соль'
        ],
        instructions: [
            'Сварите пасту в подсоленной воде до al dente',
            'Нарежьте гуанчиал и обжарьте на сковороде',
            'Взбейте яйца с тертым пармезаном',
            'Смешайте готовую пасту с гуанчиалом и жиром',
            'Снимите сковороду с огня и добавьте яичную смесь',
            'Быстро перемешайте и подавайте с черным перцем'
        ]
    },
    'Стейк с овощами': {
        category: 'ужин',
        time: '30 минут',
        servings: 2,
        ingredients: [
            '2 стейка по 250г',
            '200г брокколи',
            '200г моркови',
            '150г картофеля',
            'Оливковое масло',
            'Травы и специи'
        ],
        instructions: [
            'Подготовьте овощи и нарежьте их кубиками',
            'Нагрейте сковороду и обжарьте стейк с каждой стороны по 3-4 минуты',
            'Отложите стейк и готовьте овощи в той же сковороде',
            'Верните стейк к овощам и готовьте 5-10 минут',
            'Приправьте солью, перцем и травами',
            'Дайте отдохнуть 5 минут перед подачей'
        ]
    },
    'Тирамису': {
        category: 'десерт',
        time: '20 минут',
        servings: 6,
        ingredients: [
            '500г маскарпоне',
            '4 яйца',
            '100г сахара',
            '200мл эспрессо',
            '40 печенья Лдифруа',
            '2 столовые ложки какао'
        ],
        instructions: [
            'Отделите белки от желтков',
            'Взбейте желтки с сахаром до пышной массы',
            'Добавьте маскарпоне и аккуратно перемешайте',
            'Взбейте белки до крепких пиков и добавьте к смеси',
            'Окуните печенье в эспрессо и выложите слой на дно формы',
            'Добавьте слой крема, затем повторите слои',
            'Посыпьте какао сверху и охлаждайте 4-6 часов'
        ]
    },
    'Блины со сметаной': {
        category: 'завтрак',
        time: '30 минут',
        servings: 4,
        ingredients: [
            '2 стакана муки',
            '2 яйца',
            '1 стакан молока',
            '1 стакан кефира',
            '1 чайная ложка соды',
            'Соль и сахар по вкусу'
        ],
        instructions: [
            'Смешайте муку, яйца, молоко и кефир',
            'Добавьте соду, соль и сахар',
            'Оставьте тесто на 15 минут',
            'Нагрейте сковороду с маслом',
            'Жарьте блины с каждой стороны до золотистого цвета',
            'Подавайте горячие блины со сметаной и клубникой'
        ]
    },
    'Украинский борщ': {
        category: 'обед',
        time: '45 минут',
        servings: 6,
        ingredients: [
            '500г говядины',
            '2 свеклы',
            '2 моркови',
            '1 кочан капусты',
            '3 картофелины',
            '2 литра бульона',
            'Сметана для подачи'
        ],
        instructions: [
            'Сварите говядину до готовности (20-25 минут)',
            'Добавьте нарезанные овощи: свеклу, морковь, картофель',
            'Готовьте 15 минут, затем добавьте капусту',
            'Варите еще 10 минут до готовности овощей',
            'Приправьте солью и перцем по вкусу',
            'Подавайте горячий борщ со сметаной'
        ]
    }
};

// ========== ФУНКЦИИ ФИЛЬТРАЦИИ ==========
function filterRecipes() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value.toLowerCase();
    const recipeCards = document.querySelectorAll('.recipe-card');

    recipeCards.forEach(card => {
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        const cardCategory = card.getAttribute('data-category');

        const matchesSearch = cardTitle.includes(searchInput);
        const matchesCategory = categoryFilter === '' || cardCategory === categoryFilter;

        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ========== ФУНКЦИИ РЕЦЕПТА ==========
function showRecipeDetails(recipeName) {
    const recipe = recipes[recipeName];
    const modal = document.getElementById('recipeModal');
    const recipeDetails = document.getElementById('recipeDetails');

    if (!recipe) {
        console.error('Рецепт не найден:', recipeName);
        return;
    }

    let ingredientsHTML = '<ol>';
    recipe.ingredients.forEach(ingredient => {
        ingredientsHTML += `<li>${ingredient}</li>`;
    });
    ingredientsHTML += '</ol>';

    let instructionsHTML = '<ol>';
    recipe.instructions.forEach(instruction => {
        instructionsHTML += `<li>${instruction}</li>`;
    });
    instructionsHTML += '</ol>';

    recipeDetails.innerHTML = `
        <h3>${recipeName}</h3>
        <div style="margin: 15px 0; font-size: 16px;">
            <span style="margin-right: 20px;"><strong>⏱️ Время:</strong> ${recipe.time}</span>
            <span><strong>🍽️ Порций:</strong> ${recipe.servings}</span>
        </div>
        <h4>Ингредиенты:</h4>
        ${ingredientsHTML}
        <h4>Инструкции:</h4>
        ${instructionsHTML}
    `;

    modal.style.display = 'block';
}

function closeRecipeModal() {
    const modal = document.getElementById('recipeModal');
    modal.style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('recipeModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// ========== ФУНКЦИИ КАЛЬКУЛЯТОРА ==========
let currentServings = 4;

function changeServings(change) {
    const servingsInput = document.getElementById('servings');
    let newValue = parseInt(servingsInput.value) + change;
    
    if (newValue >= 1 && newValue <= 20) {
        servingsInput.value = newValue;
        currentServings = newValue;
        updateCalculator();
    }
}

function updateCalculator() {
    const servingsInput = document.getElementById('servings');
    currentServings = parseInt(servingsInput.value);
    // Здесь можно добавить логику обновления калькулятора
}

document.getElementById('servings')?.addEventListener('change', updateCalculator);

// ========== ФУНКЦИИ ПРОКРУТКИ ==========
function scrollToRecipes() {
    const recipesSection = document.getElementById('recipes');
    recipesSection.scrollIntoView({ behavior: 'smooth' });
}

// ========== ФУНКЦИИ ФОРМЫ ==========
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);

    // Симуляция отправки формы
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    
    // Очистка формы
    form.reset();
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем анимацию при загрузке страницы
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach((card, index) => {
        card.style.opacity = '1';
        card.style.animation = `slideUp 0.6s ease forwards`;
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Инициализация калькулятора
    currentServings = parseInt(document.getElementById('servings').value);
});

// ========== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ==========

// Функция для добавления новой карточки рецепта
function addRecipeCard(recipeName, category, time, description, imageUrl) {
    const recipesGrid = document.getElementById('recipesGrid');
    const newCard = document.createElement('div');
    newCard.className = 'recipe-card';
    newCard.setAttribute('data-category', category.toLowerCase());
    newCard.innerHTML = `
        <img src="${imageUrl}" alt="${recipeName}">
        <h3>${recipeName}</h3>
        <p class="category">${category.charAt(0).toUpperCase() + category.slice(1)}</p>
        <p class="time">⏱️ ${time}</p>
        <p class="description">${description}</p>
        <button class="btn-secondary" onclick="showRecipeDetails('${recipeName}')">Узнать рецепт</button>
    `;
    recipesGrid.appendChild(newCard);
}

// Функция для получения рецепта по названию
function getRecipe(recipeName) {
    return recipes[recipeName] || null;
}

// Функция для получения всех рецептов категории
function getRecipesByCategory(category) {
    return Object.keys(recipes).filter(recipeName => 
        recipes[recipeName].category.toLowerCase() === category.toLowerCase()
    );
}

// Функция для расчета ингредиентов на новое количество порций
function calculateIngredients(recipeName, newServings) {
    const recipe = recipes[recipeName];
    if (!recipe) return null;

    const ratio = newServings / recipe.servings;
    return {
        servings: newServings,
        ingredients: recipe.ingredients.map(ingredient => {
            // Простая попытка масштабирования ингредиентов
            return ingredient;
        })
    };
}

// Функция для поиска рецептов по ключевому слову
function searchRecipes(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return Object.keys(recipes).filter(recipeName => 
        recipeName.toLowerCase().includes(lowerKeyword)
    );
}

// Функция для получения случайного рецепта
function getRandomRecipe() {
    const recipeNames = Object.keys(recipes);
    return recipeNames[Math.floor(Math.random() * recipeNames.length)];
}

// Функция для сортировки рецептов по времени приготовления
function sortRecipesByTime() {
    const recipesGrid = document.getElementById('recipesGrid');
    const cards = Array.from(recipesGrid.querySelectorAll('.recipe-card'));
    
    cards.sort((a, b) => {
        const timeA = parseInt(a.querySelector('.time').textContent);
        const timeB = parseInt(b.querySelector('.time').textContent);
        return timeA - timeB;
    });

    cards.forEach(card => recipesGrid.appendChild(card));
}

// Функция для добавления рецепта в избранное
function addToFavorites(recipeName) {
    let favorites = localStorage.getItem('favorites');
    favorites = favorites ? JSON.parse(favorites) : [];
    
    if (!favorites.includes(recipeName)) {
        favorites.push(recipeName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${recipeName} добавлен в избранное!`);
    } else {
        alert(`${recipeName} уже в избранном!`);
    }
}

// Функция для получения избранных рецептов
function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

// Функция для печати рецепта
function printRecipe(recipeName) {
    const recipe = recipes[recipeName];
    if (!recipe) return;

    const printWindow = window.open('', '_blank');
    let ingredientsHTML = '<ul>';
    recipe.ingredients.forEach(ingredient => {
        ingredientsHTML += `<li>${ingredient}</li>`;
    });
    ingredientsHTML += '</ul>';

    let instructionsHTML = '<ol>';
    recipe.instructions.forEach(instruction => {
        instructionsHTML += `<li>${instruction}</li>`;
    });
    instructionsHTML += '</ol>';

    printWindow.document.write(`
        <html>
        <head>
            <title>${recipeName}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #FF6B6B; }
                h2 { color: #4ECDC4; margin-top: 20px; }
            </style>
        </head>
        <body>
            <h1>${recipeName}</h1>
            <p><strong>Время приготовления:</strong> ${recipe.time}</p>
            <p><strong>Количество порций:</strong> ${recipe.servings}</p>
            <h2>Ингредиенты:</h2>
            ${ingredientsHTML}
            <h2>Инструкции:</h2>
            ${instructionsHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}