# Используем официальный образ OpenJDK 21
FROM openjdk:21

# Установка директории приложения
WORKDIR /app

# Копирование JAR-файла из директории target в контейнер
COPY target/house-sharing-backend-1.0-SNAPSHOT.jar app.jar

# Команда для запуска приложения при старте контейнера
CMD ["java", "-jar", "app.jar"]