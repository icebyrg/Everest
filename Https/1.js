const secret = 3
function encrypt(message) {
  const buffer = Buffer.from(message)
  for (let i = 0; i < buffer.length; i++)
    buffer[i] += secret

  return buffer.toString()
}
function decrypt(message) {
  const buffer = Buffer.from(message)
  for (let i = 0; i < buffer.length; i++)
    buffer[i] += -secret

  return buffer.toString()
}
const message = 'abc'
const encryptMessage = encrypt(message)
console.log('encryptMessage', encryptMessage) // encryptMessage def
const decryptMessage = decrypt(encryptMessage)
console.log('decryptMessage', decryptMessage) // decryptMessage abc
