# AdvancedAngularForms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2.

# The project has 2 branches: main and initial-project-state.

The initial project state is located in the main branch.
If you just need the initial state of the course project, then just clone the main branch.

# Project Description
The project is a simple Angular workspace generated by Angular CLI. It consists of 2 projects:

forms-playground - Regular Angular application that contains playgrounds for different topics: Template-Driven forms, Reactive Forms, etc;
custom-form-controls - Angular library where will be created custom components like Select and Rating picker.

# How to start
This project has been created using Angular CLI, so you can start the project as any other Angular project.
If you start the project from the main branch, then just run

--npm install
--npm run start - starts the forms-playground project;

If you start the final application from other branches:

npm install
npm run build --project custom-form-controls

You could add --watch to build the library with custom components (if you don't want to run it in watch-mode then remove --watch)

-npm run start - starts the forms-playground project;

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
