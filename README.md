# Duolibras Teacher

![Duolibras Teacher](https://your-image-url.com)

## Overview
Duolibras Teacher is an educational platform designed to help teachers create, manage, and track Brazilian Sign Language (Libras) learning activities. It provides an intuitive interface for educators to build interactive lessons, monitor student progress, and enhance the learning experience.

## Features
- **Course Creation**: Easily design and organize lessons focused on Libras.
- **Analytics Dashboard**: Gain insights into learning trends and student progress.
- **Multi-Device Support**: Accessible on desktop and mobile devices.

## Technologies Used
- **Frontend**: React (Vite.js)
- **Authentication**: JWT-based authentication system
- **Storage**: AWS S3 for media storage
- **Payments**: Stripe integration creating paid courses

## Installation
### Prerequisites
- Node.js & npm installed
- PostgreSQL database running
- AWS credentials configured for S3 (optional for media storage)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/duolibras/duolibras-teacher.git
   cd duolibras-teacher
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/duolibras
   JWT_SECRET=your_secret_key
   AWS_ACCESS_KEY=your_aws_access_key
   AWS_SECRET_KEY=your_aws_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Run the database migrations:
   ```sh
   pnpm db:migrate:dev
   ```

5. Start the development server:
   ```sh
   pnpm dev
   ```

## Contributing
Contributions are welcome! Feel free to fork this repository, create a feature branch, and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For questions or collaboration, reach out via [LinkedIn](https://linkedin.com/in/amauri-lima) or open an issue in this repository.

