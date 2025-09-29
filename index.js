// ## Zadanie 1

// Treść zadania

// Napisz funkcję przetwarzającą tablicę obiektów osób. Funkcja powinna generować pseudonim na podstawie określonych zasad i dodawać go do każdego obiektu osoby, gdy jest to możliwe.

// Wytyczne:

// - Pobierz trzy ostatnie litery imienia, odwróć ich kolejność i zapisz wynik
// - Weź pierwsze trzy litery nazwiska, odwróć ich kolejność  i dodaj to do wyniku z punktu a).
// - Sformatuj połączony wynik tak, aby pseudonim zaczynał się od wielkiej litery, a reszta liter była mała.
// - Dodaj ten pseudonim jako nową właściwość do obiektu osoby.
// - Jeśli firstName lub lastName ma mniej niż trzy znaki (pomiń znaki białe) lub nie jest typu string, nie dodawaj właściwości pseudonimu dla tej osoby.

const people = [
  {
    firstName: false,
    lastName: 2,
  },
  {
    firstName: "Roman",
    lastName: "Kowalski",
  },

  {
    firstName: "Halina",
    lastName: "Malina",
  },
  {
    firstName: "B",
    lastName: "22",
  },
  {
    firstName: "Jan",
    lastName: "Nowak",
  },
  {
    firstName: "Kamil",
    lastName: null,
  },
];

function generateNickname(people) {
  return (
    people
      // Pobierz trzy ostatnie trzy litery imienia, odwróć ich kolejność i zapisz wynik
      .filter((person) => {
        return (
          // Jeśli firstName lub lastName ma mniej niż trzy znaki (pomiń znaki białe) lub nie jest typu string, nie dodawaj właściwości pseudonimu dla tej osoby.
          typeof person.firstName === "string" &&
          typeof person.lastName === "string" &&
          person.firstName.trim().length >= 3 &&
          person.lastName.trim().length >= 3
        );
      })
      .map((person) => {
        // Pobierz trzy ostatnie trzy litery imienia, odwróć ich kolejność i zapisz wynik
        const lastTheeLettersOfFirstName = person.firstName
          .slice(-3)
          .split("")
          .reverse()
          .join("");

        // - Weź pierwsze trzy litery nazwiska, odwróć ich kolejność  i dodaj to do wyniku z punktu a).
        const firstThreeLettersOfLastName = person.lastName
          .slice(0, 3)
          .split("")
          .reverse()
          .join("");

        //   Sformatuj połączony wynik tak, aby pseudonim zaczynał się od wielkiej litery, a reszta liter była mała.
        const combinedNickname =
          lastTheeLettersOfFirstName + firstThreeLettersOfLastName;
        const formattedNickname =
          combinedNickname.charAt(0).toUpperCase() +
          combinedNickname.slice(1).toLowerCase();

        //   Dodaj ten pseudonim jako nową właściwość do obiektu osoby.
        person.nickname = formattedNickname;

        return person;
      })
  );
}

// ## Zadanie 2

// **Treść zadania:**

// Stwórz funkcję, która przetworzy tablicę osób z pierwszego zadania (Należy wykorzystać wynik wywołania funkcji z pierwszego zadania), zwracając tylko osoby, które mają przypisany pseudonim oraz dodając nowe pole age do każdej osoby.

// **Wytyczne:**

// - Filtruj tablicę, aby zawierała tylko osoby z pseudonimem.
// - Oblicz liczbę liter w imieniu i nazwisku każdej osoby.
// - Jeśli suma liter jest parzysta, przypisz ją jako age. Jeśli nieparzysta, age oblicz jako sumę liter w kluczach firstName , lastName i nickname pobieranych dynamicznie podzieloną przez indeks osoby w tablicy ( jeżeli index wynosi 0 zastąp go 1 )
// - Dodaj pole age do każdego obiektu osoby.
// - Użyj odpowiedniej metody do wyciagnięcia kluczy z obiektu oraz reduce w notacji łańcuchowej do zliczenia liter w kluczach.
// - Zadbaj o to by wiek był zaokrąglony w górę (odszukaj potrzebnej informacji w internecie).

// - Filtruj tablicę, aby zawierała tylko osoby z pseudonimem. <--- Zrobione w 1 zadaniu, wygenerowana tablica posiada tylko i wylacznie uzytkownikow, ktorzy maja nickname.
const peopleWithNicknames = generateNickname(people);

