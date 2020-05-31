import { ITokenLocation } from './token-location.i';

export interface IToken {
  type: string;
  value: string;
  length: number;
  format: string;
  range: number[];
  loc: {
    start: ITokenLocation;
    end: ITokenLocation;
  };
}
