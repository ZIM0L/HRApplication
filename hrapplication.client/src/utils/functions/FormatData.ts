export const FormatDate = (isoDate : string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Dodaj zero wiod¹ce
    const day = String(date.getDate()).padStart(2, '0'); // Dodaj zero wiod¹ce
    const hours = String(date.getHours()).padStart(2, '0'); // Dodaj zero wiod¹ce
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Dodaj zero wiod¹ce

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}