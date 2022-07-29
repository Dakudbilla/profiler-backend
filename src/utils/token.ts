import jwt from 'jsonwebtoken';
import User from '@/resources/user/user.interface';
import Token from '@/utils/interfaces/token.interface';

/**
 * @description This function takes in user and returns a signed jwt token
 * @param user
 * @returns the signed jwt token
 */
export const createToken = (user: User) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    });
};

/**
 * @description This function takes in a jwt token, decodes it and sends back the decoded parameters
 * @param user
 * @returns the signed jwt token
 */
export const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) {
                    return reject(err);
                }
                resolve(payload as Token);
            }
        );
    });
};

export default { createToken, verifyToken };
