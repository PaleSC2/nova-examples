const pathAwareContextProcessor = require('@palecio/nova-server').contextProcessors
  .pathAware;
const fs = require('fs').promises;
const path = require('path');

module.exports = pathAwareContextProcessor.extend({
  priority: 80,
  patterns: ['*greeting'],
  async process(executionContext, contentModel) {
    if (contentModel.user) {
      const locale = contentModel.user.language || '';
      const greetings = JSON.parse(
        (await fs.readFile(
          path.resolve(__dirname + '/../db/greetings.json')
        )).toString()
      );
      contentModel.greeting = greetings[locale];
    }
  }
});
