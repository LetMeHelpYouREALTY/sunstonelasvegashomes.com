import type { BlogPost } from "@/lib/blog";

type GroupKey = string | number | symbol;

type GroupFunction<T> = (item: T, index?: number) => GroupKey;

export function getPostsByGroupCondition<T>(
  items: T[],
  groupFunction: GroupFunction<T>,
): Record<GroupKey, T[]> {
  const result: Record<GroupKey, T[]> = {};

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const groupKey = groupFunction(item, index);

    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    result[groupKey].push(item);
  }

  return result;
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (left, right) =>
      Math.floor(
        (right.data.modDatetime ?? right.data.pubDatetime).getTime() / 1000,
      ) -
      Math.floor(
        (left.data.modDatetime ?? left.data.pubDatetime).getTime() / 1000,
      ),
  );
}
