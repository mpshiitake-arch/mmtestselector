"use client";

import { useMemo, useState } from "react";
import { getRecommendation } from "@/lib/stats/rules";
import {
  BinaryAnswer,
  Groups,
  Normality,
  Objective,
  OutcomeType,
  Pairing,
  Variance,
  WizardState,
} from "@/lib/stats/types";

const cardClass = "rounded-xl border border-slate-200 bg-white p-5 shadow-sm";

type CopyTarget = "template" | "report" | null;

const defaultState: WizardState = {
  objective: "compare",
  outcomeType: "continuous",
  groups: "2",
  pairing: "independent",
  normality: "normal",
  variance: "equal",
  smallExpectedCounts: "no",
  pairedBinary: "no",
};

function OptionGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<{ label: string; value: T }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-[#0F172A]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-md border px-3 py-2 text-sm transition ${
                active
                  ? "border-[#0A4D68] bg-[#0A4D68] text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#2DD4BF]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function StatisticalTestSelectorPage() {
  const [state, setState] = useState<WizardState>(defaultState);
  const [copied, setCopied] = useState<CopyTarget>(null);

  const recommendation = useMemo(() => getRecommendation(state), [state]);

  const showPairing = state.groups !== "1" && state.objective === "compare";
  const showNormality =
    state.outcomeType === "continuous" && state.objective !== "prediction";
  const showVariance =
    state.outcomeType === "continuous" &&
    state.pairing === "independent" &&
    state.objective === "compare";
  const showSmallExpectedCounts = state.outcomeType === "categorical";
  const showPairedBinary =
    state.outcomeType === "categorical" &&
    state.objective === "compare" &&
    state.pairing === "paired";

  const setObjective = (objective: Objective) => {
    setState((prev) => ({ ...prev, objective }));
  };

  const copyText = async (target: CopyTarget) => {
    if (!target) {
      return;
    }

    const text =
      target === "template"
        ? recommendation.resultsTemplate
        : recommendation.whatToReport.join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(target);
    window.setTimeout(() => setCopied(null), 1500);
  };

  return (
    <main className="min-h-screen bg-[#F2FCF6] px-4 py-8 text-[#0F172A] md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-[#0A4D68]">
            Statistical Test Selector
          </h1>
          <p className="text-sm text-slate-700">
            Follow the wizard to identify an appropriate statistical test and
            reporting checklist.
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className={cardClass}>
            <h2 className="mb-4 text-lg font-semibold">Study design wizard</h2>
            <div className="space-y-5">
              <OptionGroup
                label="Objective"
                value={state.objective}
                onChange={setObjective}
                options={[
                  { label: "Compare", value: "compare" },
                  { label: "Association", value: "association" },
                  { label: "Prediction", value: "prediction" },
                ]}
              />

              <OptionGroup
                label="Outcome type"
                value={state.outcomeType}
                onChange={(outcomeType: OutcomeType) =>
                  setState((prev) => ({ ...prev, outcomeType }))
                }
                options={[
                  { label: "Continuous", value: "continuous" },
                  { label: "Categorical", value: "categorical" },
                  { label: "Count", value: "count" },
                  { label: "Time-to-event", value: "time_to_event" },
                ]}
              />

              <OptionGroup
                label="Groups"
                value={state.groups}
                onChange={(groups: Groups) => setState((prev) => ({ ...prev, groups }))}
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3+", value: "3plus" },
                ]}
              />

              {showPairing && (
                <OptionGroup
                  label="Pairing"
                  value={state.pairing ?? "independent"}
                  onChange={(pairing: Pairing) =>
                    setState((prev) => ({ ...prev, pairing }))
                  }
                  options={[
                    { label: "Independent", value: "independent" },
                    { label: "Paired", value: "paired" },
                  ]}
                />
              )}

              {showNormality && (
                <OptionGroup
                  label="Normality"
                  value={state.normality ?? "unknown"}
                  onChange={(normality: Normality) =>
                    setState((prev) => ({ ...prev, normality }))
                  }
                  options={[
                    { label: "Normal", value: "normal" },
                    { label: "Non-normal", value: "non_normal" },
                    { label: "Unknown", value: "unknown" },
                  ]}
                />
              )}

              {showVariance && (
                <OptionGroup
                  label="Variance"
                  value={state.variance ?? "unknown"}
                  onChange={(variance: Variance) =>
                    setState((prev) => ({ ...prev, variance }))
                  }
                  options={[
                    { label: "Equal", value: "equal" },
                    { label: "Unequal", value: "unequal" },
                    { label: "Unknown", value: "unknown" },
                  ]}
                />
              )}

              {showSmallExpectedCounts && (
                <OptionGroup
                  label="Small expected counts"
                  value={state.smallExpectedCounts ?? "unknown"}
                  onChange={(smallExpectedCounts: BinaryAnswer) =>
                    setState((prev) => ({ ...prev, smallExpectedCounts }))
                  }
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                    { label: "Unknown", value: "unknown" },
                  ]}
                />
              )}

              {showPairedBinary && (
                <OptionGroup
                  label="Paired binary outcome?"
                  value={state.pairedBinary ?? "no"}
                  onChange={(pairedBinary: "yes" | "no") =>
                    setState((prev) => ({ ...prev, pairedBinary }))
                  }
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                  ]}
                />
              )}
            </div>
          </div>

          <div className={cardClass}>
            <h2 className="mb-3 text-lg font-semibold">Recommended approach</h2>
            <div className="space-y-4 text-sm">
              <p>
                <span className="font-semibold">Primary test:</span>{" "}
                {recommendation.primaryTest}
              </p>

              <p>
                <span className="font-semibold">Alternatives:</span>{" "}
                {recommendation.alternatives.length > 0
                  ? recommendation.alternatives.join(", ")
                  : "None"}
              </p>

              <p>
                <span className="font-semibold">When to use:</span>{" "}
                {recommendation.whenToUse}
              </p>

              <div>
                <p className="font-semibold">Assumptions</p>
                <ul className="ml-5 list-disc space-y-1">
                  {recommendation.assumptions.map((assumption) => (
                    <li key={assumption}>{assumption}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="font-semibold">What to report</p>
                  <button
                    type="button"
                    onClick={() => copyText("report")}
                    className="rounded-md bg-[#2DD4BF] px-3 py-1 text-xs font-semibold text-[#0F172A] hover:opacity-90"
                  >
                    Copy list
                  </button>
                </div>
                <ul className="ml-5 list-disc space-y-1">
                  {recommendation.whatToReport.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="font-semibold">Results template</p>
                  <button
                    type="button"
                    onClick={() => copyText("template")}
                    className="rounded-md bg-[#2DD4BF] px-3 py-1 text-xs font-semibold text-[#0F172A] hover:opacity-90"
                  >
                    Copy template
                  </button>
                </div>
                <p className="rounded-lg bg-slate-50 p-3 text-sm">
                  {recommendation.resultsTemplate}
                </p>
              </div>

              {recommendation.notes.length > 0 && (
                <div>
                  <p className="font-semibold">Notes</p>
                  <ul className="ml-5 list-disc space-y-1">
                    {recommendation.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        <footer className="text-sm font-medium text-[#0A4D68]">
          Educational guidance only. Confirm with a statistician.
        </footer>
      </div>

      {copied && (
        <div className="fixed bottom-6 right-6 rounded-md bg-[#0A4D68] px-4 py-2 text-sm font-medium text-white shadow-lg">
          {copied === "template"
            ? "Results template copied"
            : "What-to-report list copied"}
        </div>
      )}
    </main>
  );
}
