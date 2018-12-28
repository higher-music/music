/**
 * Created by TouchNet James.
 * 内容主要包含一些公用的js方法
 * 2018-07-06
 */

/**
 * 获取列表数据区间（分页）
 */
export function getDataRange(total, pageObj) {
  let totalPage = 0, //总页数
    pageSize = pageObj.pageSize; //每页显示行数
  //总共分几页
  if (total / pageSize > parseInt(total / pageSize)) {
    totalPage = parseInt(total / pageSize) + 1;
  } else {
    totalPage = parseInt(total / pageSize);
  }
  let currentPage = pageObj.curPage, //当前页数
    startRow = (currentPage - 1) * pageSize, //开始显示的行索引
    endRow = currentPage * pageSize; //结束显示的行索引
  endRow = endRow + 1 > total ? total : endRow;
  return { startRow, endRow }
}

/**
 * 日期比较
 * @param {*} s1 
 * @param {*} s2 
 */
export function compareDate(s1, s2) {
  // console.log(s1, s2);
  return ((new Date(s1.replace(/-/g, "\/"))) > (new Date(s2.replace(/-/g, "\/"))));
};
