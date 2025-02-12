import React from "react";
import { mount } from "cypress/react18";
import Actions from "../../components/Actions/Actions"; // Шлях до компонента


describe("Actions Component", () => {
  it("renders the Actions component with all items", () => {
    mount(<Actions />); // Рендеримо компонент

    // Перевіряємо наявність заголовка
    cy.get(".actions h2").should("contain.text", "Actions");

    // Перевіряємо кількість елементів
    cy.get(".action-item").should("have.length", 9);

    // Перевіряємо, що кожен елемент має правильний текст
    const labels = [
      "Home", "Gas", "Other", "Videos",
      "Games", "Food", "Shops", "Travel", "Education"
    ];

    labels.forEach((label, index) => {
      cy.get(".action-item").eq(index).within(() => {
        cy.get("p").should("contain.text", label);
      });
    });
  });
});
