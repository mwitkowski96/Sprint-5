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
  // Pobierz trzy ostatnie trzy litery imienia, odwróć ich kolejność i zapisz wynik
  const result = people
    .filter((person) => {
      return (
        // Jeśli firstName lub lastName ma mniej niż trzy znaki (pomiń znaki białe) lub nie jest typu string, nie dodawaj właściwości pseudonimu dla tej osoby.
        typeof person.firstName === "string" &&
        typeof person.lastName === "string" &&
        person.lastName !== "null" &&
        person.firstName.trim().length >= 3 &&
        person.lastName.trim().length >= 3
      );
    })
    .map((person) => {
      let result = person.firstName.slice(-3).split("").reverse().join("");
      // - Weź pierwsze trzy litery nazwiska, odwróć ich kolejność  i dodaj to do wyniku z punktu a).
      result += person.lastName.slice(-3).split("").reverse().join("");
      //   Sformatuj połączony wynik tak, aby pseudonim zaczynał się od wielkiej litery, a reszta liter była mała.
      let firstLetter = result[0];
      let otherLetters = result.slice(1);

      firstLetter = firstLetter.toUpperCase();
      otherLetters = otherLetters.toLowerCase();

      result = firstLetter + otherLetters;

      //   Dodaj ten pseudonim jako nową właściwość do obiektu osoby.
      person.nickname = result;

      return person;
    });

  return result;
}

console.log(generateNickname(people));
