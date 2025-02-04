import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const StudyStatus = {
  ACTIVE_NOT_RECRUITING: "Active, not recruiting",
  COMPLETED: "Completed",
  ENROLLING_BY_INVITATION: "Enrolling by invitation",
  NOT_YET_RECRUITING: "Not yet recruiting",
  RECRUITING: "Recruiting",
  SUSPENDED: "Suspended",
  TERMINATED: "Terminated",
  WITHDRAWN: "Withdrawn",
  AVAILABLE: "Available",
  NO_LONGER_AVAILABLE: "No longer available",
  TEMPORARILY_NOT_AVAILABLE: "Temporarily not available",
  APPROVED_FOR_MARKETING: "Approved for marketing",
  WITHHELD: "Withheld",
  UNKNOWN: "Unknown status",
};

export const StudyStatusReverse = {
  [StudyStatus.ACTIVE_NOT_RECRUITING]: "ACTIVE_NOT_RECRUITING",
  [StudyStatus.COMPLETED]: "COMPLETED",
  [StudyStatus.ENROLLING_BY_INVITATION]: "ENROLLING_BY_INVITATION",
  [StudyStatus.NOT_YET_RECRUITING]: "NOT_YET_RECRUITING",
  [StudyStatus.RECRUITING]: "RECRUITING",
  [StudyStatus.SUSPENDED]: "SUSPENDED",
  [StudyStatus.TERMINATED]: "TERMINATED",
  [StudyStatus.WITHDRAWN]: "WITHDRAWN",
  [StudyStatus.AVAILABLE]: "AVAILABLE",
  [StudyStatus.NO_LONGER_AVAILABLE]: "NO_LONGER_AVAILABLE",
  [StudyStatus.TEMPORARILY_NOT_AVAILABLE]: "TEMPORARILY_NOT_AVAILABLE",
  [StudyStatus.APPROVED_FOR_MARKETING]: "APPROVED_FOR_MARKETING",
  [StudyStatus.WITHHELD]: "WITHHELD",
  [StudyStatus.UNKNOWN]: "UNKNOWN",
};
