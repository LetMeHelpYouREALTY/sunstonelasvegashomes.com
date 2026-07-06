import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import IconCalendar from "@/assets/icons/IconCalendar.svg";
import { SITE } from "@/config";
import { cn } from "@/lib/utils";

dayjs.extend(utc);
dayjs.extend(timezone);

type DatetimeProps = {
  pubDatetime: string | Date;
  modDatetime?: string | Date | null;
  timezone?: string;
  size?: "sm" | "lg";
  className?: string;
};

export function Datetime({
  pubDatetime,
  modDatetime,
  timezone: postTimezone,
  size = "sm",
  className,
}: DatetimeProps) {
  const latestDatetime =
    modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime;
  const datetime = dayjs(latestDatetime).tz(postTimezone || SITE.timezone);
  const date = datetime.format("D MMM, YYYY");
  const time = datetime.format("hh:mm A");
  const isUpdated = Boolean(modDatetime && modDatetime > pubDatetime);

  return (
    <div className={cn("flex items-end space-x-2 opacity-80", className)}>
      <IconCalendar
        className={cn("inline-block size-6 min-w-[1.375rem]", {
          "scale-90": size === "sm",
        })}
      />
      {isUpdated ? (
        <span
          className={cn("text-sm italic", { "sm:text-base": size === "lg" })}
        >
          Updated:
        </span>
      ) : (
        <span className="sr-only">Published:</span>
      )}
      <span className={cn("text-sm italic", { "sm:text-base": size === "lg" })}>
        <time dateTime={datetime.toISOString()}>{date}</time>
        <span aria-hidden="true"> | </span>
        <span className="sr-only">&nbsp;at&nbsp;</span>
        <span className="text-nowrap">{time}</span>
      </span>
    </div>
  );
}
