import { tokens } from '../config/tokens';
import { TokenConfig } from '../common/models/TokenConfig'

export const getTokenConfigByLabel = (label: string): TokenConfig | null => {
  const token = tokens.find(t => t.label === label);
  if (!token) {
    return null;
  }
  return token;
}