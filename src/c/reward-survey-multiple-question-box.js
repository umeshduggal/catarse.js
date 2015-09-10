window.c.RewardSurveyMultipleQuestionBox = (function(m, h) {
  return {
    controller: function(args) {
      var question = args.question,
          displayFormBox = h.toggleProp(false, true);

      return {
        question: question,
        displayFormBox: displayFormBox
      };
    },
    view: function(ctrl) {
      return m('.w-row.card.card-terciary.u-marginbottom-20.medium', [
        m('.w-col.w-col-4.w-sub-col', [
          m('.fontweight-semibold.fontsize-smallest.u-marginbottom-10', 'Múltipla escolha')
        ]),
        m('.w-col.w-col-8', (ctrl.displayFormBox() ? [
          m('.card', [
            m('.w-row', [
              m('.w-col.w-col-11.w-col-small-11.w-col-tiny-11', [
                m('.fontsize-base.fontweight-semibold.fontcolor-secondary.u-marginbottom-20', 'Tamanho da camisa')
              ]),
              m('.w-col.w-col-1.w-col-small-1.w-col-tiny-1', [
                m('a.btn.btn-small.btn-terciary.fa.fa-lg.fa-edit.btn-no-border[href="#"]')
              ])
            ]),
            m('.w-form', [
              m('form', [
                m('.w-radio.fontsize-small', [
                  m('input.w-radio-input'),
                  m('label.w-form-label', 'P')
                ]),
                m('.w-radio.fontsize-small', [
                  m('input.w-radio-input[type="radio"]'),
                  m('label.w-form-label', 'M')
                ]),
              ]),
            ])
          ])
        ] : [
          m('.w-form.card.u-radius.u-marginbottom-20', [
            m('form', [
              m('.w-row', [
                m('.w-col.w-col-4', [
                  m('label.fontsize-smaller', 'Título da pergunta')
                ]),
                m('.w-col.w-col-8', [
                  m('input.w-input.text-field.positive[type="text"]')
                ])
              ]),
              m('.w-row', [
                m('.w-col.w-col-4', [
                  m('label.fontsize-smaller', 'Texto de ajuda')
                ]),
                m('.w-col.w-col-8', [
                  m('input.w-input.text-field.positive[type="text"]')
                ])
              ]),
              m('.w-row.u-marginbottom-40', [
                m('.w-col.w-col-4', [
                  m('label.fontsize-smaller', 'Opções')
                ]),
                m('.w-col.w-col-8', [
                  m('.w-row', [
                    m('.w-col.w-col-1.w-col-small-1.w-col-tiny-1.fa.fa-circle-o.fontcolor-terciary.prefix.u-text-center'),
                    m('.w-col.w-col-10.w-col-small-10.w-col-tiny-10', [
                      m('input.w-input.text-field.positive')
                    ]),
                    m('.w-col.w-col-1.w-col-small-1.w-col-tiny-1')
                  ]),
                  m('.w-row', [
                    m('.w-col.w-col-1.w-col-small-1.w-col-tiny-1.fa.fa-circle-o.fontcolor-terciary.prefix.u-text-center'),
                    m('.w-col.w-col-10.w-col-small-10.w-col-tiny-10', [
                      m('input.w-input.text-field.positive')
                    ]),
                    m('.w-col.w-col-1.w-col-small-1.w-col-tiny-1', [
                      m('a.btn.btn-no-border.btn-terciary.fa.fa-trash.btn-medium[href="#"]', '.')
                    ])
                  ]),
                  m('.w-row', [
                    m('.w-col.w-col-1.w-col-small-1.w-col-tiny-1'),
                    m('.w-col.w-col-11.w-col-small-11.w-col-tiny-11', [
                      m('a.fontcolor-secondary.fontsize-smallest.link-hidden[href="#"]', 'Adicionar mais uma opção')
                    ])
                  ])
                ])
              ]),
              m('.w-row', [
                m('.w-col.w-col-5.w-col-small-5.w-col-tiny-5.w-sub-col', [
                  m('input.w-button.btn-terciary.btn.btn-small[type="submit"][value="Salvar"]')
                ]),
                m('.w-col.w-col-1.w-col-small-1.w-col-tiny-1', [
                  m('a.btn.btn-small.btn-terciary.fa.fa-lg.fa-trash.btn-no-border[href="#"]')
                ]),
                m('.w-col.w-col-6.w-col-small-6.w-col-tiny-6')
              ])
            ]),
          ])
      ]))
      ]);
    }
  };
}(window.m, window.c.h));
