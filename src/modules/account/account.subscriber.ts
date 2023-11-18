import {
  EventSubscriber,
  type InsertEvent,
  type UpdateEvent,
  type EntitySubscriberInterface,
} from 'typeorm';

import { Account } from './account.entity';
import { generateHash } from 'commom/utils';

@EventSubscriber()
export class AccountSubscriber implements EntitySubscriberInterface<Account> {
  listenTo(): typeof Account {
    return Account;
  }

  beforeInsert(event: InsertEvent<Account>): void {
    if (event.entity.password) {
      event.entity.password = generateHash(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<Account>): void {
    // FIXME check event.databaseEntity.password
    const entity = event.entity as Account;

    if (entity.password !== event.databaseEntity.password) {
      entity.password = generateHash(entity.password!);
    }
  }
}
