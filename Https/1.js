let secret = 3
function encrypt(message) {
  let buffer = Buffer.from(message)
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] += secret
  }
  return buffer.toString()
}
function decrypt(message) {
  let buffer = Buffer.from(message)
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] += -secret
  }
  return buffer.toString()
}
let message = 'abc'
let encryptMessage = encrypt(message)
console.log('encryptMessage', encryptMessage) // encryptMessage def
let decryptMessage = decrypt(encryptMessage)
console.log('decryptMessage', decryptMessage) // decryptMessage abc
