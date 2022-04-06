import { IUser } from '../entity';
import { tokenService } from './tokenService';
import { ITokenData } from '../interfaces';

class AuthService {
    public async registration(createdUser: IUser): Promise<ITokenData> {
        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData: IUser): Promise<ITokenData> {
        const { id, email } = userData;

        const { refreshToken, accessToken } = await tokenService.generateTokenPair({
            userId: id,
            userEmail: email,
        });
        await tokenService.saveToken({ userId: id, refreshToken, accessToken });

        return {
            refreshToken,
            accessToken,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
