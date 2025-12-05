# MyDirectory - Assignment 2 (COMP2068)

## Description
A small directory CRUD application built with Node.js, Express, Handlebars, MongoDB (Mongoose), and Passport for authentication. Supports local username/password and GitHub OAuth. Public page with keyword search. Authenticated users can create/edit/delete items and upload images.

## Live site
(put your live site link here after deployment)

## Features
- Public listing with keyword search
- User registration & login (passport-local)
- Login with GitHub (passport-github2)
- Private CRUD pages (Add, Edit, Delete) for authenticated users
- File uploads (images) using multer

## Setup
1. Copy files into a folder.
2. `npm install`
3. Create `.env` from `.env.example` and set values.
4. `npm run dev` (for development) or `npm start`.

## Notes on academic integrity
If external code was used, cite here and explain its function. (No more than 10% of code may be external.)

## Additional Feature
1. Keyword search on the public listing (`?q=...`).
2. File uploads (image) stored in `public/uploads`.
