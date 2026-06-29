import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const processor = remark().use(remarkGfm).use(html);

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await processor.process(markdown);
  return String(result);
}
