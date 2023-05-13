const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splittedUrl = this._urlSplitter(url);
    return this._urlCombiner(splittedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlsSplits = url.split('/');

    if (urlsSplits[1] === 'note') {
      return {
        resource: 'note/' + (urlsSplits[2] || null),
        id: window.location.hash.slice(1).split('/')[3] || null,
        verb: urlsSplits[4] || null,
      };
    }

    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  },

  _urlCombiner(splittedUrl) {
    return (
      (splittedUrl.resource ? `/${splittedUrl.resource}` : '/') +
      (splittedUrl.id ? '/:id' : '') +
      (splittedUrl.verb ? `/${splittedUrl.verb}` : '')
    );
  },
};

export default UrlParser;
