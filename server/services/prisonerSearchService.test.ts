import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import PrisonerSearchApiClient from '../data/prisonerSearchApiClient'
import PrisonerSearchService from './prisonerSearchService'

jest.mock('../data/prisonerSearchApiClient', () => ({
  ...jest.requireActual('../data/prisonerSearchApiClient'),
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ getPrisoner: jest.fn() })),
}))

describe('PrisonerSearchService', () => {
  const prisonerSearchApiClient = new PrisonerSearchApiClient(
    {} as AuthenticationClient,
  ) as jest.Mocked<PrisonerSearchApiClient>
  let prisonerSearchService: PrisonerSearchService

  beforeEach(() => {
    prisonerSearchService = new PrisonerSearchService(prisonerSearchApiClient)
  })

  it('should return only the configured prisoner fields', async () => {
    prisonerSearchApiClient.getPrisoner.mockResolvedValue({
      firstName: 'JOHN',
      lastName: 'SMITH',
      dateOfBirth: '1980-01-01',
      prisonId: 'MDI',
    } as never)

    const result = await prisonerSearchService.getPrisoner('A1234BC')

    expect(prisonerSearchApiClient.getPrisoner).toHaveBeenCalledWith('A1234BC')
    expect(result).toEqual({ firstName: 'JOHN', lastName: 'SMITH', dateOfBirth: '1980-01-01' })
  })

  it('should return null for missing fields', async () => {
    prisonerSearchApiClient.getPrisoner.mockResolvedValue({ firstName: 'JOHN' })

    const result = await prisonerSearchService.getPrisoner('A1234BC')

    expect(result).toEqual({ firstName: 'JOHN', lastName: null, dateOfBirth: null })
  })
})
