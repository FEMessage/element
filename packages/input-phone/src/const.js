const cellRegEx = /^1\d{10}$/;
const cellRegExPrefix = /^(1)[0-9]{10}$/;

export const areaGroup = {
  china: {
    code: '+86',
    regEx: cellRegEx,
    regExPrefix: cellRegExPrefix,
    max: 11
  }
};
