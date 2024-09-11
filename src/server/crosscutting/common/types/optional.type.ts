
export type Optional<T, K> = Omit<T, keyof K> & Partial<K>;