# @sourcegraph/extension-api-classes

[![npm](https://img.shields.io/npm/v/@sourcegraph/extension-api-classes.svg)](https://www.npmjs.com/package/@sourcegraph/extension-api-classes)
[![downloads](https://img.shields.io/npm/dt/@sourcegraph/extension-api-classes.svg)](https://www.npmjs.com/package/@sourcegraph/extension-api-classes)
[![build](https://travis-ci.org/sourcegraph/extension-api-classes.svg?branch=master)](https://travis-ci.org/sourcegraph/extension-api-classes)
[![codecov](https://codecov.io/gh/sourcegraph/extension-api-classes/branch/master/graph/badge.svg?token=k6ajjWygaW)](https://codecov.io/gh/sourcegraph/extension-api-classes)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## ⚠️ Deprecation notice

**Sourcegraph extensions have been deprecated with the September 2022 Sourcegraph
release. [Learn more](https://docs.sourcegraph.com/extensions/deprecation).**

The repo and the docs below are kept to support older Sourcegraph versions.

## Description

Classes used by the Sourcegraph extension API

## Install

```
npm install @sourcegraph/extension-api-classes
# or
yarn add @sourcegraph/extension-api-classes
```

## Build

```
yarn
yarn build
```

## Test

```
yarn test
```

## Release

Releases are done automatically in CI when commits are merged into master by analyzing [Conventional Commit Messages](https://conventionalcommits.org/).
After running `yarn`, commit messages will be linted automatically when committing though a git hook.
The git hook can be circumvented for fixup commits with [git's `fixup!` autosquash feature](https://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html), or by passing `--no-verify` to `git commit`.
You may have to rebase a branch before merging to ensure it has a proper commit history, or squash merge with a manually edited commit message that conforms to the convention.
