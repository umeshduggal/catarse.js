window.c.RewardManageBox = (function(m, h) {
  return {
    view: function(ctrl, args) {
      var reward = args.reward;
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
    }
  };
}(window.m, window.c.h));
