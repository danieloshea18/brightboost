export type AnalyticsEvent =
  | { kind: "quest_start"; questId: string }
  | { kind: "quest_complete"; questId: string; attempts: number }
  | { kind: "quiz_answer"; questionId: string; isCorrect: boolean };

export function track(event: AnalyticsEvent): void {
  console.log("[Analytics]", {
    timestamp: new Date().toISOString(),
    event,
  });
}
