import * as _ from 'lodash'

const html =
    `
{{message}}
{{email}}
{{username}}
{{password}}
`
/**
 * template for user creadentials
 * @param email 
 * @param firstname 
 * @param username 
 * @param password 
 * @param message 
 */
export const welcome = (userCredentioan: {
     email: string; username: string; password: string; message: string; }) => {
    let temp = _.template(html)
    return temp({ ...userCredentioan })
}