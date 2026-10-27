import { RestClient, asSystem } from '@ministryofjustice/hmpps-rest-client'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import config from '../config'
import logger from '../../logger'

// Add or remove Prisoner Search fields here; the response type follows this list.
export const PRISONER_RESPONSE_FIELDS = ['firstName', 'lastName', 'dateOfBirth'] as const

export type PrisonerResponseField = (typeof PRISONER_RESPONSE_FIELDS)[number]

export type Prisoner = Record<PrisonerResponseField, string | null>

export default class PrisonerSearchApiClient extends RestClient {
  constructor(authenticationClient: AuthenticationClient) {
    super('Prisoner Search API', config.apis.prisonerSearchApi, logger, authenticationClient)
  }

  getPrisoner(prisonerNumber: string) {
    return this.get<Partial<Prisoner>>(
      {
        path: `/prisoner/${encodeURIComponent(prisonerNumber)}`,
        query: { responseFields: PRISONER_RESPONSE_FIELDS.join(',') },
      },
      asSystem(),
    )
  }
}
