import { IOptions } from './options.i';
import { IToken } from './token/token.i';

export type IMode = (token: IToken, options?: IOptions) => boolean;
