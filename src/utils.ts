import http from 'http'

export async function getBody(req: http.IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = ''
      req.on('data', chunk => {
        body += chunk
      })

      req.on('end', () => {
        try {
          resolve(JSON.parse(body))
        } catch (err) {
          console.log('========== end', err) // TODO
          reject(err)
        }
      })
    } catch (err) {
      console.log('==========', err) // TODO
      reject(err)
    }
  })
}

export function isUUID4(uuid: string): boolean {
  return uuid.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i) ? true : false
}

export async function sendError(res: http.ServerResponse, code: number, message: string) {
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = code
  res.end(JSON.stringify({ message }))
}

export async function sendError404(res: http.ServerResponse) {
  sendError(res, 404, 'Error 404 - wrong address')
}
