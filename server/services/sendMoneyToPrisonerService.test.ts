import SendMoneyToPrisonerService from './sendMoneyToPrisonerService'

describe('SendMoneyToPrisonerService', () => {
  const sendMoneyToPrisonerService = new SendMoneyToPrisonerService()

  describe('isPrisonerKnown', () => {
    it('returns true when prisoner is found', async () => {
      const result = await sendMoneyToPrisonerService.isPrisonerKnown('A0076EA', '1999-01-01')
      expect(result).toBe(true)
    })

    it('returns false for a well-formed but unrecognised prisoner number', async () => {
      const result = await sendMoneyToPrisonerService.isPrisonerKnown('A1409AX', '1989-01-21')
      expect(result).toBe(false)
    })

    it('returns false when the number matches but the date of birth does not', async () => {
      const result = await sendMoneyToPrisonerService.isPrisonerKnown('A0076EA', '2000-02-02')
      expect(result).toBe(false)
    })
  })

  describe('checkPaymentServiceAvailable', () => {
    it('returns available (stubbed until the backend check is implemented)', async () => {
      const result = await sendMoneyToPrisonerService.checkPaymentServiceAvailable()

      expect(result).toEqual({ available: true })
    })
  })
})
