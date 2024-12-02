import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from './app/actions/authActions';
import { compare } from 'bcryptjs';

export default {
  providers: [
    Credentials({
      name: 'credentials',
      async authorize(creds) {
        // Basic validation
        if (!creds || !creds.email || !creds.password) {
          return null;
        }

        const { email, password } = creds;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return null;
        }

        // Validate password length
        if (password.length < 6) {
          return null;
        }

        const user = await getUserByEmail(email);

        if (
          !user ||
          !user.passwordHash ||
          !(await compare(password, user.passwordHash))
        )
          return null;

        return user;
      },
    }),
  ],
};
