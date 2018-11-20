import { Injectable } from '@angular/core';

@Injectable()
export class Cache {

  set(key: string, value: Object, ttl: Number = null): void {
    const now = new Date();
    const expiration = ttl === null ? null : new Date(now.getTime() + ttl * 1000).getTime();
    localStorage.setItem(key, JSON.stringify([value, expiration]));
  }

  get(key: string): Object {
    const item = localStorage.getItem(key);
    if (item !== null) {
      const nowDt = new Date();
      const [value, expiration] = JSON.parse(item);
      const expirationDt = new Date(expiration);
      if (expiration === null || expirationDt > nowDt) {
        return value;
      }
    }
    return null;
  }
}

