# XIVA Multi Intent

Welcome to XIVA Multi Intent! This README will guide you through setting up and running the project.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <https://github.com/CodeSlash-ai/xiva-flow>

   cd XIVA-multi-intent

   ```

2. **Install Dependencies:**
   npm install

3. **Start the Development Server:**
   npm run dev

Your application will be available at `http://localhost:3000`.

4. **Enforcing Best Practices Via Husky:**

This command gives execute permission to the pre-commit script.

    chmod +x .husky/pre-commit

Whenever, you make commit, husky will auto formte the code first then try to fix all linting errors.

## Building for Production

To build your application for production:

This command generates an optimized production build
npm run build

## Linting and Code Formatting

- To lint your code:
  `npm run lint`

- To automatically fix linting issues:
  `npm run lint:fix`

- To format your code using Prettier:
  `npm run format`


## Building for Production with Docker

To build your application for production:

sudo docker build -t xiva-app .

## Run the app via follwoing command

To build your application for production:

sudo docker run -it --name xiva-app -p 3001:4173 xiva-app 

Open the terminal and browse the follwoing url: http://localhost:3001
