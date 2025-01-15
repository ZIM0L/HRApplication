export const FormatDate = (isoDate : string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Dodaj zero wiod�ce
    const day = String(date.getDate()).padStart(2, '0'); // Dodaj zero wiod�ce
    const hours = String(date.getHours()).padStart(2, '0'); // Dodaj zero wiod�ce
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Dodaj zero wiod�ce

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
// Funkcja do formatowania daty na "dd-mm-yyyy"
export const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Zwracamy dat� w formacie dd-mm-yyyy
};

// Funkcja do formatowania daty na "yyyy-mm-dd" (do zapisu)
export const formatDateToDatabase = (date: string): string => {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`; // Zwracamy dat� w formacie yyyy-mm-dd
};