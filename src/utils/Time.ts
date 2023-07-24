export const convertTimestampToReadableDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) {
    // Eğer tarih bugüne aitse saat bilgisini döndür
    return date.toLocaleTimeString();
  } else if (isSameDay(date, yesterday)) {
    // Eğer tarih dün gününe aitse "Dün" yazısı döndür
    return 'Yersterday';
  } else {
    // Aksi halde sadece tarih bilgisini döndür
    return date.toLocaleDateString();
  }
};

// İki tarihin aynı gün olup olmadığını kontrol eden yardımcı fonksiyon
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// Kullanım örneği
//   const timestamp1 = 1690137463742;
//   const timestamp2 = Date.now(); // Şu anki zaman damgası

//   console.log(convertTimestampToReadableDate(timestamp1)); // Örnek çıktı: "12:31:03 PM"
//   console.log(convertTimestampToReadableDate(timestamp2)); // Örnek çıktı (bugün): "6:17:25 PM"
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: any = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

// const timestamp = "2023-07-23T19:40:52.022Z";
// const formattedDate = formatDate(timestamp);
// console.log(formattedDate); // Output: "July 23, 2023, 7:40:52 PM"
