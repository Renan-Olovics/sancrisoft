# Sancrisoft Technical Challenge

This project was developed as part of the selection process for Sancrisoft.

## Challenge Description

The full challenge details are available in the official documentation: [Sancrisoft - Technical Test](https://docs.google.com/document/d/18krEMvIGJpwqDlGXcPf0JtdaVfty8QzJgDexcvNi3tM/edit?tab=t.0#heading=h.af80tl7prv5v)

---

## Features

- Multi-step company registration form (Business Structure, Contact Person, Review & Submit)
- Server-side validation for all steps using Zod
- Accessible, keyboard-friendly navigation and forms
- Responsive design with Tailwind CSS
- Works without client-side JavaScript (progressive enhancement)
- Dynamic country flag and phone mask (JS required for best experience)
- Error and success feedback for each step
- Edit information before final submission
- Data submission to a mock API endpoint

---

## Technical Decisions

- **Next.js (App Router)**: The project uses Next.js (v15) with the `app/` directory structure, leveraging features like Server Side Rendering (SSR), Server Components, and native routing.
- **No Client-side JavaScript**: The main goal was to ensure that most of the application works even with JavaScript disabled in the browser, prioritizing accessibility, performance, and SEO.
- **Tailwind CSS**: Used for fast and responsive styling, with no extra dependencies beyond the Next.js ecosystem.
- **Componentization**: Reusable and decoupled components, following design system best practices.
- **Validation & UX**: Whenever possible, validation and navigation are handled on the server, avoiding client-side JS dependencies.

### Limitations Without JavaScript

- Most features work without JS, including navigation, forms, and feedback.
- Some advanced interactions, such as dynamically updating the country flag in the phone field, require JavaScript for a better user experience.

---

## Project Structure

- `src/app/` — Next.js App Router pages and layout
- `src/components/atoms/` — Basic UI components (Button, Input, Select, etc.)
- `src/components/molecules/` — Composite UI components (Header, Stepper, etc.)
- `src/components/pages/` — Page-level components and logic
- `src/constants/` — Static data (company types, countries, etc.)

---

## Accessibility

- All form fields are properly labeled and use semantic HTML
- Error messages are associated with fields via `aria-describedby`
- Stepper navigation uses `aria-label` and disables navigation when appropriate
- Keyboard navigation is fully supported
- Focus is managed for error fields to improve usability

---

## How to Run the Project

### Prerequisites

- Node.js v16 or higher
- Yarn or npm

### Installation

```bash
# Install dependencies
npm install
# or
yarn
```

### Development Environment

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

---

## Linting & Formatting

- ESLint and Prettier are configured for code quality and consistency
- Run `npm run lint` or `yarn lint` to check for linting errors

---

## Known Issues / Limitations

- Some advanced UI interactions (like dynamic flag update) require JavaScript
- No automated tests included
- Data is sent to a mock endpoint and not persisted

---

## Acknowledgment

Thank you to the Sancrisoft team for the opportunity to participate in the selection process. The project was developed with a focus on clarity, simplicity, and making the most of Next.js features, prioritizing accessibility and user experience even in restricted environments (without JS).

If you have any questions or suggestions, feel free to reach out!
