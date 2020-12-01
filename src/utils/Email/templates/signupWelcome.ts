import * as _ from 'lodash'

const html =
    `
{{message}}
{{email}}
{{firstname}}
{{username}}
{{password}}
`

export const welcome = (email,firstname,username,password,message) => { 
let temp=_.template(html)
return temp({email,firstname,username,password,message})
}