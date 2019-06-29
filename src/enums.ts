/* istanbul ignore file */
// tslint:disable: no-object-literal-type-assertion https://github.com/palantir/tslint/issues/4628

import * as sourcegraph from 'sourcegraph'

export const MarkupKind: typeof sourcegraph.MarkupKind = {
    PlainText: 'plaintext' as sourcegraph.MarkupKind.PlainText,
    Markdown: 'markdown' as sourcegraph.MarkupKind.Markdown,
} as const

export const NotificationType: typeof sourcegraph.NotificationType = {
    Error: 1,
    Warning: 2,
    Info: 3,
    Log: 4,
    Success: 5,
} as const

export const StatusScope: typeof sourcegraph.StatusScope = {
    Global: 'global' as sourcegraph.StatusScope.Global,
} as const

export const StatusState: typeof sourcegraph.StatusState = {
    Queued: 'queued' as sourcegraph.StatusState.Queued,
    InProgress: 'in-progress' as sourcegraph.StatusState.InProgress,
    Completed: 'completed' as sourcegraph.StatusState.Completed,
}

export const StatusResult: typeof sourcegraph.StatusResult = {
    Success: 'success' as sourcegraph.StatusResult.Success,
    Failure: 'failure' as sourcegraph.StatusResult.Failure,
    ActionRequired: 'action-required' as sourcegraph.StatusResult.ActionRequired,
}
