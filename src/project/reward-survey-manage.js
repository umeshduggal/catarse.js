window.c.project.RewardSurveyManage = (function(m, models, _, h){
  return {
    controller: function() {
      var rewardDetails = m.prop([]),
          vm = m.postgrest.filtersVM({id: 'eq'});

      vm.id(m.route.param('rewardID'));
      models.rewardDetail.getRow(vm.parameters()).then(rewardDetails);

      return {
        rewardDetails: rewardDetails
      };
    },
    view: function(ctrl) {
      return _.map(ctrl.rewardDetails(), function(reward){
        return m('.w-section.dashboard-header.u-text-center.u-marginbottom-40', [
          m('.w-container', [
            m('.w-row', [
              m('.w-col.w-col-2'),
              m('.w-col.w-col-8', [
                m('.fontsize-small', 'Questionário para os apoiadores de'),
                m('.fontsize-larger.fontweight-semibold.u-marginbottom-10', 'Recompensa de R$' + h.formatNumber(reward.minimum_value, 2, 3)),
                m('.fontcolor-secondary.fontsize-smaller', reward.description)
                ]),
              m('.w-col.w-col-2')
            ])
          ])
        ]);
      });
    }
  };
}(window.m, window.c.models, window._, window.c.h));
