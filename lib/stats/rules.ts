import testsRaw from "@/data/stats-tests.json";
import {
  TestProfile,
  TestRecommendation,
  WizardState,
} from "@/lib/stats/types";

const tests = testsRaw as TestProfile[];

function getTestById(id: string): TestProfile {
  const match = tests.find((test) => test.id === id);

  if (!match) {
    throw new Error(`Missing test profile: ${id}`);
  }

  return match;
}

function buildRecommendation(
  primaryId: string,
  alternatives: string[] = [],
  extraNotes: string[] = [],
): TestRecommendation {
  const primary = getTestById(primaryId);

  return {
    primaryTest: primary.label,
    alternatives,
    whenToUse: primary.whenToUse,
    assumptions: primary.assumptions,
    whatToReport: primary.whatToReport,
    resultsTemplate: primary.resultsTemplate,
    notes: [...primary.notes, ...extraNotes],
  };
}

export function getRecommendation(input: WizardState): TestRecommendation {
  const {
    objective,
    outcomeType,
    groups,
    pairing,
    normality,
    variance,
    smallExpectedCounts,
    pairedBinary,
  } = input;

  if (objective === "prediction") {
    if (outcomeType === "continuous") {
      return buildRecommendation("linear_regression");
    }

    if (outcomeType === "categorical") {
      return buildRecommendation("logistic_regression", [], [
        "Use binary logistic regression for two-category outcomes; use multinomial/ordinal extensions as appropriate.",
      ]);
    }

    if (outcomeType === "count") {
      return buildRecommendation("poisson_regression");
    }

    return buildRecommendation("cox_ph");
  }

  if (objective === "association") {
    if (outcomeType === "categorical") {
      if (smallExpectedCounts === "no") {
        return buildRecommendation("chi_square");
      }

      return buildRecommendation("fishers_exact", ["Chi-square test"], [
        "For larger-than-2x2 tables with sparse cells, consider Fisher-Freeman-Halton extension.",
      ]);
    }

    if (outcomeType === "continuous") {
      if (normality === "normal") {
        return buildRecommendation("pearson_correlation", [
          "Simple linear regression",
        ]);
      }

      return buildRecommendation("spearman_correlation", ["Kendall tau"]);
    }
  }

  if (objective === "compare" && outcomeType === "continuous") {
    if (groups === "1") {
      if (normality === "normal") {
        return buildRecommendation("one_sample_t", ["Wilcoxon signed-rank test"]);
      }

      return buildRecommendation("wilcoxon_signed_rank", ["One-sample t-test"]);
    }

    if (!pairing) {
      throw new Error("Pairing is required when comparing 2+ groups.");
    }

    if (groups === "2" && pairing === "independent") {
      if (normality === "normal") {
        if (variance === "unequal") {
          return buildRecommendation("welch_t", ["Mann–Whitney U test"]);
        }

        return buildRecommendation("independent_t", [
          "Welch t-test",
          "Mann–Whitney U test",
        ]);
      }

      return buildRecommendation("mann_whitney_u", [
        "Welch t-test",
        "Independent t-test",
      ]);
    }

    if (groups === "2" && pairing === "paired") {
      if (normality === "normal") {
        return buildRecommendation("paired_t", ["Wilcoxon signed-rank test"]);
      }

      return buildRecommendation("wilcoxon_signed_rank", ["Paired t-test"]);
    }

    if (groups === "3plus" && pairing === "independent") {
      if (normality === "normal") {
        if (variance === "unequal") {
          return buildRecommendation("welch_anova", ["Kruskal–Wallis test"]);
        }

        return buildRecommendation("one_way_anova", [
          "Welch ANOVA",
          "Kruskal–Wallis test",
        ]);
      }

      return buildRecommendation("kruskal_wallis", [
        "Welch ANOVA",
        "One-way ANOVA",
      ]);
    }

    if (groups === "3plus" && pairing === "paired") {
      if (normality === "normal") {
        return buildRecommendation("repeated_measures_anova", ["Friedman test"], [
          "Assess sphericity and report corrections when violated.",
        ]);
      }

      return buildRecommendation("friedman", ["Repeated-measures ANOVA"]);
    }
  }

  if (objective === "compare" && outcomeType === "categorical") {
    if (pairing === "paired" && pairedBinary === "yes") {
      return buildRecommendation("mcnemar", ["Exact McNemar test"]);
    }

    if (smallExpectedCounts === "no") {
      return buildRecommendation("chi_square", ["Fisher’s exact test"]);
    }

    return buildRecommendation("fishers_exact", ["Chi-square test"], [
      "For larger-than-2x2 tables with sparse cells, consider Fisher-Freeman-Halton extension.",
    ]);
  }

  return buildRecommendation("chi_square", [], [
    "No exact branch matched all selections; review design details and assumptions.",
  ]);
}
