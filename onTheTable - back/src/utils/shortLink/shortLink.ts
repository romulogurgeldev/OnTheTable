const axios = require('axios');

const headers = {
  "Content-Type": "application/json",
  "apikey": "eb08d3da5a944e47baec86800fce29a3",

}
export async function encurtaUrl (url: string) {

    let endpoint = "https://api.rebrandly.com/v1/links";
    let linkRequest = {
        destination: url,
        domain: { fullName: "rebrand.ly" }
        //, slashtag: "A_NEW_SLASHTAG"
        //, title: "Rebrandly YouTube channel"
    }
    const apiCall = {
        method: 'post',
        url: endpoint,
        data: linkRequest,
        headers: headers
    }
    try {
        let apiResponse = await axios(apiCall);
        let link = apiResponse.data;
        return link.shortUrl;
    } catch (error) {
        console.log(error)
    }

}