package com.bulu.cn.event;

/**
 * @Auther: YJH
 * @Package: BuluApp-com.bulu.cn.event
 * @Created time: 2018/9/27-13:27
 * @description: 分享功能的事件
 */

public interface IAndroidShareSDKEvent {

    class ShareWithSDK {
        //打开新的web页面指令
        public final String SAHRE_SDK_EVENT = "SAHRE_SDK_EVENT";

        public ShareWithSDK() {
        }
    }


}
