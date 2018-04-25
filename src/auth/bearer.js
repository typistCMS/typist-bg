module.exports = {

  request: function (req, token) {
    this.options.http._setHeaders.call(this, req, {Authorization: 'JWT ' + token})
  },

  response: function (res) {
    let token = this.options.http._httpData.call(this, res).token

    if (token) {
      return token
    }
  }
}
