import http from '../../resources/http.service'

export default {
  get (params) {
    return http.get(`service`, params)
  }
}
