const FAVORITES_KEY = "livy_favorites_by_user";
const FAVORITES_CHANGED_EVENT = "livy_favorites_changed";

export interface FavoritePost {
  id: number;
  title: string;
  body: string;
}

type FavoritesByUser = Record<string, FavoritePost[]>;

const getFavoritesMap = (): FavoritesByUser => {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as FavoritesByUser;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const saveFavoritesMap = (map: FavoritesByUser): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(map));
  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
};

export const getFavoritesByUser = (userId: string): FavoritePost[] => {
  if (!userId) return [];
  const map = getFavoritesMap();
  return map[userId] ?? [];
};

export const isFavoriteForUser = (userId: string, postId: number): boolean => {
  if (!userId) return false;
  return getFavoritesByUser(userId).some((item) => item.id === postId);
};

export const addFavoriteForUser = (
  userId: string,
  post: FavoritePost,
): boolean => {
  if (!userId) return false;
  const map = getFavoritesMap();
  const current = map[userId] ?? [];
  if (current.some((item) => item.id === post.id)) return false;
  map[userId] = [...current, post];
  saveFavoritesMap(map);
  return true;
};

export const removeFavoriteForUser = (userId: string, postId: number): boolean => {
  if (!userId) return false;
  const map = getFavoritesMap();
  const current = map[userId] ?? [];
  const next = current.filter((item) => item.id !== postId);
  if (next.length === current.length) return false;
  map[userId] = next;
  saveFavoritesMap(map);
  return true;
};

export const getFavoritesChangedEventName = (): string =>
  FAVORITES_CHANGED_EVENT;
