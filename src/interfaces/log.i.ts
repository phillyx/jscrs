import { IReport } from "./report.i";

export interface ILogReporter {
  report(reporter: Map<string, IReport>): void
}