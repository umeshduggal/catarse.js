import m from 'mithril';
import dropdown from './dropdown';

const filterDropdown = {
    view(ctrl, args) {
        const wrapper_c = args.wrapper_class || '.w-col.w-col-3.w-col-small-6';
        return m(wrapper_c, [
            m('label.fontsize-smaller[for="' + args.index + '"]', args.label),
            m.component(dropdown, {
                id: args.index,
                classes: '.w-select.text-field.positive',
                valueProp: args.vm,
                options: args.options
            })
        ]);
    }
};

export default filterDropdown;
