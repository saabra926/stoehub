StepHub is a Next.js ecommerce project with MongoDB-backed authentication, account settings, order creation, admin controls, and a responsive storefront UI.

## Getting Started

Create `.env.local` from `.env.example` and fill in:

- `MONGODB_URI` for MongoDB or MongoDB Atlas
- `JWT_SECRET` for signed httpOnly auth cookies
- `NEXT_PUBLIC_APP_URL` for reset-link generation
- `ADMIN_EMAILS` as a comma-separated list of emails that should become admins
- `SITE_CONTACT_EMAIL`, `SITE_CONTACT_WHATSAPP`, and optional `SITE_CONTACT_LOCATION` as default contact details (admins can override these from `/admin`)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM` to email password reset links

Without SMTP configured, forgot-password still works in development and returns the reset link in the API response for local testing.

The first registered account is also promoted to `admin` so a fresh database can be managed immediately.

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Key routes:

- `/login`, `/signup`, `/forgot-password`, `/reset-password`
- `/settings` for profile and password changes
- `/admin` for admin-only user and order overview
- `/products` and `/cart` for shopping and checkout

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
