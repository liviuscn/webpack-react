/**
 * 进入全屏
 * @param {*} ele 要全屏的元素，可以是document.body也可以是某一个div
 * document没有requestFullscreen
 * requestFullscreen方法只能由用户触发，比如：在onload事件中不能触发
 * 页面跳转需先退出全屏
 * 进入全屏的元素，将脱离其父元素，所以可能导致之前某些css的失效.解决方案：使用 :full-screen伪类 为元素添加全屏时的样式（使用时为了兼容注意添加-webkit、-moz或-ms前缀）
 * 一个元素A全屏后，其子元素要再全屏，需先让元素A退出全屏
 */
export function requestFullscreen(ele) {
    if (ele.requestFullscreen) {
        return ele.requestFullscreen();
    } else if (ele.mozRequestFullScreen) {
        return ele.mozRequestFullScreen();
    } else if (ele.webkitRequestFullscreen) {
        return ele.webkitRequestFullscreen();
    } else if (ele.msRequestFullscreen) {
        return ele.msRequestFullscreen();
    }
}
/**
 * 退出全屏
 * 直接使用document调用exitFullscreen方法即可
 */
export function exitFullscreen() {
    if (document.exitFullScreen) {
        document.exitFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (element.msExitFullscreen) {
        element.msExitFullscreen();
    }
}
/**
 * 获取当前全屏的节点
 * @returns 
 */
export function getFullscreenElement() {
    return (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullScreenElement ||
        document.webkitFullscreenElement || null
    );
}
/**
 * 
 * @returns 判断当前是否全屏
 */
export function isFullScreen() {
    return !!document.fullscreenElement
}
/**
 * 
 * @returns 判断当前文档是否能切换到全屏
 */
export function isFullscreenEnabled() {
    return (
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled
    );
}

/**
 * 切换全屏
 *  @param {*} elem 要全屏的元素
 */
export function toggleFullscreen(elem) {
    elem = document.body
    if (!document.fullscreenElement) {
        requestFullscreen(elem)
    } else {
        exitFullscreen();
    }
}