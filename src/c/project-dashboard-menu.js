/**
 * window.c.ProjectDashboardMenu component
 * build dashboard project menu for project owners
 * and admin.
 *
 * Example:
 * m.component(c.ProjectDashboardMenu, {
 *     project: projectDetail Object,
 * })
 */
import m from 'mithril';
import _ from 'underscore';
import I18n from 'i18n-js';
import h from '../h';

const I18nScope = _.partial(h.i18nScope, 'projects.dashboard_nav');
const linksScope = _.partial(h.i18nScope, 'projects.dashboard_nav_links');

const projectDashboardMenu = {
    controller(args) {
        let body = document.getElementsByTagName('body')[0],
            editLinksToggle = h.toggleProp(true, false),
            showPublish = h.toggleProp(true, false),
            bodyToggleForNav = h.toggleProp('body-project open', 'body-project closed');

        if (args.project().is_published) {
            editLinksToggle.toggle(false);
        }

        if (args.hidePublish) {
            showPublish.toggle(false);
        }

        return {
            body: body,
            editLinksToggle: editLinksToggle,
            showPublish: showPublish,
            bodyToggleForNav: bodyToggleForNav
        };
    },
    view(ctrl, args) {
        const project = args.project(),
              projectRoute = '/projects/' + project.id,
              editRoute = projectRoute + '/edit',
              editLinkClass = 'dashboard-nav-link-left ' + (project.is_published ? 'indent' : '');
        let optionalOpt = m('span.fontsize-smallest.fontcolor-secondary', ' (opcional)');

        ctrl.body.className = ctrl.bodyToggleForNav();

        return m('#project-nav', [
            m('.project-nav-wrapper', [
                m('nav.w-section.dashboard-nav.side', [
                    m('a#dashboard_preview_link.w-inline-block.dashboard-project-name[href="' + (project.is_published ? '/' + project.permalink : editRoute + '#preview') + '"]', [
                        m('img.thumb-project-dashboard[src="' + (_.isNull(project.large_image) ? '/assets/thumb-project.png' : project.large_image) + '"][width="114"]'),
                        m('.fontcolor-negative.lineheight-tight.fontsize-small', project.name),
                        m(`img.u-margintop-10[src="/assets/catarse_bootstrap/badge-${project.mode}-h.png"][width=80]`)

                    ]),
                    m('#info-links', [
                        m('a#dashboard_home_link[class="dashboard-nav-link-left ' + (h.locationActionMatch('insights') ? 'selected' : '') + '"][href="' + projectRoute + '/insights"]', [
                            m('span.fa.fa-bar-chart.fa-lg.fa-fw'), I18n.t('start_tab', I18nScope())
                        ]), (project.is_published ? [
                            m('a#dashboard_reports_link.dashboard-nav-link-left[href="' + editRoute + '#reports' + '"]', [
                                m('span.fa.fa.fa-table.fa-lg.fa-fw'), I18n.t('reports_tab', I18nScope())
                            ]),
                            m('a#dashboard_reports_link.dashboard-nav-link-left.u-marginbottom-30[href="' + editRoute + '#posts' + '"]', [
                                m('span.fa.fa-bullhorn.fa-fw.fa-lg'), I18n.t('posts_tab', I18nScope()), m('span.badge', project.posts_count)
                            ])
                        ] : '')
                    ]),
                    m('.edit-project-div', [
                        (!project.is_published ? '' : m('button#toggle-edit-menu.dashboard-nav-link-left', {
                            onclick: ctrl.editLinksToggle.toggle
                        }, [
                            m('span.fa.fa-pencil.fa-fw.fa-lg'), I18n.t('edit_project', I18nScope())
                        ])), (ctrl.editLinksToggle() ? m('#edit-menu-items', [
                            m('#dashboard-links', [
                                ((!project.is_published || project.is_admin_role) ? [
                                    m('a#basics_link[class="' + editLinkClass + '"][href="' + editRoute + '#basics' + '"]', I18n.t(`${project.mode}.basics_tab`, linksScope()) ),
                                    m('a#goal_link[class="' + editLinkClass + '"][href="' + editRoute + '#goal' + '"]', I18n.t(`${project.mode}.goal_tab`, linksScope())),
                                ] : ''),
                                m('a#description_link[class="' + editLinkClass + '"][href="' + editRoute + '#description' + '"]', I18n.t(`${project.mode}.description_tab`, linksScope())),
                                m('a#video_link[class="' + editLinkClass + '"][href="' + editRoute + '#video' + '"]', [
                                    'Vídeo', m('span.fontsize-smallest.fontcolor-secondary', ' (opcional)')
                                ]),
                                //m('a#budget_link[class="' + editLinkClass + '"][href="' + editRoute + '#budget' + '"]', I18n.t(`${project.mode}.budget_tab`, linksScope())),
                                m('a#card_link[class="' + editLinkClass + '"][href="' + editRoute + '#card' + '"]', I18n.t(`${project.mode}.card_tab`, linksScope())),
                                //m('a#dashboard_reward_link[class="' + editLinkClass + '"][href="' + editRoute + '#reward' + '"]', [
                                //    'Recompensas', optionalOpt
                                //]),
                                m('a#dashboard_user_about_link[class="' + editLinkClass + '"][href="' + editRoute + '#user_about' + '"]', I18n.t(`${project.mode}.about_you_tab`, linksScope())),
                                ( (project.is_published || project.state === 'draft') || project.is_admin_role ? [
                                    m('a#dashboard_user_settings_link[class="' + editLinkClass + '"][href="' + editRoute + '#user_settings' + '"]', I18n.t(`${project.mode}.account_tab`, linksScope())),
                                ] : ''), (!project.is_published ? [
                                    m('a#dashboard_preview_link[class="' + editLinkClass + '"][href="' + editRoute + '#preview' + '"]', [
                                        m('span.fa.fa-fw.fa-eye.fa-lg'), I18n.t(`${project.mode}.preview_tab`, linksScope())
                                    ]),
                                ] : '')
                            ])
                        ]) : ''),
                        ((!project.is_published && ctrl.showPublish()) ? [
                            m('.btn-send-draft-fixed',
                              (project.mode === 'aon' ? [
                                  (project.state === 'draft' ? m('a.btn.btn-medium[href="/projects/' + project.id + '/validate_publish"]', [
                                      I18n.t('publish', I18nScope()), m.trust('&nbsp;&nbsp;'), m('span.fa.fa-chevron-right')
                                  ]) : '')
                              ] : [
                                  (project.state === 'draft' ? m('a.btn.btn-medium[href="/flexible_projects/' + project.id + '/validate_publish"]', [
                                      I18n.t('publish', I18nScope()), m.trust('&nbsp;&nbsp;'), m('span.fa.fa-chevron-right')
                                  ]) : '')
                              ])
                             )
                        ] : [
                            ((project.mode === 'flex' && project.is_published) ? [
                                m('.btn-send-draft-fixed',
                                  (_.isNull(project.expires_at) ? m('a.w-button.btn.btn-medium.btn-secondary-dark[href="/projects/' + project.id + '/edit#announce_expiration"]', I18n.t('announce_expiration', I18nScope())) : ''))
                            ] : '')
                        ])
                    ]),
                ]),
            ]),
            m('a.btn-dashboard href="js:void(0);"', {
                onclick: ctrl.bodyToggleForNav.toggle
            }, [
                m('span.fa.fa-bars.fa-lg')
            ])
        ]);
    }
};

export default projectDashboardMenu;
