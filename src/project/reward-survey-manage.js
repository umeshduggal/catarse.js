window.c.project.RewardSurveyManage = (function(m, models, _, h, c){
  return {
    controller: function() {
      var rewardDetails = m.prop([]),
          questionCollection = m.prop([]),
          vm = m.postgrest.filtersVM({id: 'eq'}),
          insertQuestion = function(event) {
            var questionBoxes = {
                  open_text: 'RewardSurveyOpenQuestionBox',
                  multiple: 'RewardSurveyMultipleQuestionBox'
                },
                currentQuestionBox = m.component(c[questionBoxes[event.target.value]], {
                  question: {}
                });

            if (currentQuestionBox) {
              questionCollection().push(currentQuestionBox);
            }
          };

      vm.id(m.route.param('rewardID'));
      models.rewardDetail.getRow(vm.parameters()).then(rewardDetails);

      return {
        rewardDetails: rewardDetails,
        insertQuestion: insertQuestion,
        questionCollection: questionCollection
      };
    },
    view: function(ctrl) {
      return _.map(ctrl.rewardDetails(), function(reward){
        return m('#reward_survey_manage', [
          m('.w-section.dashboard-header.u-text-center.u-marginbottom-40', [
            m('.w-container', [
              m('.w-row', [
                m('.w-col.w-col-2'),
                m('.w-col.w-col-8', [
                  m('.fontsize-small', 'Questionário para os apoiadores de'),
                  m('.fontsize-larger.fontweight-semibold.u-marginbottom-10', 'Recompensa de R$' + h.formatNumber(reward.minimum_value, 2, 3)),
                  m('.fontcolor-secondary.fontsize-smaller', reward.description)
                  ]),
                m('.w-col.w-col-2')
              ]),
            ]),
          ]),
          m('.w-section.section', [
            m('.w-container', [
              m('.w-row', [
                m('.w-col.w-col-2'),
                m('.w-col.w-col-8', [
                  _.map(ctrl.questionCollection(), function(question){
                    return question;
                  }),
                  m('.w-form', [
                    m('select.w-select.text-field.medium.u-margintop-40.btn-message', {oninput: ctrl.insertQuestion}, [
                      m('option[value=""]', '+ Adicionar pergunta'),
                      m('option[value="open_text"]', 'Resposta livre'),
                      m('option[value="multiple"]', 'Múltipla escolha')
                    ])
                  ])
                ]),
                m('.w-col.w-col2')
              ])
            ])
          ])
        ]);
      });
    }
  };
}(window.m, window.c.models, window._, window.c.h, window.c));
