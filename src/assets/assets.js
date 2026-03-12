import home_hero_img from "./home_hero_img.png";

import { BsStopwatch } from "react-icons/bs";
import { FaHourglassEnd, FaChartPie, FaChartLine, FaDatabase, FaCalendarAlt, FaUsersCog } from "react-icons/fa";
import { SiLogstash } from "react-icons/si";
import { RiShuffleLine } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";


export const assets = {
    home_hero_img
}

export const features = [
  {
    id: 1,
    title: "Timed Examination",
    description: "Real-time countdown timer with automatic start and 1-minute warning notifications.",
    icon: BsStopwatch
  },
  {
    id: 2,
    title: "Auto Submission",
    description: "Strict time enforcement with automatic submission when timer reaches zero.",
    icon: FaHourglassEnd
  },
  {
    id: 3,
    title: "Proctor Activity Logs",
    description: "Detects and logs tab switching, window blur, and page reload attempts.",
    icon: SiLogstash
  },
  {
    id: 4,
    title: "Question & Option Shuffle",
    description: "Unique question and option order for each student to prevent cheating.",
    icon: RiShuffleLine
  },
  {
    id: 5,
    title: "Auto Grading System",
    description: "Instant MCQ grading with automatic marks calculation.",
    icon: IoIosCheckmarkCircle
  },
  {
    id: 6,
    title: "Instant Score Breakdown",
    description: "View total score, correct/incorrect answers, percentage, and pass/fail status.",
    icon: FaChartPie
  },
  {
    id: 7,
    title: "Analytics Dashboard",
    description: "Track averages, highest/lowest marks, pass/fail ratios, and question accuracy.",
    icon: FaChartLine
  },
  {
    id: 8,
    title: "Question Bank Management",
    description: "Add, edit, delete questions with marks and subject categorization.",
    icon: FaDatabase
  },
  {
    id: 9,
    title: "Exam Scheduling",
    description: "Create exams, set duration, and get upcoming exam notifications.",
    icon: FaCalendarAlt
  },
  {
    id: 10,
    title: "Role-Based Dashboards",
    description: "Separate dashboards for Admin, Instructor, and Students.",
    icon: FaUsersCog
  }
];
