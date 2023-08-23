# git-commit-pull-push-action

Runs git add, git commit, git pull and git push.

The action flow:

1. `git add .`
2. check if there are any changed files
3. `git commit`
4. `git pull` (with args)
5. `git push`

Originally designed to run `git pull --rebase -X ours` or `git pull --rebase -X theirs` after commit to help pushing changed to `gh-pages`.

## Usage

```yaml
- run: cd test-action-dir && echo 1>>f && git status -s && git diff --staged --name-only
- name: Git Commit and Push Action
  uses: mgrybyk/git-commit-pull-push-action@v1
  with:
    repository: test-action-dir
    branch: test-action
    commit_message: Apply automatic changes
    pull_args: --rebase -X theirs
```

