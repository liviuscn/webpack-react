
/* 
    税局使用的跳转方法，直接打开url会报错
    //let url = 'https://etax.shanghai.chinatax.gov.cn/wszx-web/bszm/apps/views/beforeLogin/indexBefore/pageIndex.html'
*/

function open_new_window(link) {
    try {
        window.open('javascript:window.name;', '<script>location.replace("' + link + '")</script>');
    } catch (e) {
        window.open(link);
        // window.open(link, '', 'height=500,width=611,scrollbars=yes,status =yes')
    }
}