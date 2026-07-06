import { cn } from "@/lib/utils";

type HrProps = {
  noPadding?: boolean;
};

export function Hr({ noPadding = false }: HrProps) {
  return (
    <hr
      className={cn(
        "border-border",
        noPadding ? "my-0" : "my-4",
      )}
    />
  );
}
