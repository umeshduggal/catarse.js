import m from 'mithril';
import h from '../h';
import projectReminder from './project-reminder';

const projectTabs = {
    controller(args) {
        const isFixed = m.prop(false),
            originalPosition = m.prop(-1);

        const fixOnScroll = (el) => {
            return () => {
                let viewportOffset = el.getBoundingClientRect();

                if (window.scrollY <= originalPosition()) {
                    originalPosition(-1);
                    isFixed(false);
                    m.redraw();
                }

                if (viewportOffset.top < 0 || (window.scrollY > originalPosition() && originalPosition() > 0)) {
                    if (!isFixed()){
                        originalPosition(window.scrollY);
                        isFixed(true);
                        m.redraw();
                    }
                }
            };
        };

        const navDisplay = (el, isInitialized) => {
            if (!isInitialized) {
                const fixNavBar = fixOnScroll(el);
                window.addEventListener('scroll', fixNavBar);
            }
        };

        return {
            navDisplay: navDisplay,
            isFixed: isFixed
        };
    },
    view(ctrl, args) {
        const project = args.project,
            rewards = args.rewardDetails;

        let mainClass = (!ctrl.isFixed() || project().is_owner_or_admin) ? '.w-section.project-nav' : '.w-section.project-nav.project-nav-fixed';

        return m('nav-wrapper', project() ? [
            m(mainClass, {
                config: ctrl.navDisplay
            }, [
                m('.w-container', [
                    m('.w-row', [
                        m('.w-col.w-col-8', [!_.isEmpty(rewards()) ?
                            m('a[id="rewards-link"][class="w-hidden-main w-hidden-medium dashboard-nav-link mf ' + (h.hashMatch('#rewards') ? 'selected' : '') + '"][href="#rewards"]', {
                                style: 'float: left;',
                                onclick: h.analytics.event({cat: 'project_view',act: 'project_rewards_view',project: project()})
                            }, 'Recompensas') : m('a[id="rewards-link"][class="w-hidden-main w-hidden-medium dashboard-nav-link mf ' + (h.hashMatch('#contribution_suggestions') ? 'selected' : '') + '"][href="#contribution_suggestions"]', {
                                style: 'float: left;',
                                onclick: h.analytics.event({cat: 'project_view',act: 'project_contribsuggestions_view',project: project()})
                            }, 'Suggested values'),
                            m('a[id="about-link"][class="dashboard-nav-link mf ' + (h.hashMatch('#about') || h.hashMatch('') ? 'selected' : '') + ' "][href="#about"]', {
                                style: 'float: left;',
                                onclick: h.analytics.event({cat: 'project_view',act: 'project_about_view',project: project()})
                            }, 'About'),
                            m('a[id="posts-link"][class="dashboard-nav-link mf ' + (h.hashMatch('#posts') ? 'selected' : '') + '"][href="#posts"]', {
                                style: 'float: left;',
                                onclick: h.analytics.event({cat: 'project_view',act: 'project_posts_view',project: project()})
                            }, [
                                'News ',
                                m('span.badge', project() ? project().posts_count : '')
                            ]),
                            m('a[id="contributions-link"][class="w-hidden-small w-hidden-tiny dashboard-nav-link mf ' + (h.hashMatch('#contributions') ? 'selected' : '') + '"][href="#contributions"]', {
                                style: 'float: left;',
                                onclick: h.analytics.event({cat: 'project_view',act: 'project_contributions_view',project: project()})
                            }, [
                                'Support ',
                                m('span.badge.w-hidden-small.w-hidden-tiny', project() ? project().total_contributions : '-')
                            ]),
                            m('a[id="comments-link"][class="dashboard-nav-link mf ' + (h.hashMatch('#comments') ? 'selected' : '') + '"][href="#comments"]', {
                                style: 'float: left;',
                                onclick: h.analytics.event({cat: 'project_view',act: 'project_comments_view',project: project()})
                            }, [
                                'Comments ',
                                project() ? m('fb:comments-count[href="http://www.catarse.me/' + project().permalink + '"][class="badge project-fb-comment w-hidden-small w-hidden-tiny"][style="display: inline"]', m.trust('&nbsp;')) : '-'
                            ]),
                        ]),
                        project() ? m('.w-col.w-col-4.w-hidden-small.w-hidden-tiny', project().open_for_contributions ? [
                            m('.w-row.project-nav-back-button', [
                                m('.w-col.w-col-6.w-col-medium-8', [
                                    m('a.w-button.btn[href="/projects/' + project().id + '/contributions/new"]', {
                                        onclick: h.analytics.event({cat: 'contribution_create',act: 'contribution_floatingbtn_click', project: project()})
                                    }, 'Support this project')
                                ]),
                                m('.w-col.w-col-6.w-col-medium-4', {
                                    onclick: h.analytics.event({cat: 'project_view',act: 'project_floatingreminder_click', project: project()})
                                }, [
                                    m.component(projectReminder, {project: project, type: 'button', hideTextOnMobile: true})
                                ])
                            ])
                        ] : '') : ''
                    ])
                ])
            ]),
            (ctrl.isFixed() && !project().is_owner_or_admin) ? m('.w-section.project-nav') : ''
        ] : '');
    }
};

export default projectTabs;
