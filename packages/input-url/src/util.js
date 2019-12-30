import _normalizeUrl from 'normalize-url';
import validUrl from 'valid-url';

export function isWebUri(url) {
  return !!validUrl.isWebUri(url);
};

export function normalizeUrl(url) {
  try {
    return _normalizeUrl(url);
  } catch (error) {
    return url;
  }
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

/**
 * 补全git仓库地址
 */
export function normalizeGitUrl(url) {
  url = normalizeUrl(url);
  // REVIEW: 补全.git似乎没有意义，只会影响用户判断。比如.gi结尾时补全成.gi.git，但其实应该报错
  // if (!endsWithGit(url)) {
  //   url += '.git'
  // }
  return url;
};