function modifyPeopleWithNicknames(peopleWithNicknames) {
  //Filtrowanie zrobione dla sportu :D

  return peopleWithNicknames
    .filter((person) => person.nickname)
    .map((person, index) => {
      const firstNameLength = person.firstName.length;
      const lastNameLength = person.lastName.length;
      const sumLength = firstNameLength + lastNameLength;

      const indexReplacement = index === 0 ? 1 : index;

      // Oblicz liczbę liter w imieniu i nazwisku każdej osoby.
      //   - Jeśli suma liter jest parzysta, przypisz ją jako age.

      if (sumLength % 2 === 0) {
        person.age = sumLength;
      }
      //   Jeśli nieparzysta, age oblicz jako sumę liter w kluczach firstName , lastName i nickname pobieranych dynamicznie podzieloną przez indeks osoby w tablicy ( jeżeli index wynosi 0 zastąp go 1 )
      else {
        const nicknameLength = person.nickname.length;
        const totalLength = firstNameLength + lastNameLength + nicknameLength;
        // Dodaj pole age do każdego obiektu osoby.
        // - Zadbaj o to by wiek był zaokrąglony w górę (odszukaj potrzebnej informacji w internecie).
        person.age = Math.ceil(totalLength / indexReplacement);
      }

      //   Użyj odpowiedniej metody do wyciagnięcia kluczy z obiektu oraz reduce w notacji łańcuchowej do zliczenia liter w kluczach.
      function sumKeyLengths(person) {
        return Object.keys(person).reduce((acc, next) => {
          return acc + next.length;
        }, 0);
      }

      const totalKeyLength = sumKeyLengths(person);

      //   console.log(totalKeyLength);

      return person;
    });
}

// ## Zadanie 3

// **Treść zadania:**

// Stwórz funkcję, która analizuje tablicę osób z drugiego zadania i znajduje najczęściej występującą literę w polach firstName, lastName oraz nickname dla każdej osoby. Wynik powinien zawierać literę i jej liczbę wystąpień, a także określić, co zrobić w przypadku, gdy dwie litery mają tę samą liczbę wystąpień.

// **Wytyczne:**

// - Przetwarzaj każdy obiekt osoby, analizując pola firstName, lastName, i nickname.
// - Zliczaj wystąpienia każdej litery w tych polach i znajdź najczęściej występującą literę.
// - Jeżeli dwie lub więcej liter mają tę samą liczbę wystąpień i jest to najwyższa wartość, wybierz literę, która występuje pierwsza w alfabecie.
// - Zwróć nową tablicę z obiektami, które zawierają imię, nazwisko, pseudonim oraz dodaj nową właściwość do każdej osoby o nazwie mostCommonLetter, której wartością będzie obiekt z kluczem litery oraz ilością jej wystąpień.

const finalPeople = modifyPeopleWithNicknames(peopleWithNicknames);

function findMostCommonLetter(text) {
  const counts = {};
  const cleanText = text.toLowerCase().replace(/\s/g, "");

  let maxCount = 0;
  let mostCommonLetter = "";

  // Zliczaj wystąpienia każdej litery w tych polach i znajdź najczęściej występującą literę.

  for (const char of cleanText) {
    if (char >= "a" && char <= "z") {
      counts[char] = (counts[char] || 0) + 1;

      const currentCount = counts[char];

      // - Jeżeli dwie lub więcej liter mają tę samą liczbę wystąpień i jest to najwyższa wartość, wybierz literę, która występuje pierwsza w alfabecie.

      if (
        currentCount > maxCount ||
        (currentCount === maxCount && char < mostCommonLetter)
      ) {
        maxCount = currentCount;
        mostCommonLetter = char;
      }
    }
  }

  if (mostCommonLetter) {
    return { [mostCommonLetter]: maxCount };
  }
  return {};
}

// Funkcja główna przetwarzająca całą tablicę osób
function analyzeModifiedPeople(finalPeople) {
  // - Przetwarzaj każdy obiekt osoby, analizując pola firstName, lastName, i nickname.
  return finalPeople.map((person) => {
    // 1. Łączenie wartości z wybranych pól
    const combinedText = person.firstName + person.lastName + person.nickname;

    // 2. Znajdź najczęściej występującą literę (Zliczaj wystąpienia...)
    const commonLetterResult = findMostCommonLetter(combinedText);

    // Zwróć nową tablicę z obiektami, które zawierają imię, nazwisko, pseudonim oraz dodaj nową właściwość do każdej osoby o nazwie mostCommonLetter, której wartością będzie obiekt z kluczem litery oraz ilością jej wystąpień.
    return {
      firstName: person.firstName,
      lastName: person.lastName,
      nickname: person.nickname,
      // W poleceniu nie ma nic na temat age, ale w przykladzie z danymi wyjsciowymi jest podane age wiec zostawiam to zakomentowane:
      // age: person.age,

      mostCommonLetter: commonLetterResult,
    };
  });
}

const analyzedPeople = analyzeModifiedPeople(finalPeople);
console.log(analyzedPeople);
