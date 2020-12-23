import { environment } from '../../environments/environment';
import {Logger} from './log4js';

const crypto = require('crypto');

export function sha256(str: string) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

export function md5(str: string) {
  return crypto.createHash('md5').update(str).digest('hex');
}


export function testUUID(uuid) {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}-(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4}-(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4}-(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4}-(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{12}$/.test(uuid);
}

export function idToUUID(data) {
  return toUUID(data, environment.idSecret);
}

export function uuidToId(uuid) {
  return deUUID(uuid, environment.idSecret);
}

export function toUUID(data, key) {
  const encrypted = aesEncrypt(data, key);
  return encrypted.slice(0,8) + '-' + encrypted.slice(8,12) + '-' + encrypted.slice(12,16) + '-' + encrypted.slice(16,20) + '-' + encrypted.slice(20);
}

export function deUUID(uuid: string, key) {
  uuid = uuid.replace(/-/g, '');
  return aesDecrypt(uuid, key);
}

export function aesEncrypt(data, key) {
  data = data.toString();
  const cipher = crypto.createCipheriv('aes-128-cbc', key, environment.ivSecret);
  try {
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }catch (e) {
    Logger.error('crypto aesEncrypt error for :' + data + ' : ' + e.toString());
  }
  return null;
}

export function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, environment.ivSecret);
  try {
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }catch (e) {
    Logger.error('crypto aesDecrypt error for :' + encrypted + ' : ' + e.toString());
  }
  return null;
}
