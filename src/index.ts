import { IStyleAPI, IStyleItem } from 'import-sort-style'

declare type ImportType = 'import' | 'require' | 'import-equals' | 'import-type'
declare type NamedMember = {
    name: string
    alias: string
}

interface IImport {
    start: number
    end: number
    importStart?: number
    importEnd?: number
    type: ImportType
    moduleName: string
    defaultMember?: string
    namespaceMember?: string
    namedMembers: NamedMember[]
}

export default function (styleApi: IStyleAPI, options?: any): Array<IStyleItem> {
    const {
        alias,
        and,
        not,
        dotSegmentCount,
        hasNoMember,
        isAbsoluteModule,
        isNodeModule,
        isRelativeModule,
        moduleName,
        naturally,
        unicode,
    } = styleApi
    const { knownFramework, knownFirstparty } = options

    function isFrameworkModule (imported: IImport) {
        return knownFramework.map((module) =>
            imported.moduleName.startsWith(module),
        )
    }

    function isFirstPartyModule (imported: IImport) {
        return knownFirstparty.map((module) =>
            imported.moduleName.startsWith(module),
        )
    }

    return [
        /**
         * Absolute modules with side effects.
         * @example import 'foo'
         */
        { match: and(hasNoMember, isAbsoluteModule) },
        { separator: true },

        /**
         * Relative modules with side effects.
         * @example import './foo'
         */
        { match: and(hasNoMember, isRelativeModule) },
        { separator: true },

        /**
         * Standard Node.js modules.
         * @example import … from 'fs'
         */
        {
            match: isNodeModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },

        /**
         * Known framework modules.
         * @example import … from '@ember/foo'
         */
        {
            match: isFrameworkModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },

        /**
         * Third-party modules.
         * @example import … from 'foo'
         */
        {
            match: and(
                isAbsoluteModule,
                not(isFrameworkModule),
                not(isFirstPartyModule),
            ),
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },

        /**
         * Known first-party modules.
         * @example import … from '@ember/foo'
         */
        {
            match: isFirstPartyModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },

        /**
         * Explicitly local modules.
         * @example
         *   import … from './foo'
         *   import … from '../foo'
         */
        {
            match: isRelativeModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
    ]
}
