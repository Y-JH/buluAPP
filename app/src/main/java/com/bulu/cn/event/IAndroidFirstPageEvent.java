package com.bulu.cn.event;

/**
 * @Auther: YJH
 * @Package: BuluApp-com.bulu.cn.event
 * @Created time: 2018/9/25-15:27
 * @description: 打开新的web页面的事件指令
 */

public interface IAndroidFirstPageEvent {

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
        public int mFlag = -1;
        //关闭当前的web页面的指令
        public final String CLOSE_PAGE_EVENT = "CLOSE_PAGE_EVENT";

        public ClosePage(String url, int flag) {
            this(flag);
            pageUrl = url;

        }

        public ClosePage(int flag){
            mFlag = flag;
        }
    }

    /**选择头像**/
    class SelctAvatar {
        public final String SELECT_AVATAR_EVENT = "SELECT_AVATAR_EVENT";
        public SelctAvatar(){}
    }

    /**选择头像**/
    class SelctAvatarNotify {
        public final String SELECT_AVATAR_NOTIFY_EVENT = "SELECT_AVATAR_NOTIFY_EVENT";
        public final String picUrl;
        public SelctAvatarNotify(String picUrl){
            this.picUrl = picUrl;
        }
    }


    /**退出登录、重新登录**/
    class ReSignIn {
        public final String RESIGNIN = "RESIGNIN";
        public ReSignIn(){

        }
    }
}
