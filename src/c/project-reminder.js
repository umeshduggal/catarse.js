/**
 * window.c.ProjectReminder component
 * A component that displays a clickable project reminder element.
 * The component can be of two types: a 'link' or a 'button'
 *
 * Example:
 *  view: {
 *      return m.component(c.ProjectReminder, {project: project, type: 'button'})
 *  }
 */
import m from 'mithril';
import models from '../models';
import h from '../h';
import popNotification from './pop-notification';

const projectReminder = {
    controller(args) {
        let l = m.prop(false);
        const project = args.project,
            filterVM = postgrest.filtersVM({
                project_id: 'eq'
            }),
            storeReminderName = 'remind_' + project().id,
            popNotification = m.prop(false),
            submitReminder = () => {
                if (!h.getUser()) {
                    h.storeAction(storeReminderName, submitReminder);
                    return h.navigateToDevise();
                }
                let loaderOpts = project().in_reminder ? models.projectReminder.deleteOptions(filterVM.parameters()) : models.projectReminder.postOptions({
                    project_id: project().id
                });
                l = postgrest.loaderWithToken(loaderOpts);

                l.load().then(() => {
                    project().in_reminder = !project().in_reminder;

                    if (project().in_reminder) {
                        popNotification(true);
                        setTimeout(() => {
                            popNotification(false);
                            m.redraw();
                        }, 5000);
                    } else {
                        popNotification(false);
                    }
                });
            };

        h.callStoredAction(storeReminderName, submitReminder);
        filterVM.project_id(project().id);

        return {
            l: l,
            submitReminder: submitReminder,
            popNotification: popNotification
        };
    },
    view(ctrl, args) {
        const mainClass = (args.type === 'button') ? '' : '.u-text-center.u-marginbottom-30',
            buttonClass = (args.type === 'button') ? 'w-button btn btn-terciary btn-no-border' : 'btn-link link-hidden fontsize-small',
            hideTextOnMobile = args.hideTextOnMobile || false,
            project = args.project;

        return m(`#project-reminder${mainClass}`, [
            m(`button[class="${buttonClass} ${(project().in_reminder ? 'link-hidden-success' : 'fontcolor-secondary')} fontweight-semibold"]`, {
                onclick: h.analytics.event({cat: 'project_view',act: 'project_floatingreminder_click', project: project()}, ctrl.submitReminder)
            }, [
                (ctrl.l() ? 'aguarde ...' : m('span.fa.fa-clock-o', [
                    m(`span${hideTextOnMobile ? '.w-hidden-medium' : ''}`, project().in_reminder ? ' Active reminder' : ' Remember me')
                ]))
            ]), (ctrl.popNotification() ? m.component(popNotification, {
                message: 'OK! We will send you a reminder email 48 hours before the end of the campaign'
            }) : '')
        ]);
    }
};

export default projectReminder;
