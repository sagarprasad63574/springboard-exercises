
it('should calculate the monthly rate correctly', function () {
  let values = {amount: 10000, years: 5, rate: 0.5};
  expect(calculateMonthlyPayment(values)).toEqual('168.79');

});


it("should return a result with 2 decimal places", function() {
  let values = { amount: 10043, years: 8, rate: 5.8};
  expect(calculateMonthlyPayment(values)).toEqual('131.00');
});

/// etc
