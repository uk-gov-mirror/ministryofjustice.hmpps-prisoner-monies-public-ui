import type { SuperAgentRequest } from 'superagent'
import { stubPing } from './wiremock'

export default {
  stubPing: (httpStatus = 200): SuperAgentRequest => stubPing('/prisoner-search-api', httpStatus),
}
