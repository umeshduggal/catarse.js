import m from 'mithril';

const projectReminderCount = {
    view(ctrl, args) {
        const project = args.resource;
        return m('#project-reminder-count.card.u-radius.u-text-center.medium.u-marginbottom-80', [
            m('.fontsize-large.fontweight-semibold', 'Total number of people who clicked on Remember Me button'),
            m('.fontsize-smaller.u-marginbottom-30', 'An email reminder is sent 48 hours before the end of his campaign'),
            m('.fontsize-jumbo', project.reminder_count)
        ]);
    }
};

export default projectReminderCount;
