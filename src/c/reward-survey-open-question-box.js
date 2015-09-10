window.c.RewardSurveyOpenQuestionBox = (function(m, h) {
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
          m('.fontweight-semibold.fontsize-smallest.u-marginbottom-10', 'Resposta livre')
        ]),
        m('.w-col.w-col-8', (ctrl.displayFormBox() ? [
          m('.card', [
            m('.w-row', [
              m('.w-col.w-col-11.w-col-small-11.w-col-tiny-11', [
                m('.fontsize-base.fontweight-semibold.fontcolor-secondary.u-marginbottom-20', 'Qual a sua cor favorita?'),
                m('.card', [
                  m('div'),
                  m('.fontsize-smaller.fontcolor-terciary', 'Resposta aqui...')
                ])
              ]),
              m('.w-col.w-col-1.w-col-small-1.w-col-tiny-1', [
                m('a.btn.btn-small.btn-terciary.fa.fa-lg.fa-edit.btn-no-border[href="javascript:void(0);"]', {onclick: ctrl.displayFormBox.toggle})
              ])
            ])
          ])
        ] : [
          m('.w-form.card.u-radius.u-marginbottom-20', [
            m('form[data-name="Email Form 2"][id="email-form-2"][name="email-form-2"]', [
              m('.w-row', [m('.w-col.w-col-4', [
                m('label.fontsize-smaller[for="name-3"]', 'Título da pergunta')
              ]),
              m('.w-col.w-col-8', [
                m('input.w-input.text-field.positive[data-name="Name 5"][id="name-5"][name="name-5"][type="text"]')
              ])
            ]),
            m('.w-row.u-marginbottom-40', [
              m('.w-col.w-col-4', [
                m('label.fontsize-smaller[for="name-3"]', 'Texto de ajuda')
              ]),
              m('.w-col.w-col-8', [
                m('input.w-input.text-field.positive')
              ])
            ]),
            m('.w-row', [
              m('.w-col.w-col-5.w-col-small-5.w-col-tiny-5.w-sub-col', [
                m('input.w-button.btn-terciary.btn.btn-small[type="submit"][value="Salvar"]')
              ]),
              m('.w-col.w-col-1.w-col-small-1.w-col-tiny-1', [
                m('a.btn.btn-small.btn-terciary.fa.fa-lg.fa-trash.btn-no-border[href="javascript:void(0);"]', {onclick: ctrl.displayFormBox.toggle})
              ]),
              m('.w-col.w-col-6.w-col-small-6.w-col-tiny-6')
            ])
          ])
        ])
      ]))
      ]);
    }
  };
}(window.m, window.c.h));
