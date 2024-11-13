import { TokenConfig } from '../common/models/TokenConfig'

export const tokens: TokenConfig[] = [
  { label: 'TON/USD', id: 'the-open-network', inverted: false },
  { label: 'USD/TON', id: 'the-open-network', inverted: true },
  { label: 'BTC/USD', id: 'bitcoin', inverted: false },
  { label: 'USD/BTC', id: 'bitcoin', inverted: true },
  { label: 'ETH/USD', id: 'ethereum', inverted: false },
  { label: 'USD/ETH', id: 'ethereum', inverted: true },
];
