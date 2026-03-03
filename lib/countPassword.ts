import { Element } from "./generated/prisma/client";

export function countPassword(elements: Element[]) {
  const passwordCounts = new Map<string, number>();

  elements.forEach((element) => {
    const password = element.password;
    if (password) {
      if (passwordCounts.has(password)) {
        passwordCounts.set(password, (passwordCounts.get(password) || 0) + 1);
      } else {
        passwordCounts.set(password, 1);
      }
    }
  });

  let uniquePasswordCount = 0;
  let repeatedPasswordsCount = 0;

  passwordCounts.forEach((count) => {
    if (count === 1) {
      uniquePasswordCount++;
    } else {
      repeatedPasswordsCount++;
    }
  });

  return { unique: uniquePasswordCount, repeated: repeatedPasswordsCount };
}
