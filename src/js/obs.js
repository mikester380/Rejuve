function observer(culprit, opts = {}) {
    const defs = {
        root: null,
    };

    const options = Object.assign({}, defs, opts);

    return new Promise(function (resolve) {
        const obs = new IntersectionObserver(function (caught) {
            if (caught[0].isIntersecting) {
                resolve(null);
                obs.unobserve(culprit);
            }
        }, options);

        obs.observe(culprit);
    });
}

module.exports = observer;
