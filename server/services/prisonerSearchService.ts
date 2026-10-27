import PrisonerSearchApiClient, { PRISONER_RESPONSE_FIELDS, type Prisoner } from '../data/prisonerSearchApiClient'

export default class PrisonerSearchService {
  constructor(private readonly prisonerSearchApiClient: PrisonerSearchApiClient) {}

  async getPrisoner(prisonerNumber: string): Promise<Prisoner> {
    const prisoner = await this.prisonerSearchApiClient.getPrisoner(prisonerNumber)

    return Object.fromEntries(PRISONER_RESPONSE_FIELDS.map(field => [field, prisoner[field] ?? null])) as Prisoner
  }
}
