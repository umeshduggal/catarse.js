/**
 * window.c.ProjectMode component
 * A simple component that displays a badge with the current project mode
 * together with a description of the mode, shown inside a tooltip.
 * It receives a project as resource
 *
 * Example:
 *  view: {
 *      return m.component(c.ProjectMode, {project: project})
 *  }
 */

import m from 'mithril';
import _ from 'underscore';
import h from '../h';
import tooltip from './tooltip';

const projectMode = {
    view(ctrl, args) {
        const project = args.project(),
            mode = project.mode,
            modeImgSrc = (mode === 'aon') ? '/assets/aon-badge.png' : '/assets/flex-badge.png',
            modeTitle = (mode === 'aon') ? 'Campaign All -or-nothing ' : 'Flexible campaign ',
            goal = (_.isNull(project.goal) ? 'not defined' : h.formatNumber(project.goal)),
            attending = (_.isNull(project.total_contributors) ? 'not defined' : project.total_contributors),
            stillNeeded = (_.isNull(project.min_people) ? 'not defined' : project.min_people - project.total_contributors),
            buildTooltip = (el) => {
                return m.component(tooltip, {
                    el: el,
                    text: (mode === 'aon') ? `Only receive the resources to achieve or exceed the target until the day ${h.momentify(project.zone_expires_at, 'DD/MM/YYYY')}.` : 'The director receives all the features when you shut down the campaign , even if it has not reached this goal.',
                    width: 280
                });
            };

        return m(`#${mode}.w-row`, [
            m('.w-col.w-col-2.w-col-small-2.w-col-tiny-2', [
                !_.isEmpty(project) ? m(`img[src="${modeImgSrc}"][width='30']`) : ''
            ]),
            m('.w-col.w-col-10.w-col-small-10.w-col-tiny-10', [
                m('.fontsize-base.fontweight-semibold', 'Attending ' + attending),
                m('.fontsize-base.fontweight-semibold', 'Still needed ' + h.selfOrEmpty(stillNeeded, '--')),
                m('.w-inline-block.fontsize-smallest._w-inline-block', [
                    !_.isEmpty(project) ? modeTitle : '',
                    buildTooltip('span.w-inline-block.tooltip-wrapper.fa.fa-question-circle.fontcolor-secondary')
                ])
            ])
        ]);
    }
};

export default projectMode;
