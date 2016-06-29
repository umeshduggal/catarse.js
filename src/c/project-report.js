/**
 * window.c.projectReport component
 * Render project report form
 *
 */
import m from 'mithril';
import models from '../models';
import h from '../h';
import postgrest from 'mithril-postgrest';

const projectReport = {
    controller(args) {
        let displayForm = h.toggleProp(false, true),
            sendSuccess = m.prop(false),
            user = h.getUser(),
            email = m.prop(user.email),
            details = m.prop(''),
            reason = m.prop(''),
            l = m.prop(false),
              sendReport = () => {
                  let loaderOpts = models.projectReport.postOptions({
                    email: email(),
                    details: details(),
                    reason: reason() ,
                    project_id: h.getCurrentProject().project_id
                });
                  l = postgrest.loaderWithToken(loaderOpts);

                  l.load().then(sendSuccess(true));
                  return false;
              };

        return {
            displayForm: displayForm,
            sendSuccess: sendSuccess,
            sendReport: sendReport,
            user: user,
            email: email,
            details: details,
            reason: reason
        };
    },

    view(ctrl, args) {
        const user = ctrl.user;
        return m('.card.card-terciary.u-radius',
                    [
                      m('.fontsize-small.u-marginbottom-20',
                        [
                          'Este projeto desrespeita',
                          m.trust('&nbsp;'),
                          m('a.alt-link[href=\'http://suporte.catarse.me/hc/pt-br/articles/202387638\'][target=\'_blank\']',
                            'our rules ? '
                          )
                        ]
                      ),
                      ctrl.sendSuccess() ?
                       m('.w-form',
                        m('p',
                          'Thank you! Their complaint was received.'
                        )
                      ) :
                      [
                        m('.a.w-button.btn.btn-medium.btn-terciary.btn-inline[href=\'javascript:void(0);\']',{onclick: ctrl.displayForm.toggle},
                        'Report this project'
                      ),
                      ctrl.displayForm() ? m('#report-form.u-margintop-30',
                        m('.w-form',
                          m('form', {onsubmit: ctrl.sendReport},
                            [
                              m('.fontsize-small.fontweight-semibold.u-marginbottom-10',
                                'Why are you reporting this project?'
                              ),
                              m('select.w-select.text-field.positive[required=\'required\']', {onchange: m.withAttr('value', ctrl.reason)},
                                [
                                  m('option[value=\'\']',
                                    'Select a reason'
                                  ),
                                  m('option[value=\'Intellectual property infringement\']',
                                    'Intellectual property infringement'
                                  ),
                                  m('option[value=\'Libel, slander , defamation or discrimination\']',
                                    'Libel, slander , defamation or discrimination'
                                  ),
                                  m('option[value=\'Scope of prohibited project\']',
                                    'Scope of prohibited project'
                                  ),
                                  m('option[value=\'Prohibited rewards\']',
                                    'Prohibited rewards'
                                  ),
                                  m('option[value=\'Dinners explicit and free sex\']',
                                    'Dinners explicit and free sex'
                                  ),
                                  m('option[value=\'SPAM Abuse\']',
                                    'SPAM Abuse'
                                  ),
                                  m('option[value=\'Others\']',
                                    'Others'
                                  )
                                ]
                              ),
                              m('textarea.w-input.text-field.positive.u-marginbottom-30', {placeholder: 'Please give more details to help us identify the problem', onchange: m.withAttr('value', ctrl.details)}),
                              m('.fontsize-small.fontweight-semibold.u-marginbottom-10',
                                'Your email'
                              ),
                              m(`input.w-input.text-field.positive.u-marginbottom-30[required='required'][type='text'][value="${ctrl.email()}"]`, {onchange: m.withAttr('value', ctrl.email)}),
                              m('input.w-button.btn.btn-medium.btn-inline.btn-dark[type=\'submit\'][value=\'Send Report\']')
                            ]
                          )
                        )
                      ) : '']

                    ]
                  );
    }
};

export default projectReport;
