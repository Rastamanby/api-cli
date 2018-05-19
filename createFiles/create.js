const fs = require('fs')
const ejs = require('ejs')
const path = require('path');
const rootDir = path.dirname(require.main.filename);
const appDir = process.cwd()

const create = (type, name, next) => {
  const template = fs.readFileSync(`${rootDir}/templates/${type.toLowerCase()}.ejs`, 'utf8')
  const rendered = ejs.render(template, { name })
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
  return fs.appendFileSync(`${filePath}${name.toLowerCase()}.js`, rendered, (err) => (
    err ? console.log(err) : next()
  ))
}

module.exports = create