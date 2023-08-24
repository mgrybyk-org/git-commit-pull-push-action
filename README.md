# git-commit-pull-push-action

Runs git add, git commit, git pull and git push.

The action flow:

1. `git add` (with `add_args`, defaults to `.`)
2. check if there are any changed files
3. `git commit`
4. `git pull` (with `pull_args`, defaults to `--rebase`)
5. `git checkout branch` (to allow push in PRs)
6. `git push`

Originally designed to run `git pull --rebase -X ours` or `git pull --rebase -X theirs` after commit to help pushing changed to `gh-pages`.

## Usage

```yaml
- name: Git Commit and Push Action
  uses: mgrybyk/git-commit-pull-push-action@v1
  with:
    repository: gh-pages
    branch: gh-pages # ${{ github.head_ref }}
    commit_message: Apply automatic changes
    pull_args: --rebase -X ours
```

### Merge strategy specific option

`-X` (same as `--strategy-option`).

- `ours`: option forces conflicting chunks to be auto-resolved cleanly by favoring **our** (current) version (instead of incoming). 
- `theirs`:  is the opposite of **ours**. 

## API

Please see [action.yml](./action.yml)
