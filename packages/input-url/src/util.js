import validUrl from 'valid-url';

export function isWebUri(url) {
  return !!validUrl.isWebUri(url);
};

function endsWithGit(url) {
  return /\.git\/?$/.test(url);
};

/**
 * 支持以下两种模式：
 * http[s]://host.xz[:port]/path/to/repo.git/
 * [user@]host.xz:path/to/repo.git/
 *
 * @see: https://git-scm.com/docs/git-clone#_git_urls_a_id_urls_a
 */
export function isGitRepo(url) {
  return isHttpsGitRepo(url) || isSSHGitRepo(url);
};

/**
 * 参考格式：http[s]://host.xz[:port]/path/to/repo.git/
 */
export function isHttpsGitRepo(url) {
  return isWebUri(url) && endsWithGit(url);
};

/**
 * 参考格式：[user@]host.xz:path/to/repo.git/
 * @see https://regexper.com/
 */
export function isSSHGitRepo(url) {
  const regExp = /^[\w-]+@[\w-]+\.[\w-]+:[\w-]+(\/[\w-._~:?#[\]@!$&'()*+,;=]+)+\.git\/?$/;
  return regExp.test(url);
};
