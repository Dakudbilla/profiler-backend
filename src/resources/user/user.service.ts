import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';

class UserService {
    private user = UserModel;
    /**
     * Register new user
     */

    public async register(
        name: string,
        email: string,
        password: string,
        role: string,
        age: number
    ): Promise<String | Error> {
        try {
            const user = await this.user.create({
                name,
                email,
                password,
                role,
                age,
            });

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }

    /**
     * Login a user
     */

    public async login(
        email: string,
        password: string
    ): Promise<String | Error> {
        try {
            const user = await this.user.findOne({ email });
            if (!user) {
                throw new Error('Incorrect Credentials');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Incorrect Credentials');
            }
        } catch (error) {
            throw new Error('Login failed');
        }
    }
}

export default UserService;
