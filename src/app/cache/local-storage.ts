import { Injectable } from '@angular/core';

@Injectable()
export class Cache {

  set(key: string, value: Object, ttl: number = null): void {
    const now = new Date();
    let expiration = null;
    if (ttl !== null) {
      expiration = new Date(now.getTime() + 1000 * ttl).getTime();
    }
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
      localStorage.removeItem(key);
    }
    return null;
  }
}

