const logger = require('./utils/logger')

logger.error('this is error')
logger.warn('this is warn')
logger.info('this is info')
logger.http('this is http')
logger.verbose('this is verbose')
logger.debug('this is debug')
logger.silly('this is silly')

const error = {
    message: 'File not found'
}

logger.error('Some error.', error)

logger.log(undefinedVariable) // to test exception handler


