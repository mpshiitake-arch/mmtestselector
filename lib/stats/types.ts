export type Objective = "compare" | "association" | "prediction";

export type OutcomeType =
  | "continuous"
  | "categorical"
  | "count"
  | "time_to_event";

export type Groups = "1" | "2" | "3plus";

export type Pairing = "independent" | "paired";

export type Normality = "normal" | "non_normal" | "unknown";

export type Variance = "equal" | "unequal" | "unknown";

export type BinaryAnswer = "yes" | "no" | "unknown";

export interface WizardState {
  objective: Objective;
  outcomeType: OutcomeType;
  groups: Groups;
  pairing?: Pairing;
  normality?: Normality;
  variance?: Variance;
  smallExpectedCounts?: BinaryAnswer;
  pairedBinary?: "yes" | "no";
}

export interface TestProfile {
  id: string;
  label: string;
  whenToUse: string;
  assumptions: string[];
  whatToReport: string[];
  resultsTemplate: string;
  notes: string[];
}

export interface TestRecommendation {
  primaryTest: string;
  alternatives: string[];
  whenToUse: string;
  assumptions: string[];
  whatToReport: string[];
  resultsTemplate: string;
  notes: string[];
}
