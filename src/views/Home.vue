<template>
  <div class="home">
    <el-table :data="gameInfoList" border style="width: 100%;">
      <el-table-column
          prop="start_time"
          label="日期"
          width="100">
        <template  slot-scope="scope">{{scope.row.start_time | formatDate}}</template>
      </el-table-column>
      <el-table-column
          prop="duration_value"
          label="时长(min)"
          width="100">
      </el-table-column>
      <el-table-column
          prop="first_blood_time_value"
          label="一血时间(min)"
          width="100">
      </el-table-column>
      <el-table-column label="天辉（Radiant）">
        <el-table-column
            prop="radiant_score"
            label="杀人数"
            width="100">
        </el-table-column>
        <el-table-column
            prop=""
            label="胜/负"
            width="100">
          <template slot-scope="scope">{{scope.row.radiant_win == 1 ? '胜' : '负'}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="夜魇（Dire）">
        <el-table-column
            prop="dire_score"
            label="杀人数"
            width="100">
        </el-table-column>
        <el-table-column
            prop=""
            label="胜/负"
            width="100">
          <template slot-scope="scope">{{scope.row.radiant_win == 1 ? '负' : '胜'}}</template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import resData from '../data/historyList'
import oneGameInfo from '../data/one'
// import gameInfoList from '../data/gameInfoList'

export default {
  name: "home",
  data() {
    return {
      gameIdList: [],
      gameInfoList: []
    }
  },
  computed: {
    res() {
      return resData
    },
    oneGameInfo() {
      let oneRes = oneGameInfo.result;
      oneRes.duration_value = this.formatSecond(oneRes.duration);
      oneRes.first_blood_time_value = this.formatSecond(oneRes.first_blood_time);
      return oneRes
    }
  },
  mounted() {
    // this.getHistoryGameList()
    // this.getGameIdList(this.res)
    // this.getGameInfo(4365260751)
    this.gameInfoList.push(this.oneGameInfo)
    this.getOnePlayerInfo(132)
  },
  methods: {
    formatSecond(i) {
      let min = parseInt(i / 60);
      let sec = i % 60;
      return min + ':' + sec
    },
    getHistoryGameList() {
      this.$http.getHistoryGameList({
        league_id: '10482',
        tournament_games_only: 1
      }).then((res) => {
        this.getGameIdList(res.data)
      })
    },
    getGameIdList(data) {
      data.result.matches.forEach((i) => {
        this.gameIdList.push(i.match_id);
      });
      for (let i = 0; i < this.gameIdList.length; i++) {
        this.getGameInfo(this.gameIdList[i])
      }
      setTimeout(() => {
        this.download('1.txt', JSON.stringify(this.gameInfoList))
      }, 30000)
    },
    getGameInfo(id) {
      this.$http.getGameInfo({
        match_id: id
      }).then((res) => {
        this.gameInfoList.push(res.data.result)
      }, (err) => {
        alert(err)
      })
    },
    getOnePlayerInfo(i) {
      let iValue = i.toString(2);
      let iValueLength = iValue.length;
      let demoValue = '00000000';
      if (iValueLength < 8) {
        let sup = demoValue.slice(0, 8 - iValueLength);
        iValue = sup + iValue;
      }
      console.log(iValue);
    },
    download(filename, text) {
      let element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  }
};
</script>
