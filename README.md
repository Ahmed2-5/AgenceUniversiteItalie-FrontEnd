# Agence Université Italie - Frontend



 ![version](https://img.shields.io/badge/version-1.5.0-blue.svg)  ![license](https://img.shields.io/badge/license-MIT-blue.svg) [![GitHub issues open](https://img.shields.io/github/issues/creativetimofficial/argon-dashboard-angular.svg?maxAge=2592000)](https://github.com/creativetimofficial/argon-dashboard-angular/issues?q=is%3Aopen+is%3Aissue) [![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/creativetimofficial/argon-dashboard-angular.svg?maxAge=2592000)](https://github.com/creativetimofficial/argon-dashboard-angular/issues?q=is%3Aissue+is%3Aclosed) [![Join the chat at https://gitter.im/NIT-dgp/General](https://badges.gitter.im/NIT-dgp/General.svg)](https://gitter.im/creative-tim-general/Lobby) [![Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/E4aHAQy)




**Description Project **

This project is the frontend of a web application designed for a travel agency that also specializes in assisting students with their study abroad applications.

🚀 Key Features:

Student Application Management: Helps students prepare and track their study abroad documents.
Travel & Visa Services: Provides information and assistance for booking trips and obtaining visas.
User-Friendly Interface: Developed using Angular for a smooth and responsive experience.
The frontend interacts with the backend to ensure a seamless experience for both students and administrators.




## Versions

[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/html-logo.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/argon-dashboard)[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/angular-logo.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/argon-dashboard-angular)[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/nodejs-logo.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/argon-dashboard-nodejs)




## Demo

| Dashboard Page | Icons Page | User Profile Page  | Tables Page | Login Page | Register Page  |
| --- | --- | ---  | --- | --- | ---  |
| [![Dashboard Page](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-angular/dashboard.png)](https://demos.creative-tim.com/argon-dashboard-angular/dashboard?ref=ada-github-readme)  | [![Icons Page](https://github.com/creativetimofficial/public-assets/blob/master/argon-dashboard-angular/icons.png?raw=true)](https://demos.creative-tim.com/argon-dashboard-angular/icons?ref=ada-github-readme)  | [![User Profile Page](https://github.com/creativetimofficial/public-assets/blob/master/argon-dashboard-angular/user.png?raw=true)](https://demos.creative-tim.com/argon-dashboard-angular/user?ref=ada-github-readme)  | [![Tables Page](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-angular/tables.png)](https://demos.creative-tim.com/argon-dashboard-angular/tables?ref=ada-github-readme)  | [![Login Page](https://github.com/creativetimofficial/public-assets/blob/master/argon-dashboard-angular/login.png?raw=true)](https://demos.creative-tim.com/argon-dashboard-angular/login?ref=ada-github-readme)  | [![Register Page](https://github.com/creativetimofficial/public-assets/blob/master/argon-dashboard-angular/register.png?raw=true)](https://demos.creative-tim.com/argon-dashboard-angular/register?ref=ada-github-readme)  

[View More](https://demos.creative-tim.com/argon-dashboard-angular/dashboard)



## File Structure
Within the download you'll find the following directories and files:

```
argon-dashboard-angular
├── CHANGELOG.md
├── README.md
├── angular.json
├── e2e
├── package.json
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.routing.ts
│   │   ├── components
│   │   │   ├── components.module.spec.ts
│   │   │   ├── components.module.ts
│   │   │   ├── footer
│   │   │   │   ├── footer.component.html
│   │   │   │   ├── footer.component.scss
│   │   │   │   ├── footer.component.spec.ts
│   │   │   │   └── footer.component.ts
│   │   │   ├── navbar
│   │   │   │   ├── navbar.component.html
│   │   │   │   ├── navbar.component.scss
│   │   │   │   ├── navbar.component.spec.ts
│   │   │   │   └── navbar.component.ts
│   │   │   └── sidebar
│   │   │       ├── sidebar.component.html
│   │   │       ├── sidebar.component.scss
│   │   │       ├── sidebar.component.spec.ts
│   │   │       └── sidebar.component.ts
│   │   ├── layouts
│   │   │   ├── admin-layout
│   │   │   │   ├── admin-layout.component.html
│   │   │   │   ├── admin-layout.component.scss
│   │   │   │   ├── admin-layout.component.spec.ts
│   │   │   │   ├── admin-layout.component.ts
│   │   │   │   ├── admin-layout.module.ts
│   │   │   │   └── admin-layout.routing.ts
│   │   │   └── auth-layout
│   │   │       ├── auth-layout.component.html
│   │   │       ├── auth-layout.component.scss
│   │   │       ├── auth-layout.component.spec.ts
│   │   │       ├── auth-layout.component.ts
│   │   │       ├── auth-layout.module.ts
│   │   │       └── auth-layout.routing.ts
│   │   ├── pages
│   │   │   ├── dashboard
│   │   │   │   ├── dashboard.component.html
│   │   │   │   ├── dashboard.component.scss
│   │   │   │   ├── dashboard.component.spec.ts
│   │   │   │   └── dashboard.component.ts
│   │   │   ├── icons
│   │   │   │   ├── icons.component.html
│   │   │   │   ├── icons.component.scss
│   │   │   │   ├── icons.component.spec.ts
│   │   │   │   └── icons.component.ts
│   │   │   ├── login
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.scss
│   │   │   │   ├── login.component.spec.ts
│   │   │   │   └── login.component.ts
│   │   │   ├── maps
│   │   │   │   ├── maps.component.html
│   │   │   │   ├── maps.component.scss
│   │   │   │   ├── maps.component.spec.ts
│   │   │   │   └── maps.component.ts
│   │   │   ├── register
│   │   │   │   ├── register.component.html
│   │   │   │   ├── register.component.scss
│   │   │   │   ├── register.component.spec.ts
│   │   │   │   └── register.component.ts
│   │   │   ├── tables
│   │   │   │   ├── tables.component.html
│   │   │   │   ├── tables.component.scss
│   │   │   │   ├── tables.component.spec.ts
│   │   │   │   └── tables.component.ts
│   │   │   └── user-profile
│   │   │       ├── user-profile.component.html
│   │   │       ├── user-profile.component.scss
│   │   │       ├── user-profile.component.spec.ts
│   │   │       └── user-profile.component.ts
│   │   └── variables
│   │       └── charts.ts
│   ├── assets
│   │   ├── fonts
│   │   ├── img
│   │   ├── scss
│   │   │   ├── angular-differences
│   │   │   ├── argon.scss
│   │   │   ├── core
│   │   │   └── custom
│   │   └── vendor
│   ├── browserslist
│   ├── environments
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.scss
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── tslint.json
├── tsconfig.json
└── tslint.json
```


## Browser Support

<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/chrome-logo.png?raw=true" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/firefox-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/edge-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/safari-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/opera-logo.png" width="64" height="64">
