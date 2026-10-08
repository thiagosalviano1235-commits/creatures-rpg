export const STORAGE_KEY = 'terra-de-aster-save-v1';

export function saveGame(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Falha ao carregar save do localStorage:', error);
    return null;
  }
}

export function hasSave() {
  return Boolean(localStorage.getItem(STORAGE_KEY));
}
