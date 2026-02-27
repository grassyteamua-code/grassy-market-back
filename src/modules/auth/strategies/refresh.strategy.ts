import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy) {
  validate(args: any): Promise<false | unknown | null> | false | unknown | null {
    return undefined;
  }
}