module.exports = {
    // parserPreset: 'conventional-changelog-conventionalcommits',
    // extends: ['@commitlint/config-conventional'],
    rules: {
    // 'body-leading-blank': [1, 'always'],
    // 'body-max-line-length': [2, 'always', 100],
    // 'footer-leading-blank': [1, 'always'],
    // 'footer-max-line-length': [2, 'always', 100],
    // 'header-max-length': [2, 'always', 100],
    // 'subject-case': [
    // 	2,
    // 	'never',
    // 	['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    // ],
    // 'subject-empty': [2, 'never'],
    // 'subject-full-stop': [2, 'never', '.'],
        'type-case': [2, 'always', 'lower-case']
        // 'type-empty': [2, 'never']
        // 'type-enum': [
        //     2,
        //     'always',
        //     [
        //         'build',
        //         'chore',
        //         'ci',
        //         'docs',
        //         'feat',
        //         'fix',
        //         'perf',
        //         'refactor',
        //         'revert',
        //         'style',
        //         'test'
        //     ]
        // ]
    },
    types: [
        { value: 'feat', name: 'feat:     A new feature', emoji: ':sparkles:' },
        { value: 'fix', name: 'fix:      A bug fix', emoji: ':bug:' },
        { value: 'docs', name: 'docs:     Documentation only changes', emoji: ':memo:' },
        { value: 'style', name: 'style:    Changes that do not affect the meaning of the code', emoji: ':lipstick:' },
        { value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature', emoji: ':recycle:' },
        { value: 'perf', name: 'perf:     A code change that improves performance', emoji: ':zap:' },
        { value: 'test', name: 'test:     Adding missing tests or correcting existing tests', emoji: ':white_check_mark:' },
        { value: 'build', name: 'build:    Changes that affect the build system or external dependencies', emoji: ':package:' },
        { value: 'ci', name: 'ci:       Changes to our CI configuration files and scripts', emoji: ':ferris_wheel:' },
        { value: 'chore', name: 'chore:    Other changes that don\'t modify src or test files', emoji: ':hammer:' },
        { value: 'revert', name: 'revert:   Reverts a previous commit', emoji: ':rewind:' }
    ],
    prompt: {
        settings: {},
        messages: {
            // skip: ':skip',
            max: 'upper %d chars',
            min: '%d chars at least',
            emptyWarning: 'can not be empty',
            upperLimitWarning: 'over limit',
            lowerLimitWarning: 'below limit'
        },
        questions: {
            type: {
                description: "选择你要提交的类型",
                enum: {
                    feat: {
                        description: '一个新功能✨',
                        title: 'Features',
                        emoji: '✨'
                    },
                    fix: {
                        description: '一个bug',
                        title: 'Bug Fixes',
                        emoji: '🐛'
                    },
                    docs: {
                        description: 'Documentation only changes',
                        title: 'Documentation',
                        emoji: '📚'
                    },
                    style: {
                        description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
                        title: 'Styles',
                        emoji: '💎'
                    },
                    refactor: {
                        description: 'A code change that neither fixes a bug nor adds a feature',
                        title: 'Code Refactoring',
                        emoji: '📦'
                    },
                    perf: {
                        description: 'A code change that improves performance',
                        title: 'Performance Improvements',
                        emoji: '🚀'
                    },
                    test: {
                        description: 'Adding missing tests or correcting existing tests',
                        title: 'Tests',
                        emoji: '🚨'
                    },
                    build: {
                        description: 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
                        title: 'Builds',
                        emoji: '🛠'
                    },
                    ci: {
                        description: 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
                        title: 'Continuous Integrations',
                        emoji: '⚙️'
                    },
                    chore: {
                        description: "Other changes that don't modify src or test files",
                        title: 'Chores',
                        emoji: '♻️'
                    },
                    revert: {
                        description: 'Reverts a previous commit',
                        title: 'Reverts',
                        emoji: '🗑'
                    }
                }
            },
            scope: {
                description:
            'What is the scope of this change (e.g. component or file name)'
            },
            subject: {
                description: 'Write a short, imperative tense description of the change'
            },
            body: {
                description: 'Provide a longer description of the change'
            },
            isBreaking: {
                description: 'Are there any breaking changes?'
            },
            breakingBody: {
                description:
            'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself'
            },
            breaking: {
                description: 'Describe the breaking changes'
            },
            isIssueAffected: {
                description: 'Does this change affect any open issues?'
            },
            issuesBody: {
                description:
            'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself'
            },
            issues: {
                description: 'Add issue references (e.g. "fix #123", "re #123".)'
            }
        }
    }
};
