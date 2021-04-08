import defaultResolve from 'part:@sanity/base/document-actions'

import { StartTranscodeAction } from './StartTranscodeAction'

export default function resolveDocumentActions(props) {
    return [
        ...defaultResolve(props),
        StartTranscodeAction,
    ]
}