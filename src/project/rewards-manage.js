window.c.project.RewardsManage = (function(m, models, h, _){
  return {
    controller: function(args) {
      var vm = m.postgrest.filtersVM({project_id: 'eq'}),
          projectDetails = m.prop([]);

      vm.project_id(args.root.getAttribute('data-id'));

      models.projectDetail.getRow(vm.parameters()).then(projectDetails);

      return {
        projectDetails: projectDetails
      };
    },
    view: function(ctrl) {
      return m('#rewards-manage', [
        m('.w-section.dashboard-header.u-text-center.u-marginbottom-40', [
          m('.w-container', [
            m('.w-row', [
              m('.w-col.w-col-2'),
              m('.w-col.w-col-8', [
                m('.fontweight-semibold.fontsize-larger.lineheight-looser', 'Gerenciar questionários'),
                m('.fontsize-base',
                  'Envie perguntas customizadas a seus apoiadores e garanta uma ótima experiência na entrega de recompensas')
                ]),
              m('.w-col.w-col-2')
            ])
          ])
        ]),
        m('.w-row', [
          m('.w-col.w-col-1'),
          m('.w-col.w-col-10', [
            _.map(ctrl.projectDetails(), function(projectDetail){
              return _.map(projectDetail.rewards, function(reward){
                return m('.w-row.card.u-radius.u-marginbottom-20.medium.card-terciary', [
                  m('.w-col.w-col-8.u-marginbottom-30.w-sub-col', [
                    m('.fontsize-large.fontweight-semibold', 'Recompensa R$ ' + h.formatNumber(reward.minimum_value, 2, 3)),
                    m('.fontsize-small.fontweight-semibold.u-marginbottom-10', reward.paid_count + ' apoiadores'),
                    m('.fontsize-smaller', reward.description)
                  ]),
                  m('.w-col.w-col-4', [
                    m('a.btn.btn-medium[href="/' + reward.id + '"]', {config: m.route},'Criar questionário')
                  ])
                ]);
              });
            })
          ]),
          m('.w-col.w-col-1')
        ])
      ]);
    }
  };
}(window.m, window.c.models, window.c.h, window._));
