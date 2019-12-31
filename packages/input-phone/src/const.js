const cellRegEx = /^(13[0-9]|14[5-9]|15[0-9]|16[5-6]|17[0-35-8]|18[0-9]|19[8-9])\d{8}$|^(14[014]|174)0\d{7}$/;
const cellRegExPrefix = /^(13[0-9]|14[5-9]|15[0-9]|16[5-6]|17[0-35-8]|18[0-9]|19[8-9])/;

export const areaGroup = {
  china: {
    code: '+86',
    regEx: cellRegEx,
    regExPrefix: cellRegExPrefix,
    max: 11
  }
};
