import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

type DatetimeProps = {
  pubDatetime: Date;
  modDatetime?: Date | null;
  timezoneName?: string;
};

export default function Datetime({
  pubDatetime,
  modDatetime,
  timezoneName,
}: DatetimeProps) {
  const tz = timezoneName || "America/Los_Angeles";
  const published = dayjs(pubDatetime).tz(tz).format("MMM D, YYYY");
  const modified =
    modDatetime && modDatetime.getTime() !== pubDatetime.getTime()
      ? dayjs(modDatetime).tz(tz).format("MMM D, YYYY")
      : null;

  return (
    <time
      dateTime={pubDatetime.toISOString()}
      className="text-sm text-foreground/75"
    >
      {published}
      {modified ? ` · updated ${modified}` : null}
    </time>
  );
}
