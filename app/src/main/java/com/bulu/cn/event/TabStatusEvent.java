package com.bulu.cn.event;

/**
 * @Title:TabStatusEvent
 * @Package:cn.com.zhongguancun.view.ui.fragment
 * @Description:fragment 切换时status效果通知
 * @Auther:YJH
 * @Email:yuannunhua@gmail.com
 * @Date:2018/6/2817:25
 */
public class TabStatusEvent {
    public int position = -3;
    public TabStatusEvent(int position) {
        this.position = position;
    }
}
