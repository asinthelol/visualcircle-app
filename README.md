# Visual Circle

### An Electron application for uploading and downloading images.

## Features

- Search
- Upload
- Download

## Languages Used

- HTML
- SCSS
- Typescript

## How To Install

**To run Visual Circle, follow these steps**

1. Clone the reposity in terminal:

```bash
git clone https://github.com/asinthelol/visualcircle-app.git
```

2. Enter the project directory:

```bash
cd visualcircle-app
```

3. Install the dependencies:

```bash
npm install
```

4. Setup environment variables:

- Create a .env file outside the ./src directory
- Define these environment variables:
  - DB (Database name)
  - DB_HOST (Database host)
  - DB_USER (User accessing database)
  - DB_PASSWORD (User password)
  - DB_DIALECT (Language for database e.g. mysql)

5. Start the app:

```bash
npm run dev
```

## How To Use

1. Click on "Upload" in the navbar.
2. Select an image to upload and fill in the required parameters.
3. Press submit.
4. Download an image by clicking the download icon under the photo.

## Reset Database

```bash
npm run reset-db
```
