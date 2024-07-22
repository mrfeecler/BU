export interface ICountdownTimerProps {
  targetDate: Date;
  countDownName?: string;
  className?: string;
}

export interface TimeLeft {
  y: number;
  M: number;
  d: number;
  h: number;
  m: number;
  s: number;
}
