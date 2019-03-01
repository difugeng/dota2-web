import axios from './index'

export default {
  getHistoryGameList(params) { // 获取历史某届赛事所有的比赛
    params.key = '148C910CE1B3D72BD96B7DF714DD0531';
    return axios.get('GetMatchHistory/V001/', params)
  },
  getGameInfo(params) { // 获取某个比赛的详情
    params.key = '148C910CE1B3D72BD96B7DF714DD0531';
    return axios.get('GetMatchDetails/V001/', params)
  }
}