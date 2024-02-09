import http from 'http'

export async function getBody(req: http.IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = ''
      req.on('data', chunk => {
        body += chunk
      })

      req.on('end', () => {
        //console.log('body 1 : ', body)
        try {
          resolve(JSON.parse(body))
        } catch (err) {
          console.log('========== end', err)
          reject(err)
        }
      })
    } catch (err) {
      console.log('==========', err)
      reject(err)
    }
  })
}
