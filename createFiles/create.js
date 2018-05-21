const fs = require('fs')
const ejs = require('ejs')
const path = require('path');
const rootDir = path.dirname(require.main.filename);
const appDir = process.cwd()

const create = (type, answers, next) => {
  const { name } = answers
  console.log(answers)
  const template = fs.readFileSync(`${rootDir}/templates/${type.toLowerCase()}.ejs`, 'utf8')
  const rendered = ejs.render(template, answers)
  let filePath = ''
  switch (type) {
    case 'Model':
      filePath = `${appDir}/controllers/models/`
      break;
      case 'Route':
      filePath = `${appDir}/controllers/routes/`
      break;
      case 'Test':
      filePath = `${appDir}/test/`
      break;
  
    default:
      break;
  }
  fs.appendFileSync(`${filePath}${name.toLowerCase()}.js`, rendered, (err) => (
    next()
  ))
}

module.exports = create