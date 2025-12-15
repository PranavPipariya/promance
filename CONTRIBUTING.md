# Contributing to PRomance

Thank you for your interest in contributing to PRomance! We welcome all contributions.

## Getting Started

1. **Fork the repository**
   ```bash
   gh repo fork PranavPipariya/promance
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/promance.git
   cd promance
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Add your GitHub token to `.env.local`

5. **Run the development server**
   ```bash
   pnpm dev
   ```

## Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where necessary
   - Update documentation if needed

3. **Test your changes**
   ```bash
   pnpm build
   pnpm dev
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

## Commit Message Convention

We follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## Pull Request Process

1. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request**
   - Go to the repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Submit the PR

3. **Wait for CodeRabbit Review**
   - CodeRabbit will automatically review your PR
   - Address any feedback or suggestions
   - Request review from maintainers

4. **Merge**
   - Once approved, your PR will be merged
   - Thank you for contributing!

## Code Style

- Use TypeScript for all new code
- Follow existing patterns in the codebase
- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for complex functions

## Questions?

Feel free to open an issue if you have any questions!
