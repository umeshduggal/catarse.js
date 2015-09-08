describe('RewardManageBox', function(){
  describe('view', function() {
    beforeAll(function() {
      reward = {
        id: 25494, project_id: 6051, description: "3 livrinhos impressos (frete grátis)",
        minimum_value: 45.0, maximum_contributions: null, deliver_at: "2015-10-01T03:00:00",
        updated_at: "2015-07-13T14:27:54.030958", paid_count:16, waiting_payment_count:2
      };

      output = mq(m.component(c.RewardManageBox, {reward: reward}));
    })

    it('should return an HTML element describing the reward value', function() {
      expect(output.contains('Recompensa R$ 45,00')).toBeTrue();
    });
  });
});
