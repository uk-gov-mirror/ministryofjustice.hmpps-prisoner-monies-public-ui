import type { RequestHandler } from 'express'
import SendMoneyToPrisonerService from '../services/sendMoneyToPrisonerService'
import { debitCardPaths } from '../constants/paths'

export default function paymentChoiceGetHandler(
  sendMoneyToPrisonerService: SendMoneyToPrisonerService,
): RequestHandler {
  return async (_req, res) => {
    const { available, messageToUsers } = await sendMoneyToPrisonerService.checkPaymentServiceAvailable()

    return res.render('pages/payment-choice', {
      continueUrl: res.locals.localePath(debitCardPaths.PRISONER_DETAILS),
      serviceAvailable: available,
      serviceUnavailableMessage: messageToUsers,
    })
  }
}
