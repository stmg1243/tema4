const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Обработчик POST-запроса
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    
    console.log('Received data:', req.body); // Отладочное сообщение

    // Проверяем, что поле name существует и не является пустым
    if (!name) {
        return res.status(400).send('Имя обязательно.');
    }

    // Обрезаем пробелы в имени
    const trimmedName = name.trim();

    // Проверка имени
    if (trimmedName.length < 2) {
        return res.status(400).send('Имя должно содержать минимум 2 символа.');
    }
    
    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Некорректный email.');
    }
    
    // Проверка пароля
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).send('Пароль должен содержать минимум 8 символов, включая строчные, заглавные буквы и цифры.');
    }

    // Если все проверки пройдены, отправляем успешный ответ
    res.send('Регистрация успешна!');
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
