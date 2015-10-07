window.c.project.RewardsManage = ((m, models, _, c) => {
  return {
    controller: (args) => {
      const vm = m.postgrest.filtersVM({project_id: 'eq'}),
            rewardDetails = m.prop([]);

      vm.project_id(args.root.getAttribute('data-id'));

      models.rewardDetail.getPage(vm.parameters()).then(rewardDetails);

      return {
        rewardDetails: rewardDetails
      };
    },
    view: (ctrl) => {
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
            _.map(ctrl.rewardDetails(), (reward) => {
              return m.component(c.RewardManageBox, {reward: reward});
            })
          ]),
          m('.w-col.w-col-1')
        ])
      ]);
    }
  };
}(window.m, window.c.models, window._, window.c));
