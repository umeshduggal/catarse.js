window.c.project.RewardSurveyManage = (function(m){
  return {
    view: function() {
      return m('.w-section.dashboard-header.u-text-center.u-marginbottom-40', [
        m('.w-container', [
          m('.w-row', [
            m('.w-col.w-col-2'),
            m('.w-col.w-col-8', [
              m('.fontsize-small', 'Questionário para os apoiadores de'),
              m('.fontsize-larger.fontweight-semibold.u-marginbottom-10', 'Recompensa de R$20'),
              m('.fontcolor-secondary.fontsize-smaller',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec,',
                ' mattis ac neque. Duis vulputate commodo lectus, ac blandit elit ...')
              ]),
            m('.w-col.w-col-2')
          ])
        ])
      ]);
    }
  };
}(window.m));
