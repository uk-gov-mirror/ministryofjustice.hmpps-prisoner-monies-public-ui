import nock from 'nock'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import PrisonerSearchApiClient from './prisonerSearchApiClient'
import config from '../config'

describe('PrisonerSearchApiClient', () => {
  let prisonerSearchApiClient: PrisonerSearchApiClient
  let mockAuthenticationClient: jest.Mocked<AuthenticationClient>

  beforeEach(() => {
    mockAuthenticationClient = {
      getToken: jest.fn().mockResolvedValue('test-system-token'),
    } as unknown as jest.Mocked<AuthenticationClient>

    prisonerSearchApiClient = new PrisonerSearchApiClient(mockAuthenticationClient)
  })

  afterEach(() => {
    nock.cleanAll()
    jest.resetAllMocks()
  })

  describe('getPrisoner', () => {
    it('should GET the prisoner by number with configured response fields using a system token', async () => {
      const prisoner = { firstName: 'JOHN', lastName: 'SMITH', dateOfBirth: '1980-01-01' }
      nock(config.apis.prisonerSearchApi.url)
        .get('/prisoner/A1234BC')
        .query({ responseFields: 'firstName,lastName,dateOfBirth' })
        .matchHeader('authorization', 'Bearer test-system-token')
        .reply(200, prisoner)

      const response = await prisonerSearchApiClient.getPrisoner('A1234BC')

      expect(response).toEqual(prisoner)
      expect(mockAuthenticationClient.getToken).toHaveBeenCalledWith(undefined)
    })

    it('should reject with a 404 when the prisoner is not found', async () => {
      const notFound = { status: 404, developerMessage: 'A7545ER not found' }
      nock(config.apis.prisonerSearchApi.url)
        .get('/prisoner/A7545ER')
        .query({ responseFields: 'firstName,lastName,dateOfBirth' })
        .reply(404, notFound)

      await expect(prisonerSearchApiClient.getPrisoner('A7545ER')).rejects.toMatchObject({
        responseStatus: 404,
        data: notFound,
      })
    })
  })
})
