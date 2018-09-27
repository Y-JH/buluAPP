package com.bulu.cn.event;

/**
 * @Auther: YJH
 * @Package: BuluApp-com.bulu.cn.event
 * @Created time: 2018/9/25-17:11
 * @description: 对于二级页面activity承载的fragment的处理命令，如返回上一级fragment页面
 */

public interface IAndroidSecondPageEvent {

    class NewPage {
        public String pageUrl = "";
        //进入下一级的fragment-web页面的指令
        public final String NEW_PAGE_EVENT = "NEW_PAGE_EVENT";

        public NewPage(String url) {
            this();
            pageUrl = url;
        }

        public NewPage(){}
    }

    class ClosePage {
        public String pageUrl = "";
        //返回上一级的fragment-web页面的指令
        public final String CLOSE_PAGE_EVENT = "CLOSE_PAGE_EVENT";

        public ClosePage(String url) {
            this();
            pageUrl = url;
        }

        public ClosePage(){}
    }
}
