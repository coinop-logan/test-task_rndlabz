// config/tokens.ts
import { TokenConfig } from '../common/models/TokenConfig'

export const tokens: TokenConfig[] = [
  { label: 'USD/TON', id: 'the-open-network', inverted: false },
  { label: 'TON/USD', id: 'the-open-network', inverted: true },
];
