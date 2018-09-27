package com.bulu.cn.event;

/**
 * @Auther: YJH
 * @Package: BuluApp-com.bulu.cn.event
 * @Created time: 2018/9/25-15:27
 * @description: 打开新的web页面的事件指令
 */

public interface IAndroidThirdPageEvent {

    class NewPage {
        public String pageUrl = "";
        //打开新的web页面指令
        public final String NEW_PAGE_EVENT = "NEW_PAGE_EVENT";

        public NewPage(String url) {
            pageUrl = url;
        }
    }

    class ClosePage {
        public String pageUrl = "";
        //关闭当前的web页面的指令
        public final String CLOSE_PAGE_EVENT = "CLOSE_PAGE_EVENT";

        public ClosePage(String url) {
            this();
            pageUrl = url;
        }

        public ClosePage(){}
    }
}
