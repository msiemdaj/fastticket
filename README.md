# FastTicket

[FastTicket DEMO](https://www.fastticket.pl/)

Demo application made in purpose to show my experience level and knowledge of technologies used in this project. The app was developed with use of [Laravel framework](https://laravel.com/) and [React](https://reactjs.org/) along with the [Inertia.js](https://inertiajs.com/)

> Picture below shows admin dashboard with it's functinality on the preview of a ticket that was created by user.

![fastticket](https://user-images.githubusercontent.com/52047912/156773205-1b97f644-dfc5-4681-a047-014fe7c50bbb.png)


## Technologies used

- [Laravel framework](https://laravel.com/)
- [React](https://reactjs.org/)
- [Inertia.js](https://inertiajs.com/)
- [Bootstrap](https://getbootstrap.com/)


## Functionality

Project provides functions that you would expect from a helpdesk application, such as:
- Fully manageable users module with role system
- Searchable table with ongoing tickets fully customizable with use of filters
- Possibiltiy to create new tickets and manage them by specific users
- Activity log which helps to track all changes performed on certain ticket
- Queue based notifications to let user know about events both in the app and directly on email
- Policies to authorize users to perform certain actions in application
- Users dashboard


## Installation

Clone repository:

```sh
git clone https://github.com/msiemdaj/fastticket
cd fastticket
```


Install PHP dependencies:

```sh
composer install
```


Install NPM dependencies

```sh
npm install
```

Build assets:

```sh
npm run dev
```


Setup .env file:

```sh
cp .env.example .env
```


Generate app key:

```sh
php artisan key:generate
```

Create database and run migrations:

```sh
php artisan migrate --seed
```


Link file storage:

```sh
php artisan storage:link
```


Run artisan server:

```sh
php artisan serve
```


Run queue server:

```sh
php artisan queue:work
```
