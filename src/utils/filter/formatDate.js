export default (value, fmt) => {
  value = value.toString().length === 10 ? value + '000' : value;
  if (fmt == null || fmt === undefined || fmt.length === 0) {
    fmt = 'yyyy-MM-dd'
  }
  let date = new Date(parseInt(value))
  let local = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in local) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (local[k]) : (('00' + local[k]).substr(('' + local[k]).length))) }
  return fmt
}
