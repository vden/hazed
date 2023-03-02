import network1 from '../svg/network1.svg';
import network1337 from '../svg/network1337.svg';
import network250 from '../svg/network250.svg';
import network4002 from '../svg/network4002.svg';
import network5 from '../svg/network5.svg';
import { AddrMapType, MapType } from './types';

export const networkIcons: MapType = {
  1: network1,
  5: network5,
  250: network250,
  4002: network4002,
  1337: network1337
}

export const registryAddress: AddrMapType = {
  0: '0x0',
  1: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  5: '0x9C235bf2f5003096C071DE63F7C1F004071EB6a6',
  250: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  4002: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  1337: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
}