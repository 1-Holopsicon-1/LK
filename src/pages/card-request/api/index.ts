import { cardRequestApi as realApi } from './card-request-api-nomock'
import { cardRequestMockApi } from './mock'

// В зависимости от режима разработки выбираем API
const USE_MOCK_API = import.meta.env.MODE === 'development' && import.meta.env.VITE_USE_MOCK === 'true'

export const cardRequestApi = USE_MOCK_API ? cardRequestMockApi : realApi
