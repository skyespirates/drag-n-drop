import { Component } from "./base-component";
import { projectState } from "../state/project-state";
import { Autobind } from "../decorators/autobind";
import { Validatable, validate } from "../utils/validation";
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")
    );
    this.configure();
  }
  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
  renderContent() {}
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    // valdating entered input
    const titleValidation: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidation: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidation: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
    };

    if (
      !validate(titleValidation) ||
      !validate(descriptionValidation) ||
      !validate(peopleValidation)
    ) {
      alert("Invalid input, please try again!");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }
  private clearingInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    const enteredInputs = this.gatherUserInput();
    if (Array.isArray(enteredInputs)) {
      const [title, desc, people] = enteredInputs;
      projectState.addProject(title, desc, people);
      this.clearingInputs();
    }
  }
}
