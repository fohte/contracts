import { z } from 'zod'

/** `GET /notes` のレスポンス要素。 */
export const Note = z.object({
  docId: z.string(),
  path: z.string(),
  title: z.string(),
  description: z.string().optional(),
  // fohte.net の既存記事と publishedFilename で突合して決まる
  kind: z.enum(['new', 'update']),
  mtime: z.number(),
})
export type Note = z.infer<typeof Note>

/** `POST /plan` / `POST /apply` のリクエストボディ。 */
export const PlanRequest = z.object({
  docIds: z.array(z.string()).min(1),
})
export type PlanRequest = z.infer<typeof PlanRequest>

/** plan 計算中に検出した警告・エラー 1 件。 */
export const PlanIssue = z.object({
  docId: z.string(),
  // ErrorCode (errors.md 参照)
  code: z.string(),
  message: z.string(),
})
export type PlanIssue = z.infer<typeof PlanIssue>

/** plan が公開対象とする記事 1 件。 */
export const PlanItem = z.object({
  docId: z.string(),
  kind: z.enum(['added', 'modified', 'skipped']),
  slug: z.string(),
  publishedFilename: z.string(),
  title: z.string(),
  summary: z.string(),
  diffStat: z.object({ added: z.number(), removed: z.number() }).optional(),
  skipReason: z.string().optional(),
})
export type PlanItem = z.infer<typeof PlanItem>

/** docId 集合から決定的に計算される公開計画。永続化されない value object。 */
export const Plan = z.object({
  // docId 集合から決定的に導出される ID。GitHub ブランチ名のキーになる
  signature: z.string(),
  items: z.array(PlanItem),
  warnings: z.array(PlanIssue),
  errors: z.array(PlanIssue),
  imagesToUpload: z.array(
    z.object({
      sourcePath: z.string(),
      hash: z.string(),
      alreadyUploaded: z.boolean(),
    }),
  ),
})
export type Plan = z.infer<typeof Plan>

/** `POST /apply` のレスポンス。`kind` で成功・plan 変化・適用済み・失敗を判別する。 */
export const ApplyResult = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('success'),
    prNumber: z.number(),
    prUrl: z.string(),
    branch: z.string(),
  }),
  z.object({ kind: z.literal('planChanged'), newPlan: Plan }),
  z.object({
    kind: z.literal('alreadyApplied'),
    prNumber: z.number(),
    prUrl: z.string(),
  }),
  z.object({
    kind: z.literal('failed'),
    code: z.string(),
    message: z.string(),
  }),
])
export type ApplyResult = z.infer<typeof ApplyResult>

/** `GET /prs` のレスポンス要素。 */
export const BlogPrSummary = z.object({
  number: z.number(),
  url: z.string(),
  branch: z.string(),
  state: z.enum(['open', 'closed']),
  title: z.string(),
  createdAt: z.string(),
  mergedAt: z.string().optional(),
})
export type BlogPrSummary = z.infer<typeof BlogPrSummary>

/** `GET /prs/{number}/ci` のレスポンス。check-runs を正規化した CI 状態。 */
export const CiStatus = z.object({
  state: z.enum(['pending', 'success', 'failure']),
  failedChecks: z.array(z.string()),
  previewUrl: z.string().optional(),
})
export type CiStatus = z.infer<typeof CiStatus>
