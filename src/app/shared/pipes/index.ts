import { OrdinalDayPipe } from './ordinal-day';
import { LongSpaceDatePipe } from './long-space-date';
import { DateWithDashesPipe } from './date-w-dashes';
import { ConcatHTMLStringsPipe } from './concat-html-strings';
import { SafeHtmlPipe } from './safe-html.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { StringTrimPipe } from './str-trim.pipe';
import { ElapsedTimePipe } from './elapsed-time.pipe';
import { CurrentOrStartingBidPipe } from './current-or-starting-bid.pipe';
import { TimeUntilPipe } from './time-until.pipe';
import { PrettyPrintLocationStrPipe } from './pretty-print-loc-str.pipe';
import { PrettyPrintLocationObjPipe } from './pretty-print-loc-obj.pipe';
import { DateFormatPipe } from './date-format.pipe';

export const PIPES = [
  DateFormatPipe,
  OrdinalDayPipe,
  LongSpaceDatePipe,
  DateWithDashesPipe,
  ConcatHTMLStringsPipe,
  SafeHtmlPipe,
  CapitalizePipe,
  TimeAgoPipe,
  TimeUntilPipe,
  StringTrimPipe,
  ElapsedTimePipe,
  CurrentOrStartingBidPipe,
  PrettyPrintLocationStrPipe,
  PrettyPrintLocationObjPipe,
];

export * from './ordinal-day';
export * from './long-space-date';
export * from './date-w-dashes';
export * from './concat-html-strings';
export * from './safe-html.pipe';
export * from './capitalize.pipe';
export * from './time-ago.pipe';
export * from './time-until.pipe';
export * from './str-trim.pipe';
export * from './elapsed-time.pipe';
export * from './current-or-starting-bid.pipe';
export * from "./pretty-print-loc-str.pipe";
export * from "./pretty-print-loc-obj.pipe";
export * from "./date-format.pipe";