import * as _ from 'lodash'

const html =
    `
{{message}}
{{ip}}
{{dateTime}}

`
/**
 * template for user creadentials
 * @param ip 
 * @param dateTime 
 * @param message 
 */
export const report = (reportDetail: { ip: string; dateTime: string; message: string }) => {
    let temp = _.template(html)
    return temp({ ...reportDetail })
}