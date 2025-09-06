import { Module } from '@nestjs/common';
import { ValidateTokenController } from './validate-token.controller';

@Module({
  controllers: [ValidateTokenController]
})
export class ValidateTokenModule {}
