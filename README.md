# HR Application


![apple-touch-icon](https://github.com/user-attachments/assets/feb504a8-776d-4a2a-bcf7-dced6cee5675)

Aplikacja do **zarządzania zasobami ludzkimi (HR)** zbudowana w oparciu o **.NET Core** .  

---

> 🚀 Aplikacja została stworzona w celu usprawnienia procesów HR i poprawy efektywności organizacji.  

## 📋 Wymagania

Do uruchomienia aplikacji wystarczy:

- **.NET SDK 8.0** – wymagane do budowania i uruchamiania projektu  
- **SQLite** – używana jako baza danych (plik już znajduję się w repo `.db`)  
- **Node.js + npm**  

---

## 💻 Jak uruchomić (Local)

```bash
   git clone https://github.com/ZIM0L/HRApplication.git
   cd your-repo-name
   cd HRApplication.Server
   dotnet run
```
Strona aplikacji będzie dostępna po uruchomieniu frontendu pod adresem:  
[http://localhost:5173/](http://localhost:5173/)

## Funkcjonalności

⚠️ **W trakcie rozwoju:** Niektóre funkcjonalności są jeszcze w fazie developmentu.

- Dashboard to centralny panel w aplikacji, który daje szybki przegląd najważniejszych informacji i aktywności w systemie. Użytkownik z poziomu tego panelu może w prosty sposób zobaczyć podsumowanie kluczowych danych bez konieczności przeglądania wszystkich modułów.
  
<img width="1876" height="958" alt="image" src="https://github.com/user-attachments/assets/155d7f68-f3b2-49e8-a964-d7965ec1c7a9" />


### 1. Podstawowe funkcje konta:
- Rejestracja i logowanie pracownika lub administratora.
- Zarządzanie danymi profilu (imię, nazwisko, kontakt, zdjęcie itp.).
- Zmiana hasła i ustawień bezpieczeństwa.
- Resetowanie hasła w razie potrzeby.
- Zmiana zdjęcia profilowego
- Wylogowanie z systemu.

<img width="1860" height="923" alt="image" src="https://github.com/user-attachments/assets/db582284-5e0e-499a-9af3-f711bffb9f2c" />

### 2. Zarządzanie użytkownikami
- Edycja profilu użytkownika.
- Przypisywanie ról (np. HR, manager, kandydat).
- Wysyłanie zaproszeń do kandydatów na wybrane stanowiska.
- Śledzenie statusu zaproszeń (aktywne/nieaktywne, zaakceptowane, odrzucone) ![In Development](https://img.shields.io/badge/status-in%20development-orange)
<img width="1862" height="924" alt="image" src="https://github.com/user-attachments/assets/6b939918-0188-492e-91e7-5bea4649e6ae" />

<img width="1862" height="924" alt="image" src="https://github.com/user-attachments/assets/6e489e02-58ab-45d5-be39-b859f6cc55c5" />

<img width="1862" height="924" alt="image" src="https://github.com/user-attachments/assets/1b8342fc-d493-4703-afbc-2e06b42c30fa" />

### 3. Kalendarz   

- Przegląd terminów różnych wydarzeń HR.
- Przypomnienia o zbliżających się wydarzeniach.
- Filtrowanie wydarzeń według stanowisk lub kategorii.
- Dodawanie, edycja oraz usuwanie wydarzeń.
- Możliwość wyboru widoku według dnia, tygodnia lub miesiąca.

<img width="1862" height="924" alt="image" src="https://github.com/user-attachments/assets/8187669d-7148-4371-849c-965b096a86e8" />

<img width="1860" height="923" alt="image" src="https://github.com/user-attachments/assets/961dd166-9bfd-4bf4-be1b-d8e95bf8c0e3" />

### 4. Zarządzanie stanowiskami 
- Dodawanie nowych stanowisk w systemie.
- Aktywacja lub Dezaktywacja stanowisk.
- Oznaczanie, czy na dane stanowisko trwa rekrutacja.
- Edycja szczegółów stanowiska, np. nazwy czy opisu.

<img width="1860" height="923" alt="image" src="https://github.com/user-attachments/assets/27f634f6-716f-462c-88a5-8e94ef3dcb43" />

### 5. Informacje o organizacji 
- Przegląd podstawowych danych organizacji, takich jak nazwa, branża, lokalizacja.
- Możliwość aktualizacji informacji kontaktowych i opisu firmy.

<img width="1860" height="923" alt="image" src="https://github.com/user-attachments/assets/bd4bb72c-1956-40c0-af2a-27203bbac88c" />

### 6. Plan grafikowy 
- Dodawanie zmian pracowników do planu grafiku.
- Przypisywanie zmian dziennie, dla określonego zakresu dni lub całego miesiąca.
- Przegląd przypisanych zmian dla poszczególnych pracowników.
- Usuwanie zmian w grafiku.
- Podgląd przeszłych i przyszłych zmian w planie.

<img width="1860" height="923" alt="image" src="https://github.com/user-attachments/assets/fca38571-8cfd-4f56-a46e-f0333898414b" />

### 7. Sekcja requestów pracowników
- Pracownicy mogą zgłaszać swoje sprawy lub prośby do administratora.
- Administrator może przeglądać zgłoszenia i odpowiadać na nie bezpośrednio w systemie.
- Możliwość śledzenia statusu zgłoszenia (nowe, w trakcie rozpatrywania, zakończone).

<img width="1860" height="923" alt="image" src="https://github.com/user-attachments/assets/4b4f1fa8-24f9-475b-8728-a48594008cf4" />

### 8. Sekcja Q&A 
- Administrator dodaje często zadawane pytania i odpowiedzi dla pracowników.
- Możliwość udostępniania ważnych informacji o organizacji.
- Pracownicy mogą przeglądać pytania i odpowiedzi, aby szybko znaleźć potrzebne informacje.

<img width="1860" height="923" alt="image" src="https://github.com/user-attachments/assets/538b5979-281b-4447-8709-dc86a82109cf" />

<img width="1860" height="923" alt="image" src="https://github.com/user-attachments/assets/bb4c9529-3bc4-42f5-9300-786bf914d476" />
