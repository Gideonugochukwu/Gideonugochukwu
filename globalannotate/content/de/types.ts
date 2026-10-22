// German content shapes mirror the Chinese ones (same English source
// structure); only the <head> metadata differs: no keyword list, and title /
// description lengths follow Google's limits instead of Baidu's.
import type { ZhServiceContent } from "../zh/types";

export type DeMeta = { title: string; description: string };
export type QA = { q: string; a: string };
export type DeServiceContent = Omit<ZhServiceContent, "meta"> & { meta: DeMeta };
