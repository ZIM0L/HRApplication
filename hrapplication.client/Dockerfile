FROM node:18

WORKDIR /app

# Kopiowanie paczek i instalacja
COPY package*.json ./
RUN npm install

# Kopiowanie reszty kodu
COPY . .

# Otwieramy port Vite
EXPOSE 5173

# Uruchomienie dev servera Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
