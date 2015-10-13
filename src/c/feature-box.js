/**
 * window.c.FeatureBox component
 * Create the default struct for multiple text boxes
 * that is used to show features in a component like:
 * title / text | feature_img
 *
 * Example:
 * m.component(c.FeatureBox, {
 *    title: 'Feature title',
 *    text: 'awesome feature text',
 *    feature_img: 'feature_img_url'
 * })
 */

window.c.FeatureBox = ((m) => {
    return {
        view: (ctrl, args) => {
            return m('.w-section.section-features', [
                m(".w-container", [
                    m(".w-row", [
                        m(".w-col.w-col-6", [
                            m('.w-editable.fontsize-larger.text-success.u-marginbottom-10', args.title),
                            m("p.w-editable.fontsize-base", args.text)
                        ]),
                        m(".w-col.w-col-6")
                    ])
                ]),
                m(`img.img-start-features[src='${args.feature_img}']`)
            ]);
        }
    };
}(window.m));
