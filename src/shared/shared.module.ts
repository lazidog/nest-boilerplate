import { Global, Module, type Provider } from '@nestjs/common';

import { IsExist, IsNotExist } from 'validations/database.validator';

const providers: Provider[] = [IsNotExist, IsExist];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
